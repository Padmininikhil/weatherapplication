import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';
import { CurrentweatherComponent } from './currentweather/currentweather.component';

const routes: Routes = [
  {
    path: 'currentweatherScreen',
    component: CurrentweatherComponent,
  },
  {
    path: 'forecast/:zipcode',
    component: ForecastComponent,
  },
  {
    path: '',
    redirectTo: 'currentweatherScreen',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
