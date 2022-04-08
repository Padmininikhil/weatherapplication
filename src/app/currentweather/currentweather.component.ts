import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currentweather',
  templateUrl: './currentweather.component.html',
  styleUrls: ['./currentweather.component.css']
})
export class CurrentweatherComponent implements OnInit {

  currentlocation_Id = new FormControl('');
  findLocation_array: any;
  currentlocation_array: any = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.findLocation_array = localStorage.getItem("Added_locations")
    this.currentlocation_array = JSON.parse(this.findLocation_array)
  }

  /*Function Used to save the Location Details*/
  saveLocation_details() {
    this.currentlocation_array = []
    this.findLocation_array = localStorage.getItem("Added_locations")
    this.currentlocation_array = JSON.parse(this.findLocation_array)
    if (this.currentlocation_array && this.currentlocation_array.length > 0) {
      let Getapi_data
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${this.currentlocation_Id.value}&appid=5a4b2d457ecbef9eb2a71e480b947604`).subscribe((data: any) => {
        Getapi_data = data
        this.currentlocation_array.push({ ZipCode: this.currentlocation_Id.value, Getapi_datas: Getapi_data })
        localStorage.setItem('Added_locations', JSON.stringify(this.currentlocation_array))
      })

    } else {
      this.currentlocation_array = []
      let Getapi_data
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${this.currentlocation_Id.value}&appid=5a4b2d457ecbef9eb2a71e480b947604`).subscribe((data: any) => {
        Getapi_data = data
        this.currentlocation_array.push({ ZipCode: this.currentlocation_Id.value, Getapi_datas: Getapi_data })
        localStorage.setItem('Added_locations', JSON.stringify(this.currentlocation_array))
      })

    }
  }


  /*Function used to set the selected Data*/
  setselected_data(obj: any) {
    this.findLocation_array = localStorage.getItem("Added_locations")
    this.currentlocation_array = JSON.parse(this.findLocation_array)
    let findObj = this.currentlocation_array.findIndex((b: any) => b.ZipCode == obj.ZipCode)
    this.currentlocation_array.splice(findObj, 1);
    localStorage.setItem('Added_locations', JSON.stringify(this.currentlocation_array))
  }

  /*Function used to get the Images*/
  getImage_Val(val: any) {
    console.log(val + '.png');
    return val + '.png'
  }

  /*Function Used to show the Forecast Details*/
  showForecast_Details(obj: any) {
    this.router.navigate([`forecast/`, obj.ZipCode])
  }

}
