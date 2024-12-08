import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { response } from 'express';
@Component({
  selector: 'app-mongo-db-example',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrl: './mongo-db-example.component.scss',
  templateUrl: './mongo-db-example.component.html', 
})
export class MongoDbExampleComponent implements OnInit {
  items: any[] = [];
  newItem = { title: '', author: '', pages: '', rating: -1 };
  deleteResult: boolean = false;

  constructor(private dataService: DataService) {}
    handleTitleChange(value: string): void {
      console.log('ddddd ' + value);
      this.newItem.title = value;
    }
  onDeleteButtonClick() {
    this.dataService.deleteItem(this.newItem.title)
    .then((isSuccess)=>{
      this.deleteResult = isSuccess;
      this.getDataFromDB();
    })

    
  }
  async getDataFromDB(): Promise<void>{
      const data = await this.dataService.getItems();
      this.items= data;
        
  }
  ngOnInit() {
    this.getDataFromDB();
  }

  addItem() {
    this.dataService.addItem(this.newItem);
    this.getDataFromDB();

    // this.dataService.addItem(this.newItem).subscribe((item) => {
    //   this.items.push(item);
    //   this.newItem = { title: '', author: '', pages: '', rating: -1 };
    // });
  }
}
