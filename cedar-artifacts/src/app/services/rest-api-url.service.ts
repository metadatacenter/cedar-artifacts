import {Injectable} from '@angular/core';
import {AppConfigService} from './app-config.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RestApiUrlService {

  private configService: AppConfigService;

  private API_URL: string;

  constructor(configService: AppConfigService) {
    this.configService = configService;
    this.API_URL = environment.apiUrl;
  }

  private base() {
    return `${this.API_URL}`;
  }

}
