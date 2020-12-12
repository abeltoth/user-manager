import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/types';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: User[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.userList = data.userList;
    });
  }

  navigateToDetailsPage(id: number): void {
    this.router.navigate([`${id.toString()}`], {relativeTo: this.activatedRoute});
  }

  addNewUser(): void {
    this.router.navigate(['new-user'], { relativeTo: this.activatedRoute });
  }

}
