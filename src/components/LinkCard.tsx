"use client";

import type { Link } from "@/data/profile";

// 카드 아래에 보여줄 도메인 (www. 제거)
function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

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
      className="group flex h-full min-h-[8.5rem] flex-col justify-between rounded-3xl border border-white/80 bg-white/60 p-5 shadow-[0_10px_30px_-18px_rgba(160,70,90,0.45)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_18px_40px_-20px_rgba(160,70,90,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] dark:hover:bg-white/10"
    >
      <span className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 text-base font-semibold text-rose-500 dark:from-rose-400/20 dark:to-orange-300/10 dark:text-rose-200">
          {link.title.charAt(0)}
        </span>
        <span
          aria-hidden="true"
          className="text-stone-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-400 dark:text-rose-100/40"
        >
          ↗
        </span>
      </span>
      <span className="mt-6 block">
        <span className="block truncate text-[15px] font-semibold tracking-tight">
          {link.title}
        </span>
        <span className="mt-0.5 block truncate text-xs text-stone-500 dark:text-rose-100/50">
          {hostOf(link.url)}
        </span>
      </span>
    </a>
  );
}
