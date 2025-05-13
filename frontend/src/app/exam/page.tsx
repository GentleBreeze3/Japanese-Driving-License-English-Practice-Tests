import React from 'react';
import { ExamSetList } from '@/components/exam/ExamSetList';
import { examSets } from '@/data/examSets';

export default function ExamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Exam Sets</h1>
      <ExamSetList examSets={examSets} />
    </div>
  );
} 