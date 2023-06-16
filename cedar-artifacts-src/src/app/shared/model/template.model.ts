import {CedarArtifact} from './cedar-artifact.model';

export class Template extends CedarArtifact {
  public get templateName(){
    return this['schema:name'];
  }
}
