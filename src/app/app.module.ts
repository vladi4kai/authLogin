import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ConfirmationdialogComponent } from './confirmationdialog/confirmationdialog.component';
import { CreatenewuserComponent } from './createnewuser/createnewuser.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ClipboardModule } from "@angular/cdk/clipboard";
import { FormsModule } from '@angular/forms';
import { TrainingListComponent } from './training-list/training-list.component';
import { CreateTrainingModalComponent } from './create-training-modal/create-training-modal.component';
import { TrainingGroupComponent } from './training-group/training-group.component';
import { TrainingGroupCreateComponent } from './training-group-create/training-group-create.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TokenInterceptor } from './token.interceptor';
import { ApiInterceptor } from 'src/app/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserlistingComponent,
    UpdatepopupComponent,
    ConfirmationdialogComponent,
    CreatenewuserComponent,
    UserPageComponent,
    TrainingListComponent,
    CreateTrainingModalComponent,
    TrainingGroupComponent,
    TrainingGroupCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    ClipboardModule,
    FormsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
