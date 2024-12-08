import { Component, /*Input*/ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {

  /*@Input()*/ assignmentTransmis!: Assignment | null;

  constructor(private assignmentsServises: AssignmentsService, 
              private authService:AuthService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit(){
    const id = +this.route.snapshot.params['id'];
    this.assignmentsServises.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment ?? null);
  }

  onClickEdit(){
    if (this.assignmentTransmis) {
      this.router.navigate(["assignment", this.assignmentTransmis.id, 'edit'],
      {queryParams:{nom:this.assignmentTransmis.nom},fragment:'edition'});
    }
  }

  onAssignmentRendu(){
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentsServises.updateAssignment(this.assignmentTransmis).subscribe(reponse => {console.log(reponse.message); this.router.navigate(["/home"]);});
    }
  }

  onAssignmentDelet(){}

  onDelet(){
    if (this.assignmentTransmis) {
      this.assignmentsServises.deleteAssignment(this.assignmentTransmis).subscribe((reponse) => {console.log(reponse.message); this.router.navigate(["/home"]);});
      this.assignmentTransmis = null;
    }
  }

  isAdmin(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.role === 'admin';
  }
}