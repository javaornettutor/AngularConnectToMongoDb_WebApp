import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MongoDbExampleComponent } from '../app/mongo-db-example/mongo-db-example.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularConnectToMongoDb_WebApp';
}
