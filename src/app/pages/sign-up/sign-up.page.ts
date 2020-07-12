import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  RouterModule
} from '@angular/router';
/* ----------------------------- Form Variables ----------------------------- */

import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  SearchCountryField,
  TooltipLabel,
  CountryISO
} from 'ngx-intl-tel-input';

/* -------------------------------- Services -------------------------------- */


import {
  UtilitiesService
} from './../../services/utilities.service';
import {
  AuthService
} from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Kenya, CountryISO.Tanzania, CountryISO.Uganda];
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    /*     phone: new FormControl(undefined, [Validators.required]),*/
    password: new FormControl(undefined, [Validators.required])
  });

  lat: any = 0;
  lng: any = 0;

  constructor(
    private utils: UtilitiesService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() { }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.SouthAfrica, CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  }

  submit() {
    const form = this.signupForm.value;
    if (form.firstName.length > 0 && form.lastName.length > 0 && form.email.length > 0) {
      form.coords = [this.lat, this.lng];
      this.utils.presentLoading('Creando cuenta, espere...');
      this.authService.signup(form).then(() => {
        this.utils.dismissLoading();
        this.utils.presentToast('Cuenta creada con exito.', 'toast-success');
        this.router.navigate(['/tabs/home']);
      }).catch((err) => {
        this.utils.dismissLoading();
        console.log(err);
        this.utils.presentToast('Opa! Ocurrio un error.', 'toast-error');
      });
      console.log(form);
    } else {
      this.utils.presentToast('Completá todos los campos', 'toast-danger');
    }

  }


  logIn() {
    this.router.navigate(['/login']);
  }
}
