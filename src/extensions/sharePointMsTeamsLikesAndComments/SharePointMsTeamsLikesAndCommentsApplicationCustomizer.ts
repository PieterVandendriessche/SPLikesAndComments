import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'SharePointMsTeamsLikesAndCommentsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'SharePointMsTeamsLikesAndCommentsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISharePointMsTeamsLikesAndCommentsApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SharePointMsTeamsLikesAndCommentsApplicationCustomizer
  extends BaseApplicationCustomizer<ISharePointMsTeamsLikesAndCommentsApplicationCustomizerProperties> {

  private _footerPlaceholder: PlaceholderContent;

  @override
  public onInit(): Promise<void> {
    //When a placeholderProvider has changed fire the render method again.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    //On navigate event start render
    this.context.application.navigatedEvent.add(this, () => {
      this.startReactRender();
    });
    return Promise.resolve();
  }
  startReactRender() {
    throw new Error("Method not implemented.");
  }

  private _renderPlaceHolders() {
    //Check if the placeholder is already set
    if (!this._footerPlaceholder && this.context.placeholderProvider.placeholderNames.indexOf(PlaceholderName.Bottom) !== -1) {
      this._footerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, {
        onDispose: this._onDispose
      });

    }

  }

  private _onDispose(): void {
    console.log('[MSTeamsPlaceholder._onDispose] Disposed.');
  }


}
