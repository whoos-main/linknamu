import Image from "next/image";
import type { Profile } from "@/data/profile";

// 부드러운 사각형 + 여러 겹의 그림자로 입체감
const avatarClass =
  "h-28 w-28 rounded-[2rem] object-cover ring-4 ring-white/90 shadow-[0_2px_4px_rgba(160,70,90,0.12),0_12px_24px_-6px_rgba(160,70,90,0.28),0_28px_48px_-16px_rgba(160,70,90,0.35)] dark:ring-white/10 dark:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.6),0_28px_48px_-16px_rgba(0,0,0,0.7)]";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative">
        {profile.image ? (
          <Image
            src={profile.image}
            alt={`${profile.name} 프로필 사진`}
            width={112}
            height={112}
            className={avatarClass}
            priority
          />
        ) : (
          <div
            className={`${avatarClass} flex items-center justify-center bg-gradient-to-br from-rose-300 via-rose-400 to-orange-300 text-4xl font-bold text-white`}
          >
            {profile.name.charAt(0)}
          </div>
        )}
        {/* 풍선처럼 떠다니는 작은 곰 (끈은 프로필 사진에 묶인 모양) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 -top-6 flex origin-bottom flex-col items-center motion-safe:animate-float"
        >
          <span className="text-lg leading-none">🐻</span>
          <span className="h-5 w-px bg-stone-400 dark:bg-rose-100/40" />
        </div>
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 text-[15px] text-stone-500 dark:text-rose-100/60">
        {profile.bio}
      </p>
    </header>
  );
}
