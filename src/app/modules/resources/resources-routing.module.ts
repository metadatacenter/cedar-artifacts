import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from "../../guard/auth.guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {InstancesCreateComponent} from "./pages/instances-create/instances-create.component";
import {InstancesEditComponent} from "./pages/instances-edit/instances-edit.component";

export const routes: Routes = [
  {
    path: 'instances/create/:templateId',
    component: InstancesCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'instances/edit/:instanceId',
    component: InstancesEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
