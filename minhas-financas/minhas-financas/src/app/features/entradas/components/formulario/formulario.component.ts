import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/features/categorias/service/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntradasService } from '../../service/entradas.service';
import * as dayjs from 'dayjs'
import { ActivatedRoute, Router } from '@angular/router';
import { Entrada } from '../../models/entradas.model';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{  
  
  foods!: Food[];
  formEntradas!: FormGroup;
  rota: string ='';
  id: string ='';
  entrada!: Entrada;
  estarCriando: boolean = false;
  categorias$ = this.categoriaService.getCategorias();

  tiposDeEntradas = [
    'receita', 'despesa' 
  ]  

  statusDePagamento = [
    { value: true, descricao: 'Pago'},
    { value: false, descricao: 'Pendente'}
  ]
  

  constructor(
    private readonly categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private readonly entradaService: EntradasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){
  }

  ngOnInit(): void {
    this.criarFormulario();
    // this.buscarCategorias();

    this.rota = this.activatedRoute.snapshot.url[0].path;

    if(this.rota === 'editar'){
      this.id = this.activatedRoute.snapshot.url[1].path;
      this.buscarEntradaPeloId();         
    } else {
      this.estarCriando = true;
    }
  }

  buscarEntradaPeloId(){
    this.entradaService.getEntradaPeloId(+this.id)
    .subscribe((entrada: Entrada) => {
      
      this.entrada = entrada;

      const data = this.entrada.data.split('/');

      this.formEntradas.controls['nome'].setValue(this.entrada.nome);
      this.formEntradas.controls['valor'].setValue(this.entrada.valor);
      this.formEntradas.controls['categoriaId'].setValue(this.entrada.categoriaId);
      this.formEntradas.controls['pago'].setValue(this.entrada.pago);
      this.formEntradas.controls['tipo'].setValue(this.entrada.tipo);
      this.formEntradas.controls['data'].setValue(new Date(+data[2],+data[1]-1,+data[0]));
    });
  }

  criarFormulario(){
    this.formEntradas = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        valor: ['', Validators.required],
        categoriaId: ['', Validators.required],
        pago: [true, Validators.required],
        tipo: ['Despesa', Validators.required],
        data: [new Date(), Validators.required]
      }
    )
  }

  salvarEntrada(){

    const data = dayjs(this.formEntradas.controls['data'].value).format('DD/MM/YYYY');
   // this.formEntradas.controls['data'].setValue(data);

    const payloadRequest: Entrada = Object.assign('', this.formEntradas.getRawValue());
    
    payloadRequest.data = data;

    const payload: Entrada = {
      nome: payloadRequest.nome,
      categoriaId: payloadRequest.categoriaId,
      data: payloadRequest.data,
      pago: payloadRequest.pago,
      tipo: payloadRequest.tipo,
      valor: payloadRequest.valor,
    }   
    
    if(this.estarCriando){
      this.criarNovaEntrada(payload);
    }

    else {
      payload.id = this.entrada.id;
      this.editarEntrada(payload);
    }
  }
  
  criarNovaEntrada(payload: Entrada){
    this.entradaService.criarEntrada(payload)
    .subscribe(resp => {
      this.redirecionar()
    });
  }

  editarEntrada(payload: Entrada){
    this.entradaService.editarEntrada(payload)
    .subscribe(resp => {
      this.redirecionar()
    });
  }

  redirecionar(){
    this.router.navigate(['entradas']);
  }

}
