import { Injectable } from '@angular/core';
import { Employee } from '../feature.interface';
import { CommonService } from '../../../shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  // Key for storing employee data and last used employee ID in localStorage
  private employeesKey = 'employees';
  private lastIdKey = 'lastEmployeeId';

  constructor(private commonService: CommonService) {}

  /**
   * Retrieves the list of employees from localStorage.
   * @returns {Employee[]} Array of Employee objects
   */
  getEmployees(): Employee[] {
    // Retrieves employees from localStorage, returns empty array if no data exists
    return this.commonService.getData<Employee[]>(this.employeesKey) || [];
  }

  /**
   * Generates the next available employee ID by incrementing the last ID used.
   * @returns {number} The next available employee ID.
   */
  getNextId(): number {
    // Retrieve the last used ID from localStorage or default to 0 if not found
    const lastId = Number(localStorage.getItem(this.lastIdKey)) || 0;
    const nextId = lastId + 1;

    // Store the new ID back in localStorage for future use
    localStorage.setItem(this.lastIdKey, nextId.toString());
    
    return nextId;
  }

  /**
   * Adds a new employee to the list of employees.
   * @param {Omit<Employee, 'id'>} employee The employee data excluding the ID field
   * @returns {Object} A response indicating success or failure of the operation.
   */
  addEmployee(employee: Omit<Employee, 'id'>): { success: boolean; message: string } {
    // Retrieve the current list of employees from localStorage
    const employees = this.getEmployees();
    
    // Check if the employee's mobile number already exists in the system
    if (employees.some((emp) => emp.mobile === employee.mobile)) {
      // Show error message if mobile number already exists
      this.commonService.showToaster('Mobile Number Already Exists', false);
      return { success: false, message: 'Mobile number already exists' };
    }

    // Create the new employee object with a unique ID and the provided details
    const newEmployee: Employee = {
      id: this.getNextId(),  // Assign a new unique ID
      ...employee,           // Spread the remaining employee details
    };

    // Add the new employee to the list of employees
    employees.push(newEmployee);
    
    // Show success message
    this.commonService.showToaster('Staff added Successfully', true);
    
    // Save the updated employees list back to localStorage
    this.commonService.saveData(this.employeesKey, employees);

    return { success: true, message: 'Employee added successfully' };
  }
}
