import {Component, OnInit} from '@angular/core';
import {DataStoreService} from '../../../../services/data-store.service';
import {DataHandlerService} from '../../../../services/data-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CedarPageComponent} from '../../../shared/components/base/cedar-page-component.component';
import {TranslateService} from '@ngx-translate/core';
import {SnotifyService} from 'ng-alt-snotify';
import {LocalSettingsService} from '../../../../services/local-settings.service';
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
  }

  override ngOnInit() {
    super.ngOnInit();
  }

}


