// src/data/examsData.ts
import { Exam } from '../types/exam';

export const examsData: Exam[] = [
  {
    examId: "mat-deneme-1",
    title: "Matematik Temel Kavramlar - Deneme 1",
    description: "Sayı kümeleri, ardışık sayılar ve basamak kavramı ağırlıklı mini deneme.",
    totalTimeInMinutes: 15,
    isPublished: true,
    questions: [
      {
        id: "mat1",
        lesson: "Matematik",
        text: "a ve b birer doğal sayıdır. a + b = 12 olduğuna göre, a * b çarpımının alabileceği en büyük değer kaçtır?",
        options: [
          { id: "A", text: "27" },
          { id: "B", text: "32" },
          { id: "C", text: "35" },
          { id: "D", text: "36" },
          { id: "E", text: "40" }
        ],
        correctAnswer: "D",
        explanation: "Toplamları sabit olan iki sayının çarpımının en büyük olması için sayılar birbirine en yakın seçilmelidir. a = 6 ve b = 6 için 6 * 6 = 36 olur."
      }
    ]
  },
  {
    examId: "cog-deneme-1",
    title: "Coğrafya Türkiye'nin Fiziki Özellikleri - Deneme 1",
    description: "Türkiye'nin yer şekilleri, dağları ve ovaları üzerine tarama testi.",
    totalTimeInMinutes: 10,
    isPublished: true,
    questions: [
      {
        id: "cog1",
        lesson: "Coğrafya",
        text: "Aşağıdaki platolardan hangisi üzerinde karstik şekiller en yaygın olarak alp gösterir?",
        options: [
          { id: "A", text: "Haymana Platosu" },
          { id: "B", text: "Teke Platosu" },
          { id: "C", text: "Ardahan Platosu" },
          { id: "D", text: "Bozok Platosu" },
          { id: "E", text: "Cihanbeyli Platosu" }
        ],
        correctAnswer: "B",
        explanation: "Teke ve Taşeli platoları Akdeniz Bölgesi'nde yer alır ve kalkerli (karstik) yapısıyla bilinir."
      }
    ]
  },
  {
    examId: "vat-deneme-1",
    title: "Vatandaşlık Hukukun Temel Kavramları - Deneme 1",
    description: "Anayasa hukuku ve hukukun kaynakları başlangıç denemesi.",
    totalTimeInMinutes: 10,
    isPublished: true,
    questions: [
      {
        id: "vat1",
        lesson: "Vatandaşlık",
        text: "Aşağıdakilerden hangisi yazılı hukuk kuralları arasında yer almaz?",
        options: [
          { id: "A", text: "Kanun" },
          { id: "B", text: "Cumhurbaşkanlığı Kararnamesi" },
          { id: "C", text: "Yönetmelik" },
          { id: "D", text: "Örf ve Adet Hukuku" },
          { id: "E", text: "Anayasa" }
        ],
        correctAnswer: "D",
        explanation: "Örf ve adet hukuku, hukukun yazısız kaynakları arasında yer almaktadır."
      }
    ]
  }
];