import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.services';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  loading = true;
  error = '';

  constructor(
    private peopleService: PeopleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.loading = true;
    this.peopleService.getPeople()
      .subscribe(
        (data) => {
          this.people = data;
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load people. Please try again later.';
          this.loading = false;
          console.error('Error loading people:', error);
        }
      );
  }

  editPerson(id: number) {
    this.router.navigate(['/people', id, 'edit']);
  }

  deletePerson(id: number) {
    this.router.navigate(['/people', id, 'delete']);
  }

  addNewPerson() {
    this.router.navigate(['/people/new']);
  }
}