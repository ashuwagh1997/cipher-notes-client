import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'home', component: ListNotesComponent },
  {path:'', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
