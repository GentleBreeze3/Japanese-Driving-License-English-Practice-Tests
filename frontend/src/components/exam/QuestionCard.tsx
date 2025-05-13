import React from 'react';
import Image from 'next/image';
import type { Question } from '@/types/exam';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isTrue: boolean) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <p className="text-lg text-gray-900">{question.text}</p>

        {question.imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={question.imageUrl}
              alt={`Question ${question.id} image`}
              fill
              className="object-contain"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onAnswer(true)}
            className="bg-green-100 text-green-800 py-3 px-6 rounded-lg hover:bg-green-200 transition-colors"
          >
            True
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="bg-red-100 text-red-800 py-3 px-6 rounded-lg hover:bg-red-200 transition-colors"
          >
            False
          </button>
        </div>
      </div>
    </div>
  );
} 