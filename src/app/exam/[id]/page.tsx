// src/app/exam/[id]/page.tsx
"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { examsData } from "../../../data/examsData";

export default function ExamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js standartlarında dinamik urlden id'yi güvenli alıyoruz
  const resolvedParams = use(params);
  const examId = resolvedParams.id;

  const exam = examsData.find((e) => e.examId === examId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // Sınav bitti mi kontrolü

  useEffect(() => {
    if (!exam) return;
    const savedAnswers = localStorage.getItem(`kpss-answers-${examId}`);
    const savedIndex = localStorage.getItem(`kpss-index-${examId}`);
    const savedFinished = localStorage.getItem(`kpss-finished-${examId}`);

    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedIndex) setCurrentIndex(Number(savedIndex));
    if (savedFinished === "true") setIsFinished(true);

    setIsLoaded(true);
  }, [examId, exam]);

  useEffect(() => {
    if (!isLoaded || !exam) return;
    localStorage.setItem(`kpss-answers-${examId}`, JSON.stringify(answers));
    localStorage.setItem(`kpss-index-${examId}`, currentIndex.toString());
    localStorage.setItem(`kpss-finished-${examId}`, isFinished.toString());
  }, [answers, currentIndex, isLoaded, isFinished, examId, exam]);

  if (!exam) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Sınav bulunamadı!</div>;
  }

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Yükleniyor...</div>;
  }

  const currentQuestion = exam.questions[currentIndex];

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // SONUÇ HESAPLAMA MANTIĞI (ÖSYM Standartı: 4 Yanlış 1 Doğruyu Götürür)
  const calculateResults = () => {
    let dogru = 0;
    let yanlis = 0;
    let bos = 0;

    exam.questions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (!userAnswer) {
        bos++;
      } else if (userAnswer === q.correctAnswer) {
        dogru++;
      } else {
        yanlis++;
      }
    });

    const net = dogru - yanlis / 4;

    return { dogru, yanlis, bos, net };
  };

  const results = calculateResults();

  // EĞER SINAV BİTMİŞSE SONUÇ EKRANINI GÖSTER
  if (isFinished) {
    return (
      <main className="min-h-screen bg-slate-50 py-12 px-4 flex justify-center font-sans">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-slate-100 flex flex-col text-center">
          <div className="mb-6">
            <span className="text-5xl">📊</span>
            <h1 className="text-3xl font-black text-slate-900 mt-4">Sınav Sonuç Analizi</h1>
            <p className="text-slate-500 mt-1">{exam.title}</p>
          </div>

          {/* Skor Kartları */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
              <p className="text-sm text-emerald-700 font-semibold">Doğru Cevap</p>
              <p className="text-3xl font-bold text-emerald-600">{results.dogru}</p>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl">
              <p className="text-sm text-rose-700 font-semibold">Yanlış Cevap</p>
              <p className="text-3xl font-bold text-rose-600">{results.yanlis}</p>
            </div>
            <div className="bg-slate-100 p-4 rounded-xl">
              <p className="text-sm text-slate-600 font-semibold">Boş Bırakılan</p>
              <p className="text-3xl font-bold text-slate-700">{results.bos}</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl">
              <p className="text-sm text-indigo-700 font-semibold">KPSS Netiniz</p>
              <p className="text-3xl font-extrabold text-indigo-600">{results.net.toFixed(2)}</p>
            </div>
          </div>

          {/* Soru Çözüm Açıklamaları Listesi */}
          <div className="text-left mb-8 border-t border-slate-100 pt-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Soru Çözümleri ve Cevap Anahtarı</h3>
            <div className="space-y-4">
              {exam.questions.map((q, idx) => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-150">
                  <p className="font-medium text-slate-800 mb-2">Soru {idx + 1}: {q.text}</p>
                  <p className="text-xs font-semibold text-slate-500">
                    Sizin Cevabınız: <span className={answers[q.id] === q.correctAnswer ? "text-emerald-600" : "text-rose-600"}>{answers[q.id] || "Boş"}</span> | 
                    Doğru Cevap: <span className="text-emerald-600">{q.correctAnswer}</span>
                  </p>
                  {q.explanation && (
                    <p className="text-sm text-slate-600 bg-white p-3 rounded mt-2 border-l-4 border-indigo-500 italic">
                      💡 <strong>Çözüm:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex gap-4 mt-auto">
            <Link href="/" className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors">
              Ana Sayfaya Dön
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem(`kpss-answers-${examId}`);
                localStorage.removeItem(`kpss-index-${examId}`);
                localStorage.removeItem(`kpss-finished-${examId}`);
                setAnswers({});
                setCurrentIndex(0);
                setIsFinished(false);
              }}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Yeniden Çöz
            </button>
          </div>
        </div>
      </main>
    );
  }

  // SINAV ÇÖZÜLME ANINDAKİ EKRAN
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center font-sans">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col">
        
        <div className="bg-slate-800 text-white p-5 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">{exam.title}</h1>
            <p className="text-sm text-slate-300">{currentQuestion.lesson}</p>
          </div>
          <div className="text-right">
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm font-medium">
              Soru {currentIndex + 1} / {exam.questions.length}
            </span>
          </div>
        </div>

        <div className="p-8 flex-grow">
          <p className="text-xl text-slate-800 font-medium leading-relaxed mb-8">
            {currentQuestion.text}
          </p>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center
                    ${isSelected ? "border-indigo-500 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700"}`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold text-sm
                    ${isSelected ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {option.id}
                  </span>
                  <span className="text-lg">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-50 border-t border-slate-200 p-5 flex justify-between items-center">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-6 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Önceki Soru
          </button>
          
          <button 
            onClick={() => {
              // Boş bırak butonu: mevcut seçimi siler
              setAnswers(prev => {
                const updated = {...prev};
                delete updated[currentQuestion.id];
                return updated;
              });
            }}
            className="text-sm font-semibold text-rose-500 hover:underline"
          >
            Cevabı Temizle
          </button>

          {currentIndex === exam.questions.length - 1 ? (
            <button 
              onClick={() => setIsFinished(true)}
              className="px-8 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-md transition-colors"
            >
              Sınavı Bitir
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(exam.questions.length - 1, prev + 1))}
              className="px-8 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium shadow-md transition-colors"
            >
              Sonraki Soru
            </button>
          )}
        </div>

      </div>
    </main>
  );
}