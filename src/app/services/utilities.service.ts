import {
  Injectable
} from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  loader: any;
  isLoading = false;
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {

  }

  async presentAlert(header: string, sub: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header,
      subHeader: sub,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message, cssClass) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      animated: true,
      cssClass
    });
    await toast.present();
  }

  async presentLoading(message) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message,
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }


  async handleError(error): Promise<void> {
    console.log(error);
    const alert = await this.alertCtrl.create({
      message: error.message,
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    await alert.present();
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
}
