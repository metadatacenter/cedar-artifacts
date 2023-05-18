import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {RestApiUrlService} from '../rest-api-url.service';
import {Router} from '@angular/router';
import {GenericMultiLoaderService} from './generic-multi-loader';
import {TemplateInstance} from '../../shared/model/template-instance.model';
import {SnotifyService} from 'ng-alt-snotify';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateInstanceService extends GenericMultiLoaderService<TemplateInstance> {

  protected constructor(
    // @ts-ignore
    protected http: HttpClient,
    // @ts-ignore
    protected restApiUrl: RestApiUrlService,
    // @ts-ignore
    protected router: Router,
    // @ts-ignore
    protected notify: SnotifyService,
    // @ts-ignore
    protected translateService: TranslateService
  ) {
    super(http, restApiUrl, router, notify, translateService);
  }

  getTemplateInstance(templateInstanceId: string): Observable<TemplateInstance> {
    return this.getData(templateInstanceId, this.restApiUrl.templateInstance(templateInstanceId));
  }
}
