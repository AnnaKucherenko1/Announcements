//Formats date to Aug 11, 2023 04:58
export function formatDateAndTime(isoDateString: string) {
  const date = new Date(isoDateString);
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  } as Intl.DateTimeFormatOptions;
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  const formattedTime = date.toLocaleTimeString('de-DE', timeOptions);

  return `${formattedDate} ${formattedTime}`;
}

//Formats date to Aug 11, 2023
export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions;
  return date.toLocaleDateString('en-US', dateOptions);
}

//Formats date to 08/11/2023 04:58
export function formatDateTo_MM_DD_YYYY(inputDate: string) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

//Formats date to ISO String "2023-02-25T11:50:00.000Z"
export function toISOString(inputDate: string) {
  const parts = inputDate.split(/[/ :]/);
  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);
  const minutes = parseInt(parts[4], 10);

  const date = new Date(year, month - 1, day, hours, minutes);

  return date.toISOString();
}