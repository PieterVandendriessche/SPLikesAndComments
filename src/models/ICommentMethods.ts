import { IComment } from "./IComment";

export interface ICommentMethods {
    likeComment: (comment: IComment, isReply: boolean) => void;
    unlikeComment: (comment: IComment, isReply: boolean) => void;
}