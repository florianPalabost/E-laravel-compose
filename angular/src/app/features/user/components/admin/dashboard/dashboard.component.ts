import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products = [
    {
      name: 'tptptptp',
      price: 15,
      sells: 195
    },
    {
      name: 'tptptptp',
      price: 15,
      sells: 195
    },
    {
      name: 'tptptptp',
      price: 15,
      sells: 195
    },
    {
      name: 'tptptptp',
      price: 15,
      sells: 195
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
