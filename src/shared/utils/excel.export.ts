import * as FileSaver from 'file-saver';
import { DateTime } from 'luxon';
import * as XLSX from 'xlsx';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export function exportAsExcelFile(json: any[], excelFileName: string): void {

        const name = excelFileName.concat(formatDateTimeCompact())
        const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

        const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
        saveAsExcelFile(excelBuffer, name);
    }

 function saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + ''+ EXCEL_EXTENSION);
    }


function formatDateTimeCompact(): string {

    const date = new Date();


  let dt: DateTime;

  if (DateTime.isDateTime(date)) {
    dt = date;
  } else if (date instanceof Date) {
    dt = DateTime.fromJSDate(date);
  } else {
    dt = DateTime.fromISO(date);
  }

  return dt.toFormat('_ddMMyyyy_HHmm');
}
