import * as React from "react";
import { IComment } from "../../../models/index";
import { IPersonaSharedProps, Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export interface ILikesAndCommentsItemProps {
    comment: IComment;
}
export const LikesAndCommentsItem: React.SFC<ILikesAndCommentsItemProps> = ({ comment }) => {
    const { author: { name, email }, text } = comment;
    return (
        <div>
            <Persona
                text={name}
                size={PersonaSize.small}
                secondaryText={"xxx minutes ago"}
                imageUrl={`/_layouts/15/userphoto.aspx?size=S&username=${email}`}
            />
            <p>{text}</p>
        </div>
    );



};