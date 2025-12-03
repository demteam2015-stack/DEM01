'use client';

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import type { Event } from '@/lib/db';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  page: { padding: 50, backgroundColor: '#111827', color: '#F3F4F6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#DC2626', textAlign: 'center' },
  event: { fontSize: 12, marginBottom: 10, color: '#F3F4F6' },
  header: { fontSize: 18, marginBottom: 15, color: '#F87171' },
});

function PDFDocument({ events }: { events: Event[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Календарь турниров</Text>
        <Text style={styles.header}>Dem_Platform</Text>
        {events.length === 0 ? (
          <Text style={styles.event}>Нет запланированных мероприятий</Text>
        ) : (
          events.map((event) => (
            <View key={event.id} style={styles.event}>
              <Text>{event.title} — {new Date(event.date).toLocaleDateString('ru-RU')}</Text>
              <Text>Место: {event.location}</Text>
            </View>
          ))
        )}
      </Page>
    </Document>
  );
}

export function PrintCalendarButton({ events }: { events: Event[] }) {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if(!isClient) return null;

  return (
    <PDFDownloadLink
      document={<PDFDocument events={events} />}
      fileName="календарь-турниров.pdf"
      className="group flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition"
    >
      {({ blob, url, loading, error }) => (loading ? 'Загрузка...' : '📄 Распечатать календарь')}
    </PDFDownloadLink>
  );
}
