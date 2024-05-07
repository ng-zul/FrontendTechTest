import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { HeaderComponent } from './component/header/header.component';
import { initFlowbite } from 'flowbite';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
     RouterOutlet,
     SidenavComponent,
     HeaderComponent,
     CommonModule,
     HttpClientModule,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'employee-data';

  routeData$: Observable<any> | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    initFlowbite();

    this.routeData$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data)
    );
  }
}
