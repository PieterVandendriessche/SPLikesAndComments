import * as React from "react";
import { IComment, ICommentMethods } from "../models/index";
import { IPersonaSharedProps, Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export interface ILikesAndCommentsItemProps {
    comment: IComment;
    commentMethods: ICommentMethods;
}
export const LikesAndCommentsItem: React.SFC<ILikesAndCommentsItemProps> = ({ comment, commentMethods }) => {
    const { author: { name, email }, text, likeCount, isLikedByUser } = comment;
    debugger;
    return (
        <div>
            <Persona
                text={name}
                size={PersonaSize.small}
                secondaryText={"xxx minutes ago"}
                imageUrl={`/_layouts/15/userphoto.aspx?size=S&username=${email}`}
            />
            <p>{text}</p>
            <p>{likeCount} person liked</p>
            <p onClick={() => commentMethods.likeComment(comment)}>is liked by user: {isLikedByUser}</p>
        </div>
    );



};