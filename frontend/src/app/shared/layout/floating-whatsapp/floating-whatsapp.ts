
import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [],
  templateUrl: './floating-whatsapp.html',
  styleUrl: './floating-whatsapp.scss',
})
export class FloatingWhatsapp {
  readonly whatsappNumber = '919527218040';

  readonly whatsappMessage =
    'Hello! I am interested in your digital marketing services. I would like to know more about your services.';

  get whatsappLink(): string {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
  }
}
