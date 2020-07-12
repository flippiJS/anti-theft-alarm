import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { timer, interval } from 'rxjs';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import * as firebase from 'firebase/app';
import { timeout } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  user: any;
  userName: string;
  public x: number;
  public y: number;
  public z: number;
  public activated = false;
  public interval = 1000;
  public startPosition = true;
  public showBar = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private deviceMotion: DeviceMotion, private orientation: ScreenOrientation, private flashlight: Flashlight,
    private vibration: Vibration, public alertController: AlertController, private utils: UtilitiesService,
  ) {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.user = firebase.auth().currentUser;

    this.watchMoves();
  }

  watchMoves() {
    this.orientation.lock('portrait');
    interval(this.interval).subscribe(() => {
      this.deviceMotion.getCurrentAcceleration().then((acceleration: DeviceMotionAccelerationData) => {
        if (this.activated) {
          if (acceleration.x > 6) {
            this.startPosition = false;
            this.vibration.vibrate(0);
            this.playAudio('../../assets/sounds/ladron.mp3');
          } else if (acceleration.x < -6) {
            this.startPosition = false;
            this.vibration.vibrate(0);
            this.playAudio('../../assets/sounds/atencion.mp3');
          } else if (acceleration.y > 7) {
            this.startPosition = false;
            this.vibration.vibrate(0);
            this.playAudio('../../assets/sounds/alarma.mp3');
            this.flashlight.switchOn();
            timer(5000).subscribe(() => {
              this.flashlight.switchOff();
            });
          } else if (acceleration.x < 1 && acceleration.x > -1 && acceleration.y < 1 && acceleration.y > -1 &&
            this.startPosition === false) {
            this.playAudio('../../assets/sounds/ayuda.mp3');
            this.vibration.vibrate(5000);
            this.wait(500);
          }
        }
      });
    });
  }

  wait(ms) {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }

  changeState() {
    this.changeLoadBar();
    if (this.activated) {
      this.presentAlertPrompt();
    } else {
      this.activated = !this.activated;
    }
  }

  changeLoadBar() {
    this.showBar = true;
    timer(3000).subscribe(() => {
      this.showBar = false;
    });
  }

  playAudio(src: string) {
    const AUDIO = new Audio();
    AUDIO.src = src;
    AUDIO.load();
    AUDIO.play();
  }

  logOut() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Ingresa tu contraseña',
      inputs: [
        {
          name: 'pass',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Desactivar',
          handler: (data) => {
            if (data.pass === this.authService.pass) {
              // logged in!
              console.log('Confirm Ok');
              this.activated = !this.activated;
            } else {
              // invalid login
              this.utils.handleError({ message: 'Contraseña inválida' });
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
