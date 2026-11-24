
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './shared/layout/header/header';
import { Footer } from './shared/layout/footer/footer';
import { FloatingWhatsapp } from './shared/layout/floating-whatsapp/floating-whatsapp';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, FloatingWhatsapp],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
