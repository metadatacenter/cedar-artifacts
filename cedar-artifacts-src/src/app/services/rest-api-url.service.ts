import {Injectable} from '@angular/core';
import {AppConfigService} from './app-config.service';
import {globalAppConfig} from "../../environments/global-app-config";

@Injectable({
  providedIn: 'root'
})
export class RestApiUrlService {

  private configService: AppConfigService;

  private API_URL: string;

  constructor(configService: AppConfigService) {
    this.configService = configService;
    this.API_URL = globalAppConfig.apiUrl;
  }

  private base() {
    return `${this.API_URL}`;
  }

  private templateInstances() {
    return `${this.base()}template-instances`;
  }

  private templates() {
    return `${this.base()}templates`;
  }

  template(id: string) {
    return `${this.templates()}/${encodeURIComponent(id)}`;
  }

  templateInstance(id: string) {
    return `${this.templateInstances()}/${encodeURIComponent(id)}`;
  }

}
