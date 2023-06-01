import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {UpdatepopupComponent} from "../updatepopup/updatepopup.component";
import {ToastrService} from "ngx-toastr";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [DatePipe]
})
export class UserPageComponent implements OnInit {
  userId: string;
  user: any;
  firstName: string;
  lastName: string;
  birth: string;
  phone: string;
  gender: string;
  isAdmin: boolean;
  tgUserId: number;
  createdAt: string;
  updatedAt: string;


  constructor(private route: ActivatedRoute, private authService: AuthService, private dialog: MatDialog,
              private clipboard: Clipboard, private toastr: ToastrService) { }

  openUpdatePopup(): void {
    const dialogRef = this.dialog.open(UpdatepopupComponent, {
      width: '500px',
      disableClose: true,
      data: { userId: this.userId }
    })

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  copyToClipboard(text: any) {
    this.clipboard.copy(text);
    this.toastr.success( 'Copied');
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.authService.GetUser(this.userId).subscribe(
      (res: any) => {
        this.user = res;
        //витяг даних
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.birth = this.user.birth;
        this.phone = this.user.phone;
        this.gender = this.user.gender;
        this.isAdmin = this.user.isAdmin;
        this.tgUserId = this.user.tgUserId;
        this.createdAt = this.user.createdAt;
        this.updatedAt = this.user.updatedAt;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}

