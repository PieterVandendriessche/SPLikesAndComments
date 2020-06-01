import { IComment } from "../models";

export interface ICommentService {
    getCommentsForPage(): Promise<IComment[]>;

    postComment(text: string): Promise<IComment>;
}