import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id: string;

  userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    address: this.formBuilder.group({
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      zipcode: ['', [Validators.required, Validators.maxLength(20)]],
      geo: this.formBuilder.group({
        lat: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
        lng: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      }),
    }),
    phone: ['', [Validators.required, Validators.maxLength(100), CustomValidators.phone]],
    website: ['', [Validators.required, Validators.maxLength(100)]],
    company: this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      catchPhrase: ['', [Validators.required, Validators.maxLength(100)]],
      bs: ['', [Validators.required, Validators.maxLength(100)]],
    })
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      if (data.user) {
        this.userForm.patchValue(data.user);
        this.id = data.user.id;
      }
    });
  }

  saveUser(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const body = this.userForm.value;

      if (this.id) {
        this.apiService.put(`/users/${this.id}`, body)
          .subscribe(
            () => this.navigateToListPage(),
            error => console.error(error)
          );
      } else {
        this.apiService.post(`/users`, body)
          .subscribe(
            () => this.navigateToListPage(),
            error => console.error(error)
          );
      }
    }
  }

  deleteUser(): void {
    if (this.id) {
      this.apiService.delete(`/users/${this.id}`)
        .subscribe(
          () => this.navigateToListPage(),
          error => console.error(error)
        );
    }
  }

  navigateToListPage(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

}
