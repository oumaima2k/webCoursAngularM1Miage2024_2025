import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../../shared/rendu.directive';
import { Assignment } from '../assignment.model';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssignmentDetailComponent } from '../assignment-detail/assignment-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';

import { MatListModule } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';

import { Router, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, 
    MatFormFieldModule, MatInputModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule
    , MatListModule, RouterModule],
  providers: [],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  //@Output() nouvelAssignment= new EventEmitter<Assignment>();
  constructor (private assignmentsService: AssignmentsService, private router: Router){}
  nomDevoir = "";
  dateDevoir: Date = new Date();
  assignmentSelectionne!:Assignment;
  dateDeRendu: any;
  assignments = [
    { nom: 'Devoir 1', rendu: true, dateDeRendu: new Date('2023-10-01') },
    { nom: 'Devoir 2', rendu: false, dateDeRendu: new Date('2023-10-15') },
    { nom: 'Devoir 3', rendu: true, dateDeRendu: new Date('2023-10-20') }
  ];

  onSubmit(nomAssignment: any){
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000)
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment).subscribe(message => console.log(message));
    this.router.navigate(['/home']);
  }

  assignmentClique(assignment: Assignment){
    this.assignmentSelectionne = assignment;
  }
}