import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';


import { NgxIntlTelInputModule, } from 'ngx-intl-tel-input';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SignUpPageRoutingModule,
    FormsModule,
		ReactiveFormsModule,
		NgxIntlTelInputModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
