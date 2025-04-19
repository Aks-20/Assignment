import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.services';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {
  personForm: FormGroup;
  personId: number;
  isNewPerson = false;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService
  ) { }

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]]
    });

    this.route.params.subscribe(params => {
      if (params['id'] === 'new') {
        this.isNewPerson = true;
      } else {
        this.personId = +params['id'];
        this.loadPerson();
      }
    });
  }

  get f() { return this.personForm.controls; }

  loadPerson() {
    this.loading = true;
    this.peopleService.getPerson(this.personId)
      .subscribe(
        (person) => {
          this.personForm.patchValue({
            firstName: person.firstName,
            lastName: person.lastName,
            email: person.email,
            age: person.age
          });
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load person details.';
          this.loading = false;
          console.error('Error loading person:', error);
        }
      );
  }

  onSubmit() {
    this.submitted = true;

    if (this.personForm.invalid) {
      return;
    }

    this.loading = true;
    
    const person: Person = {
      id: this.isNewPerson ? null : this.personId,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      age: this.f.age.value
    };

    if (this.isNewPerson) {
      this.peopleService.addPerson(person)
        .subscribe(
          () => {
            this.router.navigate(['/people']);
          },
          (error) => {
            this.error = 'Failed to add person.';
            this.loading = false;
            console.error('Error adding person:', error);
          }
        );
    } else {
      this.peopleService.updatePerson(person)
        .subscribe(
          () => {
            this.router.navigate(['/people']);
          },
          (error) => {
            this.error = 'Failed to update person.';
            this.loading = false;
            console.error('Error updating person:', error);
          }
        );
    }
  }

  cancel() {
    this.router.navigate(['/people']);
  }
}