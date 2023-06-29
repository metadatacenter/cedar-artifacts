import {Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {MessageHandlerService} from '../../../../services/message-handler.service';
import {environment, globalScope} from "../../../../../environments/environment";

@Component({
  selector: 'app-cedar-data-saver',
  templateUrl: 'cedar-data-saver.component.html',
  styleUrls: ['./cedar-data-saver.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CedarDataSaverComponent implements OnDestroy {

  // Number of milliseconds to display the submission success message
  private static readonly SUCCESS_MESSAGE_TIMEOUT = 5000;
  private static readonly PARAM_ID = 'id';
  private static readonly PARAM_TITLE = 'title';
  private static readonly FOLDER_ID = 'folder_id';

  @Input() folderId: string = null;
  @Input() templateId;
  @Input() templateInstanceId;
  @Input() operation: string;
  @Input() templateName;

  httpRequestParams: HttpParams;
  httpPostSubscription = new Subscription();
  showProgress = false;
  showSuccess = false;
  showError = false;
  progressMessage = 'Processing...';
  successMessage = '';
  errorMessage = '';
  window: any;

  constructor(@Inject(DOCUMENT) private _document, private httpClient: HttpClient, private messageHandlerService: MessageHandlerService) {
    this.window = this._document.defaultView;
  }

  saveInstance(event): void {
    this.httpPostSubscription.add(
      this.httpRequest().subscribe(
        (data: any) => {
          if (data instanceof HttpResponse) {
            this.clearProgress();
            this.clearError();
            this.showSuccess = true;
            this.successMessage = 'Metadata saved successfully';
            this.messageHandlerService.traceObject('Data received from the server:', data);
          } else {
            this.clearSuccess();
            this.clearError();
            this.showProgress = true;
          }
        },
        (error: any) => {
          this.clearProgress();
          this.clearSuccess();
          this.showError = true;
          this.errorMessage = 'Error saving metadata';

          if (typeof error === 'object' && error.hasOwnProperty('message')) {
            this.messageHandlerService.errorObject(error['message'], error);
          }
        },
        () => {
          // remove success message in SUCCESS_MESSAGE_TIMEOUT seconds (
          if (this.showSuccess) {
            setTimeout(() => {
              this.clearSuccess();
            }, CedarDataSaverComponent.SUCCESS_MESSAGE_TIMEOUT);
          }
        }
      )
    );
    this.stopPropagation(event);
  }

  private httpRequest(): Observable<any> {
    let baseUrl = environment.apiUrl + 'template-instances';
    const cee: any = document.querySelector('cedar-embeddable-editor');
    const meta = cee.currentMetadata;
    meta['schema:name'] = this.templateName + ' metadata';
    meta['schema:isBasedOn'] = this.templateId;
    meta['schema:description'] = '';
    const body = meta;
    let method = '';

    const httpHeaders = new HttpHeaders({
      'CEDAR-Client-Session-Id': globalScope.cedarClientSessionId,
      'CEDAR-Debug': 'true'
    });
    if (this.operation === 'Create') {
      method = 'POST';
      this.httpRequestParams = new HttpParams().set(CedarDataSaverComponent.FOLDER_ID, this.folderId);
    } else {
      method = 'PUT';
      baseUrl = baseUrl + '/' + encodeURIComponent(this.templateInstanceId);
      this.httpRequestParams = new HttpParams();
    }

    return this.httpClient.request(method, baseUrl, {
      body,
      headers: httpHeaders,
      observe: 'events',
      params: this.httpRequestParams,
      reportProgress: true,
      responseType: 'json',
    });
  }

  clearProgress(): void {
    this.showProgress = false;
  }

  clearSuccess(): void {
    this.showSuccess = false;
    this.successMessage = '';
  }

  clearError(): void {
    this.showError = false;
    this.errorMessage = '';
  }

  stopPropagation(event): void {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.httpPostSubscription.unsubscribe();
  }
}
