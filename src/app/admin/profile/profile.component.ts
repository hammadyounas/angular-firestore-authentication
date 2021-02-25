import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { User } from './../../models/profile.model'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User
  constructor( private authService: AuthService) { }
  async ngOnInit() {
    try {           
      const user = await this.authService.getProfile();
      this.profile = user;
    } catch (error) {           
       console.error(error);       
   } 
    
  }

  logout(){
    this.authService.logout()
  }

}
