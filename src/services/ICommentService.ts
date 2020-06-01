import { IComment } from "../models";

export interface ICommentService {
    getCommentsForPage(): Promise<IComment[]>;

    postComment(text: string): Promise<IComment>;

    likeComment(commentId: string): Promise<void>;

    unlikeComment(commentId: string): Promise<void>;
}