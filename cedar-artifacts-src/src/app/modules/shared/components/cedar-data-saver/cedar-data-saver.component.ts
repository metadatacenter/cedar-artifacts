import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
// import {DataContext} from '../../util/data-context';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {MessageHandlerService} from '../../../../services/message-handler.service';

@Component({
  selector: 'app-cedar-data-saver',
  templateUrl: 'cedar-data-saver.component.html',
  styleUrls: ['./cedar-data-saver.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CedarDataSaverComponent implements OnInit, OnDestroy {

  // Number of milliseconds to display the submission success message
  private static readonly SUCCESS_MESSAGE_TIMEOUT = 5000;
  private static readonly PARAM_ID = 'id';
  private static readonly PARAM_TITLE = 'title';
  private static readonly FOLDER_ID = 'folder_id';

  // @Input() dataContext: DataContext = null;
  @Input() endpointUrl: string = null;
  @Input() operation: string;

  httpRequestParams: | HttpParams | { [param: string]: string | string[]; };
  httpPostSubscription = new Subscription();

  showProgress = false;
  showSuccess = false;
  showError = false;
  progressMessage = 'Processing...';
  successMessage = '';
  errorMessage = '';


  constructor(private httpClient: HttpClient, private messageHandlerService: MessageHandlerService) {
  }

  ngOnInit(): void {
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

            // if (data['body'][CedarDataSaverComponent.PARAM_ID]) {
            //   this.dataContext.savedTemplateID = data['body'][CedarDataSaverComponent.PARAM_ID];
            // }
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
    const folderId = 'https%3A%2F%2Frepo.metadatacenter.orgx%2Ffolders%2F7d24c865-b5eb-4650-9375-3c744f11c6ad';
    const baseUrl = 'https://resource.metadatacenter.orgx/template-instances';
    const cee: any = document.querySelector('cedar-embeddable-editor');
    const meta = cee.currentMetadata;
    console.log('Meta', meta);
    const body = meta;

    // if (this.dataContext.templateInfo) {
    //   Object.assign(body.info, this.dataContext.templateInfo);
    // }
    const httpHeaders = new HttpHeaders({
      'CEDAR-Client-Session-Id': '0c5d0bd1-1a6a-4353-b96b-0d17eff059b2',
      'Content-Type': 'application/json;charset=UTF-8',
      'Cache-Control': 'no-cache',
      'Host': 'artifact.metadatacenter.orgx',
      'Origin': 'https://artifacts.metadatacenter.orgx',
      'Referer': 'https://artifacts.metadatacenter.orgx/'
    });
    let method = 'POST';
    this.httpRequestParams = {};
    this.httpRequestParams[CedarDataSaverComponent.FOLDER_ID] = folderId;

    // if (this.dataContext.savedTemplateID) {
    //   method = 'PUT';
    //   this.httpRequestParams[CedarDataSaverComponent.PARAM_ID] = this.dataContext.savedTemplateID;
    // }
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