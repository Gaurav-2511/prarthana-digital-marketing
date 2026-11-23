import { Component } from '@angular/core';
import { Hero } from './sections/hero/hero';
import { AboutPreview } from './sections/about-preview/about-preview';
import { ServicesPreview } from './sections/services-preview/services-preview';
import { WhyChooseUs } from './sections/why-choose-us/why-choose-us';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, AboutPreview, ServicesPreview, WhyChooseUs],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home { }