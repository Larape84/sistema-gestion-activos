
import { DateTime } from 'luxon';
import { Timestamp } from 'firebase/firestore';

interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

export function formatFirebaseTimestampToDDMMYYYY(dateInput: Date | FirebaseTimestamp | any): string {
  let luxonDateTime: DateTime | null = null;

   if (dateInput instanceof Date) {
    luxonDateTime = DateTime.fromJSDate(dateInput);
  }
   else if (dateInput && typeof dateInput.seconds === 'number' && typeof dateInput.nanoseconds === 'number') {
     if (typeof dateInput.toDate === 'function') {
      luxonDateTime = DateTime.fromJSDate(dateInput.toDate());
    } else {

      const milliseconds = dateInput.seconds * 1000 + dateInput.nanoseconds / 1000000;
      luxonDateTime = DateTime.fromMillis(milliseconds);
    }
  }


  if (luxonDateTime && luxonDateTime.isValid) {
    return luxonDateTime.toFormat('dd/MM/yyyy');
  } else {

    console.warn('Invalid date input provided to formatFirebaseTimestampToDDMMYYYY:', dateInput);
    return '';
  }
}


export function formatFirebaseTimestampToYYYYMMDD(dateInput: Date | FirebaseTimestamp | any): string {
    let luxonDateTime: DateTime | null = null;

    if (dateInput instanceof Date) {
        luxonDateTime = DateTime.fromJSDate(dateInput);
    } else if (dateInput && typeof dateInput.seconds === 'number' && typeof dateInput.nanoseconds === 'number') {
        if (typeof dateInput.toDate === 'function') {
            luxonDateTime = DateTime.fromJSDate(dateInput.toDate());
        } else {
            const milliseconds = dateInput.seconds * 1000 + dateInput.nanoseconds / 1000000;
            luxonDateTime = DateTime.fromMillis(milliseconds);
        }
    }

    if (luxonDateTime && luxonDateTime.isValid) {
        return luxonDateTime.toFormat('yyyy-MM-dd');
    } else {
        console.warn('Invalid date input provided to formatFirebaseTimestampToYYYYMMDD:', dateInput);
        return '';
    }








}


export function exportToDatePicker(timestamp: Timestamp | null | undefined): Date | null {
  if (!timestamp) return null;


  const dateTime = DateTime.fromSeconds(timestamp.seconds);


  return dateTime.toJSDate() || '';
}
