import { FormularioComponent } from './components/formulario/formulario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'editar/:id', component: FormularioComponent
  },
  {
    path: 'nova-categoria', component: FormularioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
