import {Component, Inject, Input} from '@angular/core';
import {DOCUMENT} from "@angular/common";
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
      this.window.opener.location.href = "https://cedar.metadatacenter.orgx/dashboard?folderId=" + encodeURIComponent(this.folderId);
    }
    self.close();
  }
}
