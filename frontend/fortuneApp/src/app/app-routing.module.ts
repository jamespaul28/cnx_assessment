import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { GetluckyComponent } from './getlucky/getlucky.component'


const routes: Routes = [
  // {path: '', redirectTo: '/getlucky', pathMatch: 'full'},
  // {path: 'getlucky', component: GetluckyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
