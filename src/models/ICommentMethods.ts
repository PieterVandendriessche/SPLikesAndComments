import { IComment } from "./IComment";

export interface ICommentMethods {
    likeComment: (comment: IComment) => void;
    unlikeComment: (comment: IComment) => void;
}