import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from "../service/users.service";
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from "../updatepopup/updatepopup.component";
import { ToastrService } from "ngx-toastr";
import { Clipboard } from '@angular/cdk/clipboard';

interface User {
  firstName: string;
  lastName: string;
  birth: string;
  phone: string;
  gender: string;
  isAdmin: boolean;
  tgUserId: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [DatePipe]
})
export class UserPageComponent implements OnInit {
  userId: string;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private toastr: ToastrService
  ) {}

  openUpdatePopup(): void {
    const dialogRef = this.dialog.open(UpdatepopupComponent, {
      width: '500px',
      disableClose: true,
      data: { userId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.toastr.success('Copied');
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.userService.getSingleUser(this.userId).subscribe(
      (res: User) => {
        this.user = res;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
