import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/services/common.service';  // Service to show notifications
import { Employee } from '../feature.interface';  // Interface for Employee data
import { StaffService } from './staff.service';  // Service to handle staff data
import { Router } from '@angular/router';  // Router service for navigation

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {
  employeeForm: FormGroup;  // FormGroup for employee details

  // Injecting dependencies into the component
  constructor(
    private fb: FormBuilder,          // For creating reactive forms
    private staffService: StaffService, // Service for adding employee
    private commonService: CommonService, // Service for showing notifications
    private router: Router            // Service for navigation
  ) {
    // Initializing the form with validation
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],  // Name is required
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Mobile is required and must be a 10-digit number
    });
  }

  // Method to add employee after validation
  addEmployee() {
    if (this.employeeForm.invalid) {
      // Show toaster notification if form is invalid
      this.commonService.showToaster('Please Fill all Valid Details', false);
      return;
    }

    // Creating a new employee object from the form values
    const newEmployee: Employee = this.employeeForm.value;
    
    // Calling the service to add the employee
    const result = this.staffService.addEmployee(newEmployee);

    // If the employee is added successfully, reset the form
    if (result.success) {
      this.employeeForm.reset();  // Reset the form after successful submission
    }
  }

  // Method to navigate to the attendance page
  goToAttendance() {
    this.router.navigate(['attendance']);  // Navigate to attendance page
  }
}
