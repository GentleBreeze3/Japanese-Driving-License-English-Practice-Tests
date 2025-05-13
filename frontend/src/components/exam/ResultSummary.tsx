import React from 'react';

interface ResultSummaryProps {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  passed: boolean;
  wrongAnswers: number[];
  timeTaken: number;
  onRetry: () => void;
}

export default function ResultSummary({
  totalQuestions,
  correctAnswers,
  score,
  passed,
  wrongAnswers,
  timeTaken,
  onRetry,
}: ResultSummaryProps) {
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Congratulations!' : 'Try Again'}
          </h2>
          <p className="text-gray-600">
            {passed
              ? 'You have passed the exam.'
              : 'You need more practice to pass the exam.'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Score</span>
            <span className="text-xl font-bold text-gray-900">{score}%</span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Correct Answers</span>
            <span className="text-xl font-bold text-gray-900">
              {correctAnswers} / {totalQuestions}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Time Taken</span>
            <span className="text-xl font-bold text-gray-900">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          {wrongAnswers.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Questions to Review
              </h3>
              <p className="text-gray-600">
                You need to review questions: {wrongAnswers.join(', ')}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={onRetry}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {passed ? 'Take Another Exam' : 'Retry Exam'}
          </button>
        </div>
      </div>
    </div>
  );
} 