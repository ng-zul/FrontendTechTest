import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css',
})

export class EmployeeDetailComponent {
  private apiUrl = 'https://api.sampleapis.com/futurama/characters';
  employeeId!: string; 
  employeeDetails: any; 
  characters: any;
  sayings: string[] = [];
  shuffledQuotes: string[] = [];
  displayQuotes: string[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id') || ''; 
      this.fetchEmployeeDetails(this.employeeId);
    });
  }

  fetchEmployeeDetails(id: string): void {
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe((data) => {
      this.employeeDetails = data;
      if (data.sayings && Array.isArray(data.sayings)) {
        this.shuffledQuotes = data.sayings.slice(); 
        this.shuffleQuotes();
      }
    });
  }

  shuffleQuotes(): void {
    for (let i = this.shuffledQuotes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledQuotes[i], this.shuffledQuotes[j]] = [this.shuffledQuotes[j], this.shuffledQuotes[i]];
      this.displayQuotes = this.shuffledQuotes.slice(0, 3);
    }
  }

  reshuffleQuotes(): void {
    this.shuffleQuotes();
  }

  goBack() {
    window.history.back();
  }
}
