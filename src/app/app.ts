import { Component } from '@angular/core';
import { ReactiveForm } from "./reactive-form/reactive-form";

@Component({
  selector: 'app-root',
  imports: [ReactiveForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-reactive-forms-guide';
}
