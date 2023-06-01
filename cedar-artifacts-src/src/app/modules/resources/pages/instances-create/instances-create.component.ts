import {Component, OnInit} from '@angular/core';
import {DataStoreService} from '../../../../services/data-store.service';
import {DataHandlerService} from '../../../../services/data-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CedarPageComponent} from '../../../shared/components/base/cedar-page-component.component';
import {TranslateService} from '@ngx-translate/core';
import {SnotifyService} from 'ng-alt-snotify';
import {LocalSettingsService} from '../../../../services/local-settings.service';
import {DataHandlerDataId} from '../../../shared/model/data-handler-data-id.model';
import {Template} from '../../../../shared/model/template.model';
import {DataHandlerDataStatus} from '../../../shared/model/data-handler-data-status.model';
import {HttpClient} from '@angular/common/http';
import {UiService} from '../../../../services/ui.service';
import {AppConfigService} from '../../../../services/app-config.service';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-instances-create',
  templateUrl: './instances-create.component.html',
  styleUrls: ['./instances-create.component.scss']
})
export class InstancesCreateComponent extends CedarPageComponent implements OnInit {

  conf: object = {};
  templateId: string = '';
  template: Template = null;
  artifactStatus: number = null;
  ready: boolean = false;
  operation: string = 'Create';

  constructor(
    localSettings: LocalSettingsService,
    translateService: TranslateService,
    notify: SnotifyService,
    router: Router,
    route: ActivatedRoute,
    dataStore: DataStoreService,
    dataHandler: DataHandlerService,
    keycloak: KeycloakService,
    private http: HttpClient,
    private uiService: UiService,
    private configService: AppConfigService,
  ) {
    super(localSettings, translateService, notify, router, route, dataStore, dataHandler, keycloak);
    this.conf = {
      "showTemplateUpload": false,
      "templateUploadResponseSuccess": "success",
      "templateUploadBaseUrl": "https://api-php.cee.metadatacenter.orgx",
      "templateUploadEndpoint": "/upload.php",
      "templateDownloadEndpoint": "/download.php",
      "templateUploadParamName": "3520cf061bba4919a8ea4b74a07af01b",
      "templateDownloadParamName": "9ff482bacac84c499655ab58efdf590a",
      "showDataSaver": false,
      "dataSaverEndpointUrl": "http://localhost:8000/datasave.php",
      "sampleTemplateLocationPrefix": "https://component.metadatacenter.orgx/cedar-embeddable-editor-sample-templates/",
      "showSampleTemplateLinks": false,
      "terminologyProxyUrl": "https://api-php.cee.metadatacenter.orgx/index.php",
      "showHeader": false,
      "showFooter": false,
    };
  }

  override ngOnInit() {
    super.ngOnInit();

    this.initDataHandler();
    this.templateId = this.route.snapshot.paramMap.get('templateId');
    this.dataHandler
      .requireId(DataHandlerDataId.TEMPLATE, this.templateId)
      // @ts-ignore
      .load(() => this.dataLoadedCallback(), (error, dataStatus) => this.dataErrorCallback(error, dataStatus));
  }
  private dataLoadedCallback() {
    this.template = this.dataStore.getTemplate(this.templateId);
    this.ready = true;
    console.log('Template loaded', this.template);
  }
  private dataErrorCallback(error: any, dataStatus: DataHandlerDataStatus) {
    this.artifactStatus = error.status;
  }
  saveToCedar(): void {
    const cee: any = document.querySelector('cedar-embeddable-editor');
    const meta = cee.currentMetadata;
    console.log("META", meta);
  }
}

