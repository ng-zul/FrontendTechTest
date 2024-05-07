import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
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
      .get<any[]>('https://api.sampleapis.com/futurama/characters')
      .subscribe((employees) => {
        this.characters = employees;
        this.filteredCharacters = [...this.characters]; // Initialize filteredCharacters with all characters
        this.filterCharacters(); // Apply initial filter
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
    // Filter based on search query
    this.filteredCharacters = this.characters.filter(character =>
      character.name.first.toLowerCase().includes(this.searchEmployee.toLowerCase()) ||
      character.name.middle.toLowerCase().includes(this.searchEmployee.toLowerCase()) ||
      character.name.last.toLowerCase().includes(this.searchEmployee.toLowerCase())
    );
  
    // Filter based on selected species
    const selectedSpeciesCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name=filter-checkbox]:checked');
    const selectedSpecies: string[] = Array.from(selectedSpeciesCheckboxes).map(checkbox => checkbox.value);
    
    if (selectedSpecies.length > 0) {
      this.filteredCharacters = this.filteredCharacters.filter(character => selectedSpecies.includes(character.species));
    }
  
    // Filter based on selected gender
    const selectedGenderRadio: HTMLInputElement | null = document.querySelector('input[name=filter-radio]:checked');
    const selectedGender: string | null = selectedGenderRadio ? selectedGenderRadio.value : null;
  
    if (selectedGender) {
      this.filteredCharacters = this.filteredCharacters.filter(character => character.gender === selectedGender);
    }
  
    this.currentPage = 1;
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
