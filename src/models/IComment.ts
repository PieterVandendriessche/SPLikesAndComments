import { IAuthor } from "./IAuthor";

export interface IComment {
    author: IAuthor;
    createdDate: string;
    id: string;
    isLikedByUser: boolean;
    isReply: boolean;
    itemId: number;
    likeCount: number;
    listId: string;
    mentions: any[];
    parentId: string;
    replyCount: number;
    text: string;
    replies: IComment[];
}