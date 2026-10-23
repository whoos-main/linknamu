import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center px-6 pb-16 pt-20 sm:px-10 sm:pt-24">
      <ThemeToggle />
      <ProfileHeader profile={profile} />
      {/* 2열 격자, 개수가 홀수면 마지막 카드는 한 줄을 다 차지 */}
      <ul className="mt-12 grid w-full grid-cols-2 gap-3 sm:gap-4">
        {links.map((link) => (
          <li
            key={link.id}
            className="[&:last-child:nth-child(odd)]:col-span-2"
          >
            <LinkCard link={link} />
          </li>
        ))}
      </ul>
      <footer className="mt-auto pt-16 text-xs tracking-wide text-stone-400 dark:text-rose-100/40">
        링크나무
      </footer>
    </main>
  );
}
