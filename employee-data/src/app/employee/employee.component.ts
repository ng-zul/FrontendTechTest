import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, RouterModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  private apiUrl = 'https://api.sampleapis.com/futurama/characters';

  characters: any[] = [];
  filteredCharacters: any[] = [];
  searchEmployee: string = '';
  uniqueSpecies: string[] = [];
  uniqueGender: string[] = [];

  pageSize: number = 10;
  currentPage: number = 1;

  dialogVisible: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.http
      .get<any[]>(this.apiUrl)
      .subscribe((employees) => {
        this.characters = employees;
        this.filteredCharacters = [...this.characters]; 
        this.filterCharacters(); 
        this.getUniqueSpecies();
        this.getUniqueGender();
      });
  }

  getUniqueSpecies() {
    this.uniqueSpecies = [...new Set(this.characters.map((character) => character.species))];
  }

  getUniqueGender() {
    this.uniqueGender = [...new Set(this.characters.map((character) => character.gender))];
  }

  showDialog() {
    this.dialogVisible = true;
  }

  filterCharacters() {
    this.filteredCharacters = this.characters.filter(character =>
      character.name.first.toLowerCase().includes(this.searchEmployee.toLowerCase()) ||
      character.name.middle.toLowerCase().includes(this.searchEmployee.toLowerCase()) ||
      character.name.last.toLowerCase().includes(this.searchEmployee.toLowerCase())
    );
  
    const selectedSpeciesCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name=filter-checkbox]:checked');
    const selectedSpecies: string[] = Array.from(selectedSpeciesCheckboxes).map(checkbox => checkbox.value);
    
    if (selectedSpecies.length > 0) {
      this.filteredCharacters = this.filteredCharacters.filter(character => selectedSpecies.includes(character.species));
    }
  
    const selectedGenderRadio: HTMLInputElement | null = document.querySelector('input[name=filter-radio]:checked');
    const selectedGender: string | null = selectedGenderRadio ? selectedGenderRadio.value : null;
  
    if (selectedGender) {
      this.filteredCharacters = this.filteredCharacters.filter(character => character.gender === selectedGender);
    }
  
    this.currentPage = 1;
  }

  clearFilters() {
    this.searchEmployee = '';
  
    const selectedSpeciesCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name=filter-checkbox]:checked');
    selectedSpeciesCheckboxes.forEach(checkbox => checkbox.checked = false);
  
    const selectedGenderRadio: HTMLInputElement | null = document.querySelector('input[name=filter-radio]:checked');
    if (selectedGenderRadio) {
      selectedGenderRadio.checked = false;
    }
  
    this.filterCharacters();
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  get paginatedCharacters() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredCharacters.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredCharacters.length / this.pageSize);
  }

  
}
