'use client';

import React from 'react';
import Link from 'next/link';
import Layout from '@/components/common/Layout';

export default function HomePage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Japanese Driving Exam Practice
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Test your knowledge of Japanese driving rules and regulations. Take a practice exam to prepare for your driving license test.
        </p>
        <Link
          href="/exam"
          className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Start Practice Exam
        </Link>
      </div>
    </Layout>
  );
}
