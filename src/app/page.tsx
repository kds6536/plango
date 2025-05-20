'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* 상단 네비게이션 */}
      <nav className="w-full bg-gray-900 shadow-md py-4 mb-8">
        <div className="container mx-auto flex justify-between items-center px-4">
          <span className="text-2xl font-bold text-blue-400">PlanGo</span>
          <div className="space-x-6">
            <Link href="/plans" className="hover:text-blue-300">여행 계획</Link>
            <Link href="/destinations" className="hover:text-green-300">여행지 추천</Link>
            <Link href="/community" className="hover:text-purple-300">커뮤니티</Link>
          </div>
        </div>
      </nav>

      {/* 히어로 이미지와 메인 콘텐츠 */}
      <section className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] flex items-center justify-center mb-8">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="여행 히어로 이미지"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute z-10 w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">여행의 모든 것, PlanGo에서 시작하세요!</h1>
          <p className="text-lg text-gray-200 mb-8 drop-shadow">AI가 추천하는 맞춤 여행 일정, 인기 여행지, 여행자 커뮤니티까지 한 번에!</p>
          <Link href="/plans">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-600 transition-colors">
              나만의 여행 계획 만들기
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
