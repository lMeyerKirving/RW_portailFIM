import { ListComponent } from './list/list.component';
import { InitialdataResolver } from './initialdata.resolver';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },

  {
    path       : '',
    canActivate: [AuthGuard],
    component  : LayoutComponent,
    resolve    : {
        initialData: InitialdataResolver,
    },
    children   : [
        {path: 'list', component: ListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
