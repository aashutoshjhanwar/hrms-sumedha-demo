import { Component } from '@angular/core';
import { ContentComponent } from '../../shared/components/content/content.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [ContentComponent,FooterComponent,HeaderComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {

}
