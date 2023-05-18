import {Injectable} from '@angular/core';

@Injectable()
export class TemplateService {

  constructor() {}
  static isBasedOn(schema: any) {
    return schema['schema:isBasedOn'];
  }
}
