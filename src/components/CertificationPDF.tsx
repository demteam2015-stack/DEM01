'use client';

import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  page: {
    padding: 60,
    backgroundColor: '#000',
    color: '#fff',
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D40707',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#D4AF37',
    marginBottom: 30,
  },
  field: {
    fontSize: 14,
    marginBottom: 12,
    color: '#fff',
  },
  qr: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 60,
    right: 60,
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
});

function generateQR(code: string) {
  return QRCode.toDataURL(code, { width: 200 });
}

export function CertificationPDF({ data }: { data: any }) {
  const [qr, setQr] = useState('');

  useEffect(() => {
    generateQR(`demplatform.ru/cert/${data.id}`).then(setQr);
  }, [data.id]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>СЕРТИФИКАТ</Text>
        <Text style={styles.subtitle}>о присвоении пояса по единоборствам</Text>

        <View style={styles.field}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>ФИО: </Text>
            {data.name}
          </Text>
        </View>
        <View style={styles.field}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Клуб: </Text>
            {data.club}
          </Text>
        </View>
        <View style={styles.field}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Пояс: </Text>
            {data.belt}
          </Text>
        </View>
        <View style={styles.field}>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Дата: </Text>
            {new Date().toLocaleDateString('ru-RU')}
          </Text>
        </View>

        {qr ? <Image src={qr} style={styles.qr} /> : null}

        <Text style={styles.footer}>
          Официальный документ. Проверка: demplatform.ru/cert/{data.id}
        </Text>
      </Page>
    </Document>
  );
}

export function DownloadCertificate({ data }: { data: any }) {
  return (
    <PDFDownloadLink
      document={<CertificationPDF data={data} />}
      fileName={`сертификат-${data.name}.pdf`}
      className="block text-center mt-6 px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded transition w-fit mx-auto"
    >
      {({ loading }) => (loading ? 'Генерация...' : '🖨 Скачать сертификат с QR')}
    </PDFDownloadLink>
  );
}
