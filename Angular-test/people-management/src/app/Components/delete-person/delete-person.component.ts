import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.services';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.scss']
})
export class DeletePersonComponent implements OnInit {
  personId: number;
  person: Person;
  loading = false;
  loadingPerson = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.personId = +params['id'];
      this.loadPerson();
    });
  }

  loadPerson() {
    this.loadingPerson = true;
    this.peopleService.getPerson(this.personId)
      .subscribe(
        (person) => {
          this.person = person;
          this.loadingPerson = false;
        },
        (error) => {
          this.error = 'Failed to load person details.';
          this.loadingPerson = false;
          console.error('Error loading person:', error);
        }
      );
  }

  confirmDelete() {
    this.loading = true;
    this.peopleService.deletePerson(this.personId)
      .subscribe(
        () => {
          this.router.navigate(['/people']);
        },
        (error) => {
          this.error = 'Failed to delete person.';
          this.loading = false;
          console.error('Error deleting person:', error);
        }
      );
  }

  cancel() {
    this.router.navigate(['/people']);
  }
}
