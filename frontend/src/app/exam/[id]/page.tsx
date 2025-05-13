'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/common/Layout';
import { examSets } from '@/data/examSets';
import type { Question } from '@/types/exam';
import Image from 'next/image';

export default function ExamSetPage() {
  const params = useParams();
  const examSetId = parseInt(params.id as string);
  const examSet = examSets.find(set => set.id === examSetId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const handleStopQuiz = () => {
    setShowResults(true);
  };

  if (!examSet) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900">Exam Set Not Found</h1>
          <p className="mt-2 text-gray-600">The requested exam set could not be found.</p>
        </div>
      </Layout>
    );
  }

  const currentQuestion = examSet.questions[currentQuestionIndex];
  const totalQuestions = examSet.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswer = (isTrue: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: isTrue
    }));

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    examSet.questions.forEach(question => {
      if (answers[question.id] === question.isTrue) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100)
    };
  };

  if (showResults) {
    const score = calculateScore();
    const answeredQuestions = examSet.questions.filter(q => answers[q.id] !== undefined);
    const questionsToShow = showAllQuestions ? examSet.questions : answeredQuestions;

    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Exam Results</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {score.percentage}%
              </div>
              <p className="text-gray-600">
                {score.correct} out of {score.total} correct
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {answeredQuestions.length} questions answered out of {totalQuestions}
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowAllQuestions(!showAllQuestions)}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {showAllQuestions ? 'Show Only Answered Questions' : 'Show All Questions'}
              </button>
            </div>
            <div className="space-y-4">
              {questionsToShow.map((question, index) => (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg ${
                    answers[question.id] === question.isTrue
                      ? 'bg-green-50'
                      : answers[question.id] === undefined
                      ? 'bg-gray-50'
                      : 'bg-red-50'
                  }`}
                >
                  <p className="font-medium text-gray-900 mb-2">
                    Question {index + 1}
                  </p>
                  <p className="text-gray-600">{question.text}</p>
                  {question.imageUrl && (
                    <div className="relative w-full h-48 my-4">
                      <Image
                        src={question.imageUrl}
                        alt={`Question ${question.id} image`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {answers[question.id] !== undefined ? (
                    <>
                      <p className="mt-2 text-sm">
                        Your answer:{' '}
                        <span className="font-medium">
                          {answers[question.id] ? 'True' : 'False'}
                        </span>
                      </p>
                      <p className="text-sm">
                        Correct answer:{' '}
                        <span className="font-medium">
                          {question.isTrue ? 'True' : 'False'}
                        </span>
                      </p>
                      {answers[question.id] !== question.isTrue && question.hint && (
                        <p className="mt-2 text-sm text-blue-600">
                          Hint: {question.hint}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-sm text-gray-500">
                        Not answered
                      </p>
                      <p className="text-sm">
                        Correct answer:{' '}
                        <span className="font-medium">
                          {question.isTrue ? 'True' : 'False'}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => window.location.href = '/exam'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Exam Sets
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-semibold text-gray-900">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h1>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="text-lg text-gray-900 mb-6">{currentQuestion.text}</p>
          {currentQuestion.imageUrl && (
            <div className="relative w-full h-48 mb-6">
              <Image
                src={currentQuestion.imageUrl}
                alt={`Question ${currentQuestion.id} image`}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="bg-green-100 text-green-800 py-3 px-6 rounded-lg hover:bg-green-200 transition-colors"
            >
              True
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-100 text-red-800 py-3 px-6 rounded-lg hover:bg-red-200 transition-colors"
            >
              False
            </button>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleStopQuiz}
              className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Stop Quiz
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 