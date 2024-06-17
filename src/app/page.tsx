"use client";
import AppsGrid from './AppsGrid/page';
import Terminal from '@/components/Terminal';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppsGrid/>
      <Terminal/>
    </main>
  );
}
