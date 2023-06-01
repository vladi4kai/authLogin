import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {UserlistingComponent} from "./userlisting/userlisting.component";
import {AuthGuard} from "./guard/auth.guard";
import {CreatenewuserComponent} from "./createnewuser/createnewuser.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {TrainingListComponent} from "./training-list/training-list.component";
import {TrainingGroupComponent} from "./training-group/training-group.component";
import {TrainingGroupCreateComponent} from "./training-group-create/training-group-create.component";


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'trainings', component: TrainingListComponent, canActivate: [AuthGuard]},
  {path: 'trainings/group', component: TrainingGroupComponent, canActivate: [AuthGuard]},
  {path: 'trainings/group/new', component: TrainingGroupCreateComponent, canActivate: [AuthGuard]},
  {path: 'trainings/group/:id', component: TrainingGroupCreateComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserlistingComponent, canActivate:[AuthGuard]},
  {path: 'user/new-user', component: CreatenewuserComponent, canActivate:[AuthGuard]},
  { path: 'users/:id/edit', component: UserPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
