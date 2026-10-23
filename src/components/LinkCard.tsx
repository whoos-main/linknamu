"use client";

import type { Link } from "@/data/profile";

export default function LinkCard({ link }: { link: Link }) {
  const handleClick = () => {
    // 페이지를 떠나도 전송되도록 sendBeacon 사용
    const body = JSON.stringify({ linkId: link.id });
    if (!navigator.sendBeacon?.("/api/clicks", body)) {
      fetch("/api/clicks", { method: "POST", body, keepalive: true });
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      {link.title}
    </a>
  );
}
