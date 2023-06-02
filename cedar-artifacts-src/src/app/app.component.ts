import { Component } from '@angular/core';

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
}
