import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule }    from '@angular/http';
import { MultiSelectModule } from 'primeng/primeng';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BizfunctionComponent }  from './bizfunctions/bizfunctions.component';
import { BizsubfunctionComponent }  from './bizsubfunctions/bizsubfunctions.component';
import { ReleaseComponent }  from './releases/releases.component';
import { TestTypeComponent }  from './test_types/test_types.component';
import { AppConfig } from './app.config';
import { AlertService } from './alert/alert.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication/authentication.service';
import { UserService } from './user.service';
import { AuthGuard } from './authentication/auth.guard';
import { TestplanComponent }  from './testplans/testplans.component';
import { TestplanService }          from './testplans/testplans.service';
import { TestcaseownerComponent }  from './testcase_owners/testcase_owners.component';
import { TestcaseService }          from './testcases/testcases.service';
import { TestscriptownerComponent }  from './testscript_owners/testscript_owners.component';
import { TestscriptService }          from './testscripts/testscripts.service';
import { DaterangeComponent }  from './datarange/daterange.component';
import { DaterangeService }          from './datarange/daterange.service';
import { AlertComponent } from './alert/alert.component';
import { ColsDisplayComponent } from './cols_display/cols_display.component';
import { AdhocService } from './adhoc/adhoc.service';
import { TestcaseComponent } from './testcases/testcase.component';
import { ExecutionresultComponent } from './execution_results/executionresult.component';
import { CapabilityTeamComponent }  from './capability_team/capability_team.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    MultiSelectModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
    AppComponent,
    TestplanComponent,
    DashboardComponent,
    BizfunctionComponent,
    BizsubfunctionComponent,
    ReleaseComponent,
    TestTypeComponent,
    TestcaseownerComponent,
    TestscriptownerComponent,
    DaterangeComponent,
    AlertComponent,
    ColsDisplayComponent,
    TestcaseComponent,
    ExecutionresultComponent,
    CapabilityTeamComponent,
    LoginComponent
  ],
  providers: [ TestplanService,
    AppConfig,
    AlertService,
    AuthenticationService,
    AuthGuard,
    TestcaseService,
    TestscriptService,
    DaterangeService,
    AdhocService,
    TestcaseService,
    UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
