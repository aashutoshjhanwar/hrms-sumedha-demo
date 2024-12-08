import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root', // This makes the service available throughout the app
})
export class CommonService {
  private attendanceKey = 'attendance'; // Key to store attendance data in localStorage

  constructor(
    private toastService: ToastrService, // Injecting ToastrService to display notifications
  ) {}


  // Function to show a toast notification (success or error)
  showToaster(comment: string, success: boolean, options: any = {}) {
    // Check if the comment is valid (not null, undefined, or empty)
    if (comment != null && comment != undefined && comment != '') {
      // Display success toast if the success flag is true
      if (success) {
        this.toastService.success(comment, "", {
          positionClass: 'toast-bottom-right' // Position the toast at the bottom-right
        });
      } else {
        // Display error toast if the success flag is false
        this.toastService.error(comment, "", {
          positionClass: 'toast-bottom-right' // Position the toast at the bottom-right
        });
      }
    }
  }

  // Save any data to localStorage using a specific key
  saveData(key: string, value: any): void {
    // Store data in localStorage after converting it to a JSON string
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Retrieve data from localStorage and parse it as the specified type
  getData<T>(key: string): T {
    // Get the stored data and parse it as JSON
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null; // Return parsed data or null if not found
  }

  // Get attendance data for a specific date
  getAttendance(date: string): any {
    // Retrieve the stored attendance data
    const attendance = localStorage.getItem(this.attendanceKey);
    if (attendance) {
      // Parse the attendance data and return the specific date's attendance or an empty array
      const attendanceData = JSON.parse(attendance);
      return attendanceData[date] || []; // Return empty array if no attendance found for the date
    }
    return []; // Return empty array if no attendance data is stored
  }

  // Set attendance data for a specific date
  setAttendance(date: string, attendance: any[]): void {
    // Retrieve all attendance data
    const attendanceData = this.getAllAttendance();
    // Update the attendance for the specified date
    attendanceData[date] = attendance;
    // Store the updated attendance data back in localStorage
    localStorage.setItem(this.attendanceKey, JSON.stringify(attendanceData));
  }

  // Get all attendance data
  getAllAttendance(): any {
    // Retrieve the stored attendance data for all dates
    const attendance = localStorage.getItem(this.attendanceKey);
    // Return the parsed data or an empty object if not found
    return attendance ? JSON.parse(attendance) : {};
  }
}
