import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestplanComponent }    from './testplans/testplans.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authentication/auth.guard';
const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
