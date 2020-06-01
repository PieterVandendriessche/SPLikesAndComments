import { ICommentService } from "./ICommentService";
import { SPHttpClient, ISPHttpClientOptions } from '@microsoft/sp-http';
import { IComment } from "../models";

export class CommentService implements ICommentService {
    private currentPageId: number;
    private currentWebUrl: string;
    private spHttpClient: SPHttpClient;

    constructor(currentWebUrl: string, currentPageId: number, spHttpClient: SPHttpClient) {
        this.currentPageId = currentPageId;
        this.currentWebUrl = currentWebUrl;
        this.spHttpClient = spHttpClient;
    }
    public async postComment(text: string): Promise<IComment> {
        const spOpts: ISPHttpClientOptions = {
            body: `{ "text": "${text}" }`
        };
        const url = `${this.currentWebUrl}/_api/web/lists/GetByTitle('Site Pages')/GetItemById(${this.currentPageId})/Comments?$expand=replies`;
        const response = await this.spHttpClient.post(url, SPHttpClient.configurations.v1, spOpts);
        const responseJSON: IComment = await response.json();

        return responseJSON;

    }

    public async getCommentsForPage(): Promise<IComment[]> {


        const url = `${this.currentWebUrl}/_api/web/lists/GetByTitle('Site Pages')/GetItemById(${this.currentPageId})/Comments?$expand=replies`;
        const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1);
        const responseJSON = await response.json();

        const comments: IComment[] = responseJSON.value;

        return comments;

    }

}