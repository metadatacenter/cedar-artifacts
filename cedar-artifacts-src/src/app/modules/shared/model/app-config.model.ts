export class AppConfig {
  appUrl: string = '';
  apiUrl: string = '';
  cedarUrl: string = '';
  terminologyBaseUrl: string = '';
  bridgeBaseUrl: string = '';
  keycloakUrl: string = '';
  loaded: boolean = false;

  init(appConfig: AppConfig) {
    const domain = (window as any).cedarDomain;
    this.keycloakUrl = appConfig.keycloakUrl.replace('{{cedarDomain}}', domain);
    this.appUrl = appConfig.appUrl.replace('{{cedarDomain}}', domain);
    this.apiUrl = appConfig.apiUrl.replace('{{cedarDomain}}', domain);
    this.cedarUrl = appConfig.cedarUrl.replace('{{cedarDomain}}', domain);
    this.terminologyBaseUrl = appConfig.terminologyBaseUrl.replace('{{cedarDomain}}', domain);
    this.bridgeBaseUrl = appConfig.bridgeBaseUrl.replace('{{cedarDomain}}', domain);
    this.loaded = true;
  }
}
