import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Entrada } from '../models/entradas.model';

@Injectable({
  providedIn: 'root'
})
export class EntradasService extends HttpBaseService{

  private endpoint = 'entradas';

  constructor(protected override readonly injector: Injector) {
    super(injector);
   }

   getEntradas(): Observable<any>{
    return this.httpGet(`${this.endpoint}`);
   }

   excluirEntrada(id: number): Observable<any>{
    return this.httpDelete(`${this.endpoint}/${id}`); 
  }

  criarEntrada(payload: Entrada): Observable<any>{
    return this.httpPost(`${this.endpoint}`, payload);
  }

  getEntradaPeloId(id: number): Observable<any>{
    return this.httpGet(`${this.endpoint}/${id}`);
   }

   editarEntrada(payload: Entrada): Observable<any>{
    return this.httpPut(`${this.endpoint}/${payload.id}`, payload);
  }
}
