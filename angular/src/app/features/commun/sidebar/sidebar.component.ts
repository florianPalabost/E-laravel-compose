import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  hideSideNav = true;
  isAdmin = true;
  logged = true;
  constructor() { }

  ngOnInit() {
  }

  toggleSideNav(): void {
    console.debug('btn clicked');

    this.hideSideNav = !this.hideSideNav;
  }
}
