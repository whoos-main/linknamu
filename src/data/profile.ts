export type Link = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  // public/ 폴더 기준 경로 (예: "/profile.jpg"). 없으면 이름 첫 글자로 표시
  image?: string;
};

export const profile: Profile = {
  name: "이재후",
  bio: "바이브코드 배우기",
};

export const links: Link[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "blog", title: "블로그", url: "https://velog.io" },
  { id: "instagram", title: "Instagram", url: "https://instagram.com" },
];
