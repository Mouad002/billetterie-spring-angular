import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-organizer-layout-component',
  standalone: false,
  templateUrl: './organizer-layout-component.component.html',
  styleUrl: './organizer-layout-component.component.css'
})
export class OrganizerLayoutComponentComponent implements OnInit{

  showWelcomeMessage = true;
  nameOrganizer: string = 'Mohamed Amine'; // par défaut

  constructor(private router : Router){}



  ngOnInit(): void {
     this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Masquer le message de bienvenue si on navigue vers une page autre que /organizer
        if (event.urlAfterRedirects !== '/organizer') {
          this.showWelcomeMessage = false;
        }
      });
  }

}
