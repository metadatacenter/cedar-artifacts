import {CedarArtifact} from './cedar-artifact.model';

export class TemplateInstance extends CedarArtifact {
  public get isBasedOn(){
    return this['schema:isBasedOn'];
  }
}
