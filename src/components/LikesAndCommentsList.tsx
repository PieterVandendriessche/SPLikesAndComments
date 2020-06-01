import * as React from "react";
import { IComment, ICommentMethods } from "../models/index";
import { LikesAndCommentsItem } from "./LikesAndCommentItem";
import styles from "./LikesAndComments.module.scss";

export interface ILikesAndCommentsListProps {
    comments: IComment[];
    commentMethods: ICommentMethods;
}
export const LikesAndCommentsList: React.SFC<ILikesAndCommentsListProps> = (props) => {

    return <>
        {props.comments.map((item, index) => {
            return (
                <div key={index}>
                    <LikesAndCommentsItem
                        comment={item}
                        commentMethods={props.commentMethods}
                        isReply={false}
                    />
                    {item.replies && item.replies.map((reply, index2) => {
                        return (
                            <div className={styles.reply}>
                                <LikesAndCommentsItem
                                    comment={reply}
                                    commentMethods={props.commentMethods}
                                    key={index2}
                                    isReply={true}
                                />
                            </div>

                        );

                    })
                    }


                </div>
            );
        })
        }
    </>;



};