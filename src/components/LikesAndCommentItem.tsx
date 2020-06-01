import * as React from "react";
import { IComment, ICommentMethods } from "../models/index";
import { IPersonaSharedProps, Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import { calculateTimesinceDate } from "./../utils/index";
import { Comment } from "@pnp/sp/comments";

export interface ILikesAndCommentsItemProps {
    comment: IComment;
    commentMethods: ICommentMethods;
    isReply: boolean;
}
export const LikesAndCommentsItem: React.SFC<ILikesAndCommentsItemProps> = ({ comment, commentMethods, isReply }) => {
    const { author: { name, email }, text, likeCount, isLikedByUser } = comment;
    const timeSinceCreation = calculateTimesinceDate(comment.createdDate);

    debugger;
    return (
        <div>
            <Persona
                text={name}
                size={PersonaSize.small}
                secondaryText={timeSinceCreation > 60 ? "A while ago" : `${timeSinceCreation} minutes ago`}
                imageUrl={`/_layouts/15/userphoto.aspx?size=S&username=${email}`}
            />
            <div dangerouslySetInnerHTML={{ __html: text }} />
            <ActionButton
                iconProps={{ iconName: isLikedByUser ? 'LikeSolid' : 'like', color: 'purple' }}
                allowDisabledFocus
                checked={isLikedByUser}
                onClick={isLikedByUser ? () => commentMethods.unlikeComment(comment, isReply) : () => commentMethods.likeComment(comment, isReply)}>
                {comment.isLikedByUser ? "Unlike" : "Like"}
            </ActionButton>
        </div>
    );



};