import { Routes } from '@angular/router';
import { AppLayoutComponent } from '../app-layout/app-layout.component';
import { AttendanceComponent } from '../features/attendance/attendance.component';
import { StaffComponent } from '../features/staff/staff.component';

 export const APP_LAYOUT_ROUTES: Routes =[

    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'attendance',
                component: AttendanceComponent,
              },
             {
                    path: '',
                    redirectTo: '/attendance',
                    pathMatch: 'full',
             },
             {
                path: 'staff',
                component: StaffComponent,
              },
             
          
        ],
      },
    ]