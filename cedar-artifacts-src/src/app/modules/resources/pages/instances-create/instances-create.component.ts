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
import {globalAppConfig} from "../../../../../environments/global-app-config";

@Component({
  selector: 'app-instances-create',
  templateUrl: './instances-create.component.html',
  styleUrls: ['./instances-create.component.scss']
})
export class InstancesCreateComponent extends CedarPageComponent implements OnInit {

  conf: object = {};
  templateId: string = '';
  folderId: string = '';
  template: Template = null;
  templateName: string = null;
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
    // TODO: this conf should be input parameter
    this.conf = {
      "showSampleTemplateLinks": false,
      "terminologyIntegratedSearchUrl": globalAppConfig.integratedSearchUrl,
      "showHeader": false,
      "showFooter": false,
    };
  }

  override ngOnInit() {
    super.ngOnInit();

    this.initDataHandler();
    this.templateId = this.route.snapshot.paramMap.get('templateId');
    this.folderId = this.route.snapshot.queryParamMap.get('folderId');
    this.dataHandler
      .requireId(DataHandlerDataId.TEMPLATE, this.templateId)
      // @ts-ignore
      .load(() => this.dataLoadedCallback(), (error, dataStatus) => this.dataErrorCallback(error, dataStatus));
  }
  private dataLoadedCallback() {
    this.template = this.dataStore.getTemplate(this.templateId);
    this.templateName = this.template.templateName;
    this.ready = true;
  }
  private dataErrorCallback(error: any, dataStatus: DataHandlerDataStatus) {
    this.artifactStatus = error.status;
  }
}

