import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {

    return value ? 'Pago': 'Pendente';
  }

}
