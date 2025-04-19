import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleListComponent } from './Components/people.list/people.list.component';
import { EditPersonComponent } from './Components/edit-person/edit-person.component';
import { DeletePersonComponent } from './Components/delete-person/delete-person.component';

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/new', component: EditPersonComponent },
  { path: 'people/:id/edit', component: EditPersonComponent },
  { path: 'people/:id/delete', component: DeletePersonComponent },
  { path: '**', redirectTo: '/people' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }