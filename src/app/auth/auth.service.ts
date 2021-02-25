import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from '@firebase/auth-types';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.router.navigate(['/profile']);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.router.navigate(['/login']);
        localStorage.setItem('user', null);
      }
    })
  }

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.user = result.user;
    localStorage.setItem('user', JSON.stringify(result.user));
    this.router.navigate(['/profile']);
  }

  async register(obj) {
    try {
      let result = await this.afAuth.createUserWithEmailAndPassword(obj.username, obj.password);
      let profile = await this.firestore.collection('profiles').doc(result.user.uid).set({
        firstName: obj.firstName,
        lastName: obj.lastName,
        username: obj.username,
      })
      this.user = result.user
      localStorage.setItem('user', JSON.stringify(result.user));
      this.router.navigate(['/profile']);
    } catch (err) {
    }
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

async getProfile(){
  try{
    JSON.parse(localStorage.getItem('user')).uid
    let profile =  await this.firestore.collection('profiles').doc(JSON.parse(localStorage.getItem('user')).uid).get().toPromise()
    if(profile.exists) return profile.data()
  }catch(err){
  }
}
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
