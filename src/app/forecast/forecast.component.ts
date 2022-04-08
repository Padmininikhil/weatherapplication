import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
	
  Getapi_data: any = [];
  zip_value: any = [];
  final_array: any = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['zipcode']) {
        this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${(params['zipcode'])}&appid=5a4b2d457ecbef9eb2a71e480b947604`).subscribe((data: any) => {
          this.Getapi_data = data
          this.zip_value = params['zipcode']
          this.Getapi_data.list.forEach((element: any) => {
            if (this.final_array.length > 0) {
              let findData = this.final_array.find((d: any) => { return moment(d.dt_txt).format('YYYY-MM-DD') == moment(element.dt_txt).format('YYYY-MM-DD') })
              if (!findData) { this.final_array.push(element) }
            } else {
              this.final_array.push(element)
            }
          });
        });
      }
    })
    console.log(this.final_array, 'final_array');
  }
  
  /*Function to display Day By Date*/
  getDay_val(val: any) {
    const dow = moment(val.dt_txt).format('dddd');
    return dow;
  }
  
  /*Function call on click back*/
  clickBack() {
    this.router.navigate([`currentweatherScreen`])
  }
}
