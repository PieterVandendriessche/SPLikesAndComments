import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CommentsMsTeamsWebPartStrings';
import { LikesAndCommentsContainer } from "../../components/LikesAndCommentsContainer"

export interface ICommentsMsTeamsWebPartProps {
  description: string;
}

export default class CommentsMsTeamsWebPart extends BaseClientSideWebPart<ICommentsMsTeamsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<LikesAndCommentsContainer> = React.createElement(
      LikesAndCommentsContainer,
      {
        context: this.context.pageContext,
        httpClient: this.context.spHttpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
