import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  @Output() searchTextEmitter = new EventEmitter<string>();
  searchInputText: string = '';
  
  searchForm: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });

  constructor() {
    this.searchForm.get('searchInput')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
    .subscribe(response => {
      this.searchInputText = response;
      this.searchTextEmitter.emit(this.searchInputText);
    });
  }

  ngOnInit(): void { }

}
