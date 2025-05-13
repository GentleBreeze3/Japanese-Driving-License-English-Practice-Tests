import React from 'react';
import Link from 'next/link';
import { ExamSet } from '@/types/exam';

interface ExamSetListProps {
  examSets: ExamSet[];
}

export const ExamSetList: React.FC<ExamSetListProps> = ({ examSets }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {examSets.map((examSet) => (
        <Link
          key={examSet.id}
          href={`/exam/${examSet.id}`}
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {examSet.title}
          </h2>
          <p className="text-gray-600 mb-4">{examSet.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{examSet.questions.length} questions</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              Start Quiz
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}; 