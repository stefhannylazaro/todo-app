import { Component, computed, effect, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

type statusFilter = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    // {
    //   id: Date.now(),
    //   title: 'Instalar algular CLI',
    //   completed: true,
    // },
    // {
    //   id: Date.now(),
    //   title: 'Crear proyecto',
    //   completed: false,
    // },
    // {
    //   id: Date.now(),
    //   title: 'Crear componente',
    //   completed: false,
    // },
  ]);
  // completedTasks
  // estado derivado, computed stated
  filter = signal<statusFilter>('all');
  tasksByFilter = computed( () => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') return tasks.filter(task => !task.completed)
    if (filter === 'completed') return tasks.filter(task => task.completed)

    return tasks;
  });

  completedTasks = computed( () => {
    const tasks = this.tasks();
    return tasks.filter(task => task.completed);
  });

  newtaskInput = new FormControl('', {
    nonNullable: true,
    validators:[
      Validators.required,
    ]
  })

  constructor() {
    effect( () => {
      // espiar las tareas
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks))
      console.log('run effect');
    })
  }

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      // las tareas a iniciar estan en el local storage
      this.tasks.set(tasks);
    }
  }

  addNewTask( event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask: Task = {
      id: Date.now(),
      title: input.value,
      completed: false
    };
    this.tasks.update( (tasks) => [...tasks, newTask]);
    input.value = '';
  }

  addNewTask2() {
    if(this.newtaskInput.valid && this.newtaskInput.value.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        title: this.newtaskInput.value.trim(),
        completed: false
      };
      this.tasks.update( (tasks) => [...tasks, newTask]);
      this.newtaskInput.setValue('');
    }
  }

  deleteTask(index: number):void{
    this.tasks.update( tasks => tasks.filter( (task, i) => index !== i));
  }

  deleteCompletedTask():void{
    this.tasks.update( tasks => tasks.filter( (task) => task.completed === false));
  }

  // Update tarea a modo completado
  updateTask(index: number) {
    this.tasks.update( tasks => tasks.map( (task, i) => {
      if(index === i) task.completed= !task.completed;
      return task
    }));
    // this.tasks.update( (tasks) => {
    //   return tasks.map( (task, i) => {
    //     if(index === i) {
    //       task.completed= !task.completed;
    //     }
    //     return task;
    //   })
    // });
  }

  // Update tarea a modo editable
  updateTaskToEdit(index: number) {
    this.tasks.update( tasks => tasks.map( (task, i) => {
      if(index === i)
        task.editable= true;
      else
        task.editable= false;// para que solo tenga 1 tarea en modo edicion
      return task
    }));
  }

  // Update texto de la tarea
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update( tasks => tasks.map( (task, i) => {
      if(index === i)
        task.title= input.value;
        task.editable= false;
      return task
    }));
  }

  changeFilter(filter: statusFilter) {
    this.filter.set(filter);
  }

}
