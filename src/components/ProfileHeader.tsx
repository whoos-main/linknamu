import Image from "next/image";
import type { Profile } from "@/data/profile";

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
            className="h-28 w-28 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
            priority
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-500 text-4xl font-bold text-white">
            {profile.name.charAt(0)}
          </div>
        )}
        {/* 풍선처럼 떠다니는 작은 곰 (끈은 프로필 사진에 묶인 모양) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 -top-6 flex origin-bottom flex-col items-center motion-safe:animate-float"
        >
          <span className="text-lg leading-none">🐻</span>
          <span className="h-5 w-px bg-gray-400 dark:bg-gray-500" />
        </div>
      </div>
      <h1 className="mt-4 text-xl font-bold">{profile.name}</h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {profile.bio}
      </p>
    </header>
  );
}
