
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './portfolio-preview.html',
  styleUrl: './portfolio-preview.scss',
})
export class PortfolioPreview {}