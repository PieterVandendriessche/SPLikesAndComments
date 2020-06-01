import * as React from "react";
import { IComment } from "../../../models/index";
import { LikesAndCommentsItem } from "./LikesAndCommentItem";

export interface ILikesAndCommentsListProps {
    comments: IComment[];
}
export const LikesAndCommentsList: React.SFC<ILikesAndCommentsListProps> = (props) => {

    return <>
        {props.comments.map((item, index) => {
            return (
                <div key={index}><LikesAndCommentsItem comment={item} /></div>
            );
        })
        }
    </>;



};