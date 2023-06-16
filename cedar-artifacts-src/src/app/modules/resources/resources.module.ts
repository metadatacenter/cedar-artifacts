import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {ResourcesRoutingModule} from './resources-routing.module';
import {MaterialModule} from '../material-module';
import {ProfileComponent} from "./pages/profile/profile.component";
import {InstancesCreateComponent} from "./pages/instances-create/instances-create.component";
import {InstancesEditComponent} from "./pages/instances-edit/instances-edit.component";

@NgModule({
  declarations: [
    InstancesCreateComponent,
    ProfileComponent,
    InstancesEditComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    SharedModule,
    ResourcesRoutingModule,
    MaterialModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class ResourcesModule {
}
