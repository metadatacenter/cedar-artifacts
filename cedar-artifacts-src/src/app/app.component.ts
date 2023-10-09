import {Component} from '@angular/core';
import {globalScope} from "../environments/global-app-config";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";
import {LocalSettingsService} from "./services/local-settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cedar-artifacts';
  ceeConfig = {
    "showSampleTemplateLinks": false,
    "terminologyIntegratedSearchUrl": "",
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

  constructor(private localSettings: LocalSettingsService, private translateService: TranslateService) {
    globalScope.cedarClientSessionId = this.createUUID();
    translateService.setDefaultLang(environment.fallbackLanguage);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    let currentLanguage = localSettings.getLanguage();
    if (currentLanguage == null) {
      currentLanguage = environment.defaultLanguage;
    }
    translateService.use(currentLanguage);
  }

}
