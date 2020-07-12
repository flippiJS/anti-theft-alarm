import {
  Injectable
} from '@angular/core';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  first
} from 'rxjs/operators';

import {
  auth
} from 'firebase/app';
import * as firebase from 'firebase/app';

import {
  Router
} from '@angular/router';
import {
  Platform
} from '@ionic/angular';
import {
  UtilitiesService
} from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId: string;
  public pass: string;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private platform: Platform,
    private utils: UtilitiesService
  ) { }

  getUser(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    this.pass = password.toString();
    return this.afAuth.auth.signInWithEmailAndPassword(email, 'utnfrahash' + password);
  }

  async signup(
    data: any
  ): Promise<firebase.auth.UserCredential> {
    try {
      const newUserCredential: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      await this.firestore
        .doc(`users/${newUserCredential.user.uid}`)
        .set({
          fullName: (data.firstName) + (data.lastName),
          firstName: (data.firstName),
          lastName: (data.lastName),
          email: data.email,
          password: data.password,
          userId: newUserCredential.user.uid,
        });
      return newUserCredential;
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle() {
    return await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // this.router.navigate(['/home']);
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
