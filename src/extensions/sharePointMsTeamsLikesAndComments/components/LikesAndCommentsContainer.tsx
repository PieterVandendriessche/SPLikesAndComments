import * as React from "react";
import { getClientType } from "../../../utils";
import { ClientType, IComment } from "../../../models";
import { PageContext } from '@microsoft/sp-page-context';
import { ICommentService } from "../../../services/ICommentService";
import { CommentService } from "../../../services/CommentService";
import { SPHttpClient } from '@microsoft/sp-http';
import "@pnp/sp/comments/clientside-page";
import { sp, IClientsidePage } from "@pnp/sp/presets/all";
import { LikesAndCommentsList } from "./LikesAndCommentsList";
import { AmountOfCommentsHeader } from "./AmountOfCommentsHeader";

import styles from "./LikesAndComments.module.scss";



export interface ILikesAndCommentsContainerProps {
    context: PageContext;
    httpClient: SPHttpClient;
}

export interface ILikesAndCommentsContainerState {
    comments: IComment[];
}
export class LikesAndCommentsContainer extends React.Component<ILikesAndCommentsContainerProps, ILikesAndCommentsContainerState> {

    private commentService: ICommentService;

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
    }

    public async componentDidMount() {
        const { listItem: { id }, web: { absoluteUrl } } = this.props.context;

        this.commentService = new CommentService(absoluteUrl, id, this.props.httpClient);
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

    public render() {
        //Todo: add the check!
        const clientType = getClientType();
        return ClientType.TeamsApp === clientType ?
            (<div>Render approved</div>)
            :
            (<div className={styles.container}>
                <AmountOfCommentsHeader
                    comments={this.state.comments}
                />
                <LikesAndCommentsList
                    comments={this.state.comments}
                />
            </div>);
    }
}
