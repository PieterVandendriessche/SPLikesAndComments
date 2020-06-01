import * as React from "react";
import { getClientType } from "../../../utils";


//TODO: document this
export class LikesAndCommentsContainer extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
        alert(getClientType());
    }

    public render() {
        return (
            <div>

            </div>
        );
    }
}
