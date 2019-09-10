import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
    ) {
      this.initializeApp();
    }
    
    initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        
        
        
        this.platform.resume.subscribe ( (e) => {
          const name =this.router.url;
          const finalappname = name.replace('/', '');
          if (finalappname === "login" || finalappname === "signup") {
            console.log('here');
          }else{
            console.trace("resume called");
            this.router.navigate(['/lockscreen']);
          }
        });
        
        this.platform.pause.subscribe ( (e) => {
          console.trace("pause called"); 
        });
        
        this.platform.backButton.subscribeWithPriority(9999, () => {
          const name =this.router.url;
          document.addEventListener('backbutton', function (event) {
            const finalappname = name.replace('/', '');
            if (finalappname === "login") {
              this.platform.exitApp();
              console.log('here');
            }else{
              this.platform.exitApp();
              console.log('this');
            }
            // if (!navigator.onLine) {
            //   this.platform.exitApp();
            // }
            // if (finalappname === "login") {
            //   this.platform.exitApp();
            //   console.log('here');
            // }else{
            //   event.preventDefault();
            //   event.stopPropagation();
            //   console.log('hello');
            // }
          }, false);
        });
        this.statusBar.styleDefault();
      });
      
      // this.platform.ready().then(() => {
      
      // });
    }
  }
  