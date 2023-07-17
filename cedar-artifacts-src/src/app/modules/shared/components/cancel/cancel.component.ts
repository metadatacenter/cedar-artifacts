import {Component, Inject, Input} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {globalAppConfig} from "../../../../../environments/global-app-config";
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent {

  @Input() operation: string;
  @Input() folderId: string;
  window: any;
  constructor(@Inject(DOCUMENT) private _document) {
    this.window = this._document.defaultView;
  }
  cancel() {
    if(this.operation === 'Create') {
      let redirectBase = globalAppConfig.cedarUrl + 'dashboard?folderId=';
      this.window.opener.location.href = redirectBase + encodeURIComponent(this.folderId);
    }
    self.close();
  }
}

