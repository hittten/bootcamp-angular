import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  openNav(header: HTMLElement, icon: HTMLElement) {
    header.classList.toggle('nav-open');
    icon.textContent = header.classList.contains('nav-open') ? 'close' : 'menu';
  }
}
