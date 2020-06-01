import * as React from "react";
import { IComment, ICommentMethods } from "../models/index";
import { LikesAndCommentsItem } from "./LikesAndCommentItem";
import styles from "./LikesAndComments.module.scss";
import { useState } from "react";
import { TextField, DefaultButton, Stack } from "office-ui-fabric-react";

export interface ICommentBoxProps {
    postMessage: (message: string) => void;
}

const onPostClick = (text: string, setText: React.Dispatch<any>, callback: (message: string) => void) => {
    if (text == null || text.length < 1) return;
    setText("");
    callback(text);
};


export const CommentBox: React.SFC<ICommentBoxProps> = (props) => {
    const [text, setText] = useState("");
    return (
        <div className={styles.commentBox}>
            <Stack horizontal>
                <TextField placeholder="Please enter text here" onChange={(event, newText) => setText(newText)} value={text} />
                <div className={styles.commentBoxTextField}><DefaultButton text="Post" onClick={() => onPostClick(text, setText, props.postMessage)} allowDisabledFocus disabled={text.length < 1} /></div>
            </Stack>
        </div>
    );

};