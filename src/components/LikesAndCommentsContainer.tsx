import * as React from "react";
import { getClientType } from "../utils";
import { ClientType, IComment } from "../models";
import { PageContext } from '@microsoft/sp-page-context';
import { ICommentService } from "../services/ICommentService";
import { CommentService } from "../services/CommentService";
import { SPHttpClient } from '@microsoft/sp-http';
import "@pnp/sp/comments/clientside-page";
import { sp, IClientsidePage } from "@pnp/sp/presets/all";
import { LikesAndCommentsList } from "./LikesAndCommentsList";
import { AmountOfCommentsHeader } from "./AmountOfCommentsHeader";
import { CommentBox } from "./CommentBox";

import { findIndex, find } from 'lodash';

import styles from "./LikesAndComments.module.scss";



export interface ILikesAndCommentsContainerProps {
    context: PageContext;
    httpClient: SPHttpClient;
}

export interface ILikesAndCommentsContainerState {
    comments: IComment[];
    commentsDisabled: boolean;
}
export class LikesAndCommentsContainer extends React.Component<ILikesAndCommentsContainerProps, ILikesAndCommentsContainerState> {

    private commentService: ICommentService;

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            commentsDisabled: false
        };
    }

    public async componentDidMount() {
        const { listItem: { id }, web: { absoluteUrl } } = this.props.context;

        this.commentService = new CommentService(absoluteUrl, id, this.props.httpClient);
        const commentsDisabled = await this.commentService.areCommentsDisabled();
        if (commentsDisabled) {
            this.setState({ commentsDisabled: true });
            return;
        }

        this.commentService.getCommentsForPage()
            .then((data) => {
                console.log(data);
                this.setState({
                    comments: data
                });
            });
    }

    public placeComment = (text: string): void => {
        this.commentService.postComment(text)
            .then((newComment) => this.setState({ comments: [...this.state.comments, newComment] }));
    }

    public likeComment = (comment: IComment, isReply: boolean = false): void => {
        if (comment.isLikedByUser) return;
        this.commentService.likeComment(comment.id)
            .then(() => {
                comment.isLikedByUser = true;
                comment.likeCount += 1;
                this.updateCommentInState(comment, isReply);
            });
    }

    public unlikeComment = (comment: IComment, isReply: boolean = false): void => {
        if (!comment.isLikedByUser) return;
        this.commentService.unlikeComment(comment.id)
            .then(() => {
                comment.isLikedByUser = false;
                comment.likeCount -= 1;
                this.updateCommentInState(comment, isReply);
            });
    }

    private updateCommentInState = (commentToUpdate: IComment, isReply: boolean): void => {
        const { comments } = this.state;
        var changedComments: IComment[];
        var affectedComment: IComment;
        var nonAffectedComments: IComment[];

        if (isReply) {
            affectedComment = find(comments, { replies: [{ id: commentToUpdate.id }] });
            var indexReply = findIndex(affectedComment.replies, { id: commentToUpdate.id });
            if (indexReply != -1) {
                const reply = affectedComment.replies[indexReply];
                reply.isLikedByUser = commentToUpdate.isLikedByUser;
                reply.likeCount = commentToUpdate.likeCount;
            }
        }
        else {
            affectedComment = find(comments, { id: commentToUpdate.id });
            affectedComment.isLikedByUser = commentToUpdate.isLikedByUser;
            affectedComment.likeCount = commentToUpdate.likeCount;
        }
        nonAffectedComments = comments.filter(e => e.id !== affectedComment.id);
        var newComments = [...nonAffectedComments, affectedComment];
        newComments = newComments.sort((a, b) => (a.id > b.id) ? -1 : 1);
        this.setState({ comments: newComments });
    }



    public render() {
        //Todo: add the check!
        const clientType = getClientType();
        return <div className={styles.container}>
            <AmountOfCommentsHeader
                comments={this.state.comments}
            />
            <CommentBox />
            <LikesAndCommentsList
                comments={this.state.comments}
                commentMethods={{ likeComment: this.likeComment, unlikeComment: this.unlikeComment }}
            />
        </div>;
    }
}
