import {Component, OnInit} from '@angular/core';
import {LocalSettingsService} from '../../../../services/local-settings.service';
import {TranslateService} from '@ngx-translate/core';
import {SnotifyService} from 'ng-alt-snotify';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStoreService} from '../../../../services/data-store.service';
import {DataHandlerService} from '../../../../services/data-handler.service';
import {AppConfigService} from '../../../../services/app-config.service';
import {KeycloakService} from "keycloak-angular";
import {UiService} from "../../../../services/ui.service";
import {CedarPageComponent} from "../../../shared/components/base/cedar-page-component.component";
import {DataHandlerDataId} from "../../../shared/model/data-handler-data-id.model";
import {DataHandlerDataStatus} from "../../../shared/model/data-handler-data-status.model";
import {Template} from "../../../../shared/model/template.model";
import {TemplateInstance} from '../../../../shared/model/template-instance.model';

@Component({
  selector: 'app-instances-edit',
  templateUrl: './instances-edit.component.html',
  styleUrls: ['./instances-edit.component.scss']
})
export class InstancesEditComponent extends CedarPageComponent implements OnInit {
  conf: object = {};
  templateId: string = '';
  templateInstanceId: string = '';

  templateInstance: object = {};
  template: Template = null;
  templateName: string =null;
  instance: TemplateInstance = null;
  artifactStatus: number = null;
  templateStatus: number = null;
  ready: boolean = false;
  operation: string = 'Update';

  constructor(
    localSettings: LocalSettingsService,
    translateService: TranslateService,
    notify: SnotifyService,
    router: Router,
    route: ActivatedRoute,
    dataStore: DataStoreService,
    dataHandler: DataHandlerService,
    keycloak: KeycloakService,
    private configService: AppConfigService,
    private uiService: UiService
  ) {
    super(localSettings, translateService, notify, router, route, dataStore, dataHandler, keycloak);

    // TODO: these conf should be input to components
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
    this.templateInstanceId = this.route.snapshot.paramMap.get('instanceId');
    this.dataHandler
      .requireId(DataHandlerDataId.TEMPLATE_INSTANCE, this.templateInstanceId)
      // @ts-ignore
      .load(() => this.instanceLoadedCallback(this.templateInstanceId),
        (error, dataStatus) => this.instanceErrorCallback(error, dataStatus));
  }
  private instanceLoadedCallback(instanceId) {
    this.instance = this.dataStore.getTemplateInstance(this.templateInstanceId);
    this.templateId = this.instance.isBasedOn;

    // load the template it is based on
    this.dataHandler
      .requireId(DataHandlerDataId.TEMPLATE, this.templateId)
      .load(() => this.templateLoadedCallback(this.templateId), (error, dataStatus) => this.templateErrorCallback(error, dataStatus));
  }

  private templateLoadedCallback(templateId) {
    this.template = this.dataStore.getTemplate(templateId);
    this.templateName = this.template.templateName;
    this.ready = true;
  }

  private instanceErrorCallback(error: any, dataStatus: DataHandlerDataStatus) {
    this.artifactStatus = error.status;
  }

  private templateErrorCallback(error: any, dataStatus: DataHandlerDataStatus) {
    this.templateStatus = error.status;
  }

  saveToCedar(): void {
    const cee: any = document.querySelector('cedar-embeddable-editor');
    const meta = cee.currentMetadata;
    console.log("META", meta);
  }

}
