import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselComponent} from "./carousel/carousel.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [CarouselComponent, SidebarComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports: [CarouselComponent, SidebarComponent]
})
export class CommunModule { }
