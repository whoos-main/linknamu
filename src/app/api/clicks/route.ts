import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const validIds = new Set(links.map((link) => link.id));

// 링크 클릭 1회 기록
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = JSON.parse(await request.text()));
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다" }, { status: 400 });
  }
  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다" }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    await clicks.updateOne({ linkId }, { $inc: { count: 1 } }, { upsert: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("클릭 기록 실패:", error);
    return NextResponse.json({ error: "클릭 기록 실패" }, { status: 500 });
  }
}

// 링크별 클릭 수 조회
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({}, { projection: { _id: 0 } }).toArray();
    const counts = Object.fromEntries(docs.map((d) => [d.linkId, d.count]));
    return NextResponse.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ error: "클릭 수 조회 실패" }, { status: 500 });
  }
}
