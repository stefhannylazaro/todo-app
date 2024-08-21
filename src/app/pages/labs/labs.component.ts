import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {
  constructor() {
    this.colorAux.valueChanges.subscribe( value => {
      console.log(value); 
    });
    this.widthAux.valueChanges.subscribe( value => {
      console.log(value);  
    }) 
  }
  dev = signal('Stefh');
  tasks = signal([
    'Instalar algular CLI',
    'Crear proyecto',
    'Crear componente'
  ]);
  age= 30;
  disabled = true;
  img = 'https://saviabruta.com/wp-content/uploads/2022/04/rosas.jpg';
  person = signal({
    name: 'Nicol',
    age: 21,
    avatar: 'https://img.freepik.com/premium-vector/person-avatar-design_24877-38130.jpg'
  });

  books = [
    'algebra',
    'Matematica',
    'geometria',
    'algoritmos'
  ];
  newBook = 'literatura';
  colorAux = new FormControl();
  widthAux = new FormControl(50, { nonNullable: true});
  emailAux = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.email
    ]
  });
  nameAux = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  })

  nameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  })

  clickHandler() {
    console.log('hola', this.person.name);
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    console.log(input.value);
    // modificar el valor de una señal -  dev
    this.dev.set(newValue);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value); 
  }

  addBook() {
    console.log('addBook');
    this.books.push(this.newBook)
  }
  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update( (person) => {
      return {
        ...person, age: parseInt(newValue,10)
      }
    });
  }
}
