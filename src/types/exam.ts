// src/types/exam.ts

// Tek bir sorunun yapısı
export interface Question {
  id: string;
  lesson: 'Türkçe' | 'Matematik' | 'Tarih' | 'Coğrafya' | 'Vatandaşlık' | 'Güncel Bilgiler';
  text: string;           // Sorunun ana metni
  imageUrl?: string;      // Şekilli sorular için görsel linki (Opsiyonel)
  options: {
    id: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation?: string;   // Test sonunda gösterilecek çözüm açıklaması
  isCanceled?: boolean;   // Soru iptal edildiyse sistemi bozmadan atlamak için
}

// Tüm denemenin (Testin) yapısı
export interface Exam {
  examId: string;
  title: string;          // Örn: "2026 Türkiye Geneli Deneme 1"
  description: string;
  totalTimeInMinutes: number; // KPSS Genel Kültür - Yetenek genelde 130 dakikadır
  isPublished: boolean;   // Taslak halindeki denemeleri gizlemek için
  questions: Question[];
}