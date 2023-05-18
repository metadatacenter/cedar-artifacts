import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {RestApiUrlService} from '../rest-api-url.service';
import {Router} from '@angular/router';
import {GenericMultiLoaderService} from './generic-multi-loader';
import {Template} from '../../shared/model/template.model';
import {SnotifyService} from 'ng-alt-snotify';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService extends GenericMultiLoaderService<Template> {

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

  getTemplate(templateId: string): Observable<Template> {
    return this.getData(templateId, this.restApiUrl.template(templateId));
  }
}
