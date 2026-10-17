import { WeddingEvent } from '../types/wedding';

function formatToIcsDate(isoString: string): string {
  const d = new Date(isoString);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function generateIcsCalendar(event: WeddingEvent) {
  const startIso = new Date(event.isoDate);
  const endIso = new Date(startIso.getTime() + event.durationHours * 60 * 60 * 1000);

  const startFormatted = formatToIcsDate(startIso.toISOString());
  const endFormatted = formatToIcsDate(endIso.toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Durgesh and Bhumika Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-durgesh-bhumika-2026@wedding.invitation`,
    `DTSTAMP:${formatToIcsDate(new Date().toISOString())}`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:Durgesh & Bhumika Wedding: ${event.name} (${event.hindiName})`,
    `DESCRIPTION:${event.description} \\nVenue: ${event.venue} \\nAddress: ${event.address} \\nGoogle Maps: ${event.mapUrl}`,
    `LOCATION:${event.venue}, ${event.address}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-durgesh-bhumika.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(event: WeddingEvent): string {
  const startIso = new Date(event.isoDate);
  const endIso = new Date(startIso.getTime() + event.durationHours * 60 * 60 * 1000);
  const start = formatToIcsDate(startIso.toISOString());
  const end = formatToIcsDate(endIso.toISOString());

  const details = `${event.description}\n\nVenue: ${event.venue}\nAddress: ${event.address}\nDirections: ${event.mapUrl}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Durgesh & Bhumika Wedding: ${event.name}`
  )}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
    `${event.venue}, ${event.address}`
  )}`;
}
