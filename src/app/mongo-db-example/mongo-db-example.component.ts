
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { FormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-mongo-db-example',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrl: './mongo-db-example.component.scss',
  template: `  
      <div>
        <h1>List of Books</h1>
        <ul>
          <li *ngFor="let item of items">Title : {{ item.title}}<br>Author : {{ item.author }}</li>
        </ul>
        <form (ngSubmit)="addItem()">
          <br>title <input [(ngModel)]="newItem.title" (change) ="handleTitleChange(newItem.title)" name="title" placeholder="title" />
          <br>author<input [(ngModel)]="newItem.author" name="author" placeholder="author" />
          <br>pages<input [(ngModel)]="newItem.pages" name="pages" type="number" placeholder="pages" />
          <br>rating<input [(ngModel)]="newItem.rating" name="rating" type="number" placeholder="rating" />
          <button type="button" (click)="onButtonClick()">Delete Book by title</button>
          <button type="submit">Add Item</button>
        </form>
      </div>
    `,
})
export class MongoDbExampleComponent implements  OnInit {
  items: any[] = [];
  newItem = { title: '', author: '', pages:'',rating:-1};

  constructor(private dataService: DataService) {}
  handleTitleChange(value: string): void {
    console.log("ddddd "+value);
    this.newItem.title= value;
  }
  onButtonClick() {
    this.dataService.deleteItem(this.newItem.title);
  }
  ngOnInit() {
    this.dataService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  addItem() {
    this.dataService.addItem(this.newItem).subscribe((item) => {
      this.items.push(item);
      this.newItem = {title: '', author: '', pages:'',rating:-1};
    });
  }
}