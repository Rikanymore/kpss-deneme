// src/app/page.tsx
import Link from "next/link";
import { examsData } from "../data/examsData";
import Countdown from "../components/Countdown"; 

export default function HomePage() {
  // Benzersiz ders listesini çıkaralım
  const categories = ["Matematik", "Coğrafya", "Vatandaşlık", "Türkçe"];

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* SAYAÇ BURADA */}
        <Countdown targetDate="2026-09-06T00:00:00" />
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Ücretsiz KPSS Deneme Platformu
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kayıt olmanıza gerek yok! İstediğiniz dersi seçin, denemeyi çözün ve anında detaylı net analizini görün.
          </p>
        </div>

        {/* Ders Kategorileri */}
        <div className="space-y-12">
          {categories.map((category) => {
            // O derse ait denemeleri filtrele
            const categoryExams = examsData.filter(
              (exam) => exam.questions[0]?.lesson === category && exam.isPublished
            );

            return (
              <div key={category} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-3 h-6 bg-indigo-600 rounded-full inline-block"></span>
                    {category}
                  </h2>
                  <span className="text-sm bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-medium">
                    {categoryExams.length} Deneme Aktif
                  </span>
                </div>

                {categoryExams.length === 0 ? (
                  <p className="text-slate-400 italic text-sm">Bu derse ait denemeler yakında eklenecektir.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryExams.map((exam) => (
                      <div 
                        key={exam.examId} 
                        className="border border-slate-200 rounded-xl p-5 hover:border-indigo-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 mb-2">{exam.title}</h3>
                          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{exam.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            ⏱️ {exam.totalTimeInMinutes} Dakika
                          </span>
                          <span>❓ {exam.questions.length} Soru</span>
                          <Link 
                            href={`/exam/${exam.examId}`}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm"
                          >
                            Çözmeye Başla
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}