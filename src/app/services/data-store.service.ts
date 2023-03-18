import {Injectable} from '@angular/core';
import {LocalSettingsService} from './local-settings.service';
import {HealthCheck} from "../shared/model/health-check.model";
import {ResourceIdLookup} from "../shared/model/resource-id-lookup.model";
import {ResourceReportUser} from "../shared/model/resource-report-user.model";
import {ResourceReportField} from "../shared/model/resource-report-field.model";

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(
    private localSettings: LocalSettingsService
  ) {
  }

}
