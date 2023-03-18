import {CedarArtifacts} from "./cedar-artifacts.model";

export class ResourceReportUser extends CedarArtifacts {
  public keycloak: any;
  public neo4j: any;
  public opensearch: any;
  public cedarUser: any;
}
