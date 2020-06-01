import * as React from "react";
import { IComment, ICommentMethods } from "../models/index";
import { LikesAndCommentsItem } from "./LikesAndCommentItem";
import styles from "./LikesAndComments.module.scss";
import { useState } from "react";
import { TextField, DefaultButton, Stack } from "office-ui-fabric-react";

export interface ICommentBoxProps {
}
const [text, setText] = useState("");

export const CommentBox: React.SFC<ICommentBoxProps> = (props) => {
    return (
        <div>
            <Stack horizontal>
                <TextField label="With placeholder" placeholder="Please enter text here" onChange={(event, newText) => setText(newText)} value={text} />
                <DefaultButton text="Post" onClick={() => alert("Posted")} allowDisabledFocus />
            </Stack>
        </div>
    );

};