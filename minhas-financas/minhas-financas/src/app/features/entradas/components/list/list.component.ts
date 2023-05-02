import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { EntradasService } from '../../service/entradas.service';
import { Router } from '@angular/router';
import { Entrada } from '../../models/entradas.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  displayedColumns: string[] = ['id', 'nome','pago','data','valor','tipo','edit', 'excluir'];
  dataSource = new MatTableDataSource<Entrada>();
  entradas: Entrada[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private entradaService: EntradasService,
    private router: Router){
  }

  ngOnInit(): void {
    this.buscarEntradas();
  }

  buscarEntradas(){
    this.entradaService.getEntradas()
    .subscribe((entradas: Entrada[]) => {      
      this.entradas = entradas;
      this.dataSource.data = this.entradas;
    })
  }

  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
  }

  chamarEdicao(entrada: Entrada): void {
    this.router.navigate(['entradas', 'editar', entrada.id]);
  }

  excluirEntrada(id: number){
    this.entradaService.excluirEntrada(id)
    .subscribe(resp => {
      this.router.navigate(['entradas']);
      this.buscarEntradas()
    })
  }

  novaEntrada(){
    this.router.navigate(['entradas','novo']);
  }

}
