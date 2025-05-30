import { Pipe, PipeTransform } from '@angular/core';

type PipeDataTable = {
  [key: string]: (value: any) => string;
};

@Pipe({
  name: 'dataTable',
  standalone:true
})



export class DataTablePipe implements PipeTransform {



  private pipeDataTable: PipeDataTable = {
    text: (value: any = '---') => value === '' ? '---' : value,

    movil: (value: any = '---') => value?.length ===10 ?  this.convertMobil(value) : value,


    number: (value: any) => value ? `$ ${new Intl.NumberFormat('de-DE', {
      style: 'decimal',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(Math.trunc(value))}` : '$ 0',

    document: (value: any) => value ? `${new Intl.NumberFormat('de-DE', {
      style: 'decimal',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(Math.trunc(value))}` : '0',



    percentage: (value: any = '---') => `${value}%`,







    megabytes : (value: number) => {
        if (!value) return '0 MB';
        const mbValue = value / (1024 * 1024)
        return mbValue.toFixed(1) === '0.0' ? '0.1 MB' : ` ${mbValue.toFixed(1)} MB`
      }




  };


  public convertMobil(value: string): string {

    try {

        const part1 = value?.slice(0, 3);
        const part2 = value?.slice(3, 6);
        const part3 = value?.slice(6, 8);
        const part4 = value?.slice(8, 10);

        return `(${part1}) ${part2} ${part3} ${part4}`

    } catch (error) {

        return value ?? '---'
    }
  }





  constructor() { }

  transform(value: unknown, args: string): unknown {
    return this.pipeDataTable[args](value);
  }
}

