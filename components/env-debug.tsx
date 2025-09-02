"use client"

import { useEffect } from 'react'

export default function EnvDebug() {
  useEffect(() => {
    // 전역 환경 변수 디버깅
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    console.log("=== GLOBAL ENV DEBUG (EnvDebug Component) ===");
    console.log("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:");
    console.log("  Type:", typeof apiKey);
    console.log("  Value:", apiKey);
    console.log("  Length:", apiKey ? apiKey.length : 'N/A');
    console.log("  First 10 chars:", apiKey ? apiKey.substring(0, 10) : 'N/A');
    console.log("  Last 10 chars:", apiKey ? apiKey.substring(apiKey.length - 10) : 'N/A');
    console.log("  Is valid format:", apiKey ? /^AIza[0-9A-Za-z_-]{35}$/.test(apiKey) : false);
    
    console.log("NEXT_PUBLIC_API_URL:");
    console.log("  Type:", typeof apiUrl);
    console.log("  Value:", apiUrl);
    
    console.log("All NEXT_PUBLIC_ env vars:");
    Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')).forEach(key => {
      console.log(`  ${key}:`, process.env[key]);
    });
    
    console.log("============================================");
  }, [])

  return null // 렌더링하지 않음
}