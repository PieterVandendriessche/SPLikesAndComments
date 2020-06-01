import * as React from "react";
import { IComment } from "../../../models/index";

export interface IAmountOfCommentsHeaderProps {
    comments: IComment[];
}
export const AmountOfCommentsHeader: React.SFC<IAmountOfCommentsHeaderProps> = ({ comments }) => {

    if (comments.length > 0) {
        return <h2>{comments.length} Comment{comments.length > 1 ? "s" : ""}</h2>;
    }
    else {
        return <></>;
    }



};