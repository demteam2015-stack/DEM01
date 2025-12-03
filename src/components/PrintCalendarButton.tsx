'use client';

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import type { Event } from '@/lib/db';

const styles = StyleSheet.create({
  page: { padding: 50, backgroundColor: '#111827', color: '#F3F4F6', fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, color: '#DC2626', textAlign: 'center', fontFamily: 'Helvetica-Bold' },
  event: { fontSize: 12, marginBottom: 15, color: '#F3F4F6', },
  eventTitle: { fontSize: 14, marginBottom: 5, color: '#F87171', fontFamily: 'Helvetica-Bold' },
  header: { fontSize: 18, marginBottom: 25, color: '#F87171', textAlign: 'center' },
  footer: { position: 'absolute', bottom: 30, left: 50, right: 50, textAlign: 'center', color: '#9CA3AF', fontSize: 10 }
});

function PDFDocument({ events }: { events: Event[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Календарь событий</Text>
        <Text style={styles.header}>Dem_Platform</Text>
        {events.length === 0 ? (
          <Text style={styles.event}>Нет запланированных мероприятий</Text>
        ) : (
          events.map((event) => (
            <View key={event.id} style={styles.event} wrap={false}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text>Дата: {new Date(event.date).toLocaleString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
              <Text>Место: {event.location}</Text>
            </View>
          ))
        )}
        <Text style={styles.footer}>© {new Date().getFullYear()} Dem_Platform. Все права защищены.</Text>
      </Page>
    </Document>
  );
}

export function PrintCalendarButton({ events }: { events: Event[] }) {
  return (
    <PDFDownloadLink
      document={<PDFDocument events={events} />}
      fileName="календарь-событий.pdf"
      className="group flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition"
    >
      {({ loading }) => (loading ? 'Загрузка...' : '📄 Распечатать календарь')}
    </PDFDownloadLink>
  );
}
