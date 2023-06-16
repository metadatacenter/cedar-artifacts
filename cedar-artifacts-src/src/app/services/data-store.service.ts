import {Injectable} from '@angular/core';
import {LocalSettingsService} from './local-settings.service';
import {Template} from '../shared/model/template.model';
import {TemplateInstance} from '../shared/model/template-instance.model';
import {HealthCheck} from "../shared/model/health-check.model";
import {ResourceIdLookup} from "../shared/model/resource-id-lookup.model";
import {ResourceReportUser} from "../shared/model/resource-report-user.model";
import {ResourceReportField} from "../shared/model/resource-report-field.model";

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private readonly templateMap: Map<string, Template>;
  private readonly templateInstanceMap: Map<string, TemplateInstance>;

  constructor(
    private localSettings: LocalSettingsService
  ) {
    this.templateMap = new Map<string, Template>();
    this.templateInstanceMap = new Map<string, TemplateInstance>();
  }

  setTemplate(templateId: string, template: Template) {
    this.templateMap[templateId] = template;
  }
  getTemplate(templateId: string): Template {
    // @ts-ignore
    return this.templateMap[templateId];
  }

  setTemplateInstance(templateInstanceId: string, templateInstance: TemplateInstance) {
    this.templateInstanceMap[templateInstanceId] = templateInstance;
  }

  getTemplateInstance(templateInstanceId: string): TemplateInstance {
    return this.templateInstanceMap[templateInstanceId];
  }
}
