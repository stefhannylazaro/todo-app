import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.sass'
})
export class JuegoComponent {
  public name:string;
  public show:boolean = true;
  constructor() {
    this.name = 'Monopolio';
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngDoCheck() {
    console.log('ngDocheck:',this.name);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  updateName() {
    this.name = 'Ludo';
  }
}
