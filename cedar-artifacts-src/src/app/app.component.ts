import {Component} from '@angular/core';
import {globalScope} from "../environments/global-app-config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cedar-artifacts';
  ceeConfig = {
    "showTemplateUpload": false,
    "templateUploadResponseSuccess": "success",
    "templateUploadBaseUrl": "https://api-php.cee.metadatacenter.orgx",
    "templateUploadEndpoint": "/upload.php",
    "templateDownloadEndpoint": "/download.php",
    "templateUploadParamName": "3520cf061bba4919a8ea4b74a07af01b",
    "templateDownloadParamName": "9ff482bacac84c499655ab58efdf590a",
    "showDataSaver": false,
    "showSampleTemplateLinks": false,
    "terminologyProxyUrl": "https://api-php.cee.metadatacenter.orgx/index.php",
    "showHeader": false,
    "showFooter": false,
  };

  createUUID = () => {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  constructor() {
    globalScope.cedarClientSessionId = this.createUUID();
  }

}
