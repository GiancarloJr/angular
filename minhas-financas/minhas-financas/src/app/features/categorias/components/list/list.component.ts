import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '../../service/categoria.service';
import { Router } from '@angular/router';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'edit', 'excluir'];
  dataSource = new MatTableDataSource<Categoria>();
  categorias: Categoria[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router){
  }

  ngOnInit(): void {
    this.buscarCategorias();
  }

  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
  }

  buscarCategorias(){
    this.categoriaService.getCategorias().
    subscribe((categorias: Categoria[]) => {
        this.categorias = categorias
        this.dataSource.data = this.categorias;
      });
  }

  chamarEdicao(categoria: Categoria): void {
    this.router.navigate(['categorias', 'editar', categoria.id]);
  }

  excluirCategoria(id: number){
    this.categoriaService.excluirCategoria(id)
    .subscribe(resp => {
      this.router.navigate(['categorias']);
      this.buscarCategorias()
    })
  }

  novaCategoria(){
    this.router.navigate(['categorias','nova-categoria']);
  }

}


