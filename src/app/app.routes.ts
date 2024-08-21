import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { LabsComponent } from './pages/labs/labs.component'
import { JuegoComponent } from './pages/juego/juego.component'

export const routes: Routes = [
  { path: '',
    component: HomeComponent
  },
  { path: 'labs',
    component: LabsComponent
  },
  { path: 'juego',
    component: JuegoComponent
  },
];
