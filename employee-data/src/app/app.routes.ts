import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
    },
    {
        path: 'employee',
        component: EmployeeComponent,
        data: { title: 'Employee' }
    },
    {
        path: 'employee/:id',
        component: EmployeeDetailComponent
    }
];
