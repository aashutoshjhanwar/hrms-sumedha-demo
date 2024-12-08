import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../feature.interface';
import { CommonService } from '../../../shared/services/common.service';
import { NoDataFoundComponent } from '../../../shared/components/no-data-found/no-data-found.component';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, NoDataFoundComponent],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
  selectedDate: Date = new Date(); // Store selected date
  employees: Employee[] = []; // Store employees list
  attendance: any[] = []; // Store attendance data for the selected date

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.employees = this.commonService.getData('employees') || []; // Load employees from localStorage
    this.loadAttendance(); // Load attendance for today
  }

  loadAttendance(): void {
    const date = this.formatDate(this.selectedDate);
  
    // Load saved attendance data for the selected date
    let savedAttendance = this.commonService.getAttendance(date) || [];
    
    // If there is no saved attendance or some employees are missing, initialize new attendance data
    if (savedAttendance.length === 0) {
      this.attendance = this.employees.map(employee => ({
        id: employee.id,
        name: employee.name,
        mobile: employee.mobile,
        attendance: '', // Initialize with an empty attendance value
      }));
      this.commonService.setAttendance(date, this.attendance); // Save the new attendance data
    } else {
      // Check if any new employees need to be added
      const existingEmployeeIds = savedAttendance.map((emp:Employee) => emp.id);
      const newEmployees = this.employees.filter(emp => !existingEmployeeIds.includes(emp.id));
      
      // Add new employees to the saved attendance if they are not already present
      if (newEmployees.length > 0) {
        savedAttendance = [
          ...savedAttendance,
          ...newEmployees.map(employee => ({
            id: employee.id,
            name: employee.name,
            mobile: employee.mobile,
            attendance: '', // Initialize with empty attendance value for new employees
          }))
        ];
        this.commonService.setAttendance(date, savedAttendance); // Update localStorage with new employees
      }
  
      this.attendance = savedAttendance; // Assign the merged list to the attendance
    }
  }
  

  // Format date to 'yyyy-MM-dd'
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Navigate to the previous day
  previousDay(): void {
    this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() - 1));
    this.loadAttendance();
  }

  // Navigate to the next day
  nextDay(): void {
    this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() + 1));
    this.loadAttendance();
  }

  // Mark attendance for an employee
  markAttendance(employeeId: number, status: string): void {
    const date = this.formatDate(this.selectedDate);
    const employee = this.attendance.find(emp => emp.id === employeeId);

    if (employee) {
      // If current attendance is the same as the clicked status, clear it
      if (employee.attendance === status) {
        employee.attendance = ''; // Set attendance to empty
      } else {
        employee.attendance = status; // Otherwise, set to the selected status
      }
      this.commonService.setAttendance(date, this.attendance); // Update in localStorage
    }
  }

  // Get attendance summary
  getAttendanceSummary(): { present: number, absent: number, halfDay: number } {
    return {
      present: this.attendance.filter(e => e.attendance === 'Present').length,
      absent: this.attendance.filter(e => e.attendance === 'Absent').length,
      halfDay: this.attendance.filter(e => e.attendance === 'Half-Day').length,
    };
  }

  // Get specific employee's attendance status
  getEmployeeAttendance(employeeId: number): string {
    const employee = this.attendance.find(emp => emp.id === employeeId);
    return employee ? employee.attendance : '';
  }
}
