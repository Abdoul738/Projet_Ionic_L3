import { Component, OnInit } from '@angular/core';
import { IonicAuthService } from '../ionic-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: string;
  constructor(private router: Router,private ionicAuthService: IonicAuthService) { }

  ngOnInit() {
  }

  reset(){
    this.ionicAuthService.forgotpasswordUSer(this.email);
    this.router.navigateByUrl('login');
  }
}
