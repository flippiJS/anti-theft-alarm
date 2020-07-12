import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  RouteReuseStrategy
} from '@angular/router';

import {
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular';
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';


/* -------------------------------------------------------------------------- */
/*                                 AngularFire                                */
/* -------------------------------------------------------------------------- */
import {
  AngularFireModule
} from '@angular/fire';
import {
  AngularFireDatabaseModule
} from '@angular/fire/database';
import {
  AngularFirestoreModule
} from '@angular/fire/firestore';
import {
  AngularFireFunctions
} from '@angular/fire/functions';
import {
  credentials
} from './../credentials';
import {
  AngularFireAuthGuard
} from '@angular/fire/auth-guard';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { SplashScreenPage } from './splash-screen/splash-screen.page';
@NgModule({
  declarations: [AppComponent, SplashScreenPage],
  entryComponents: [
    SplashScreenPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    /* ------------------------------ Angular fire ------------------------------ */
    AngularFireModule.initializeApp(credentials.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule
  ],
  providers: [
    /* ------------------------------ Angular fire ------------------------------ */
    AngularFireAuthGuard,
    AngularFireAuth,
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
