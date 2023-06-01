import { Component, DoCheck, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements DoCheck {
  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: Event) {
  //   localStorage.removeItem('token');
  // }
  //
  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event: Event) {
  //   localStorage.removeItem('token');
  // }
   ismenurequired = false
  // isadminuser=false;
  constructor(private router: Router, private service: AuthService) {
  }
  ngDoCheck() {
    let currenturl = this.router.url;
    if (currenturl=='/login' || currenturl=='/register'){
      this.ismenurequired = false;
    } else {
      this.ismenurequired = true;
    }
    // if(this.service.GetUserRole()==='admin'){
    //   this.isadminuser=true
    // } else {
    //   this.isadminuser=false
    // }
  }
}
