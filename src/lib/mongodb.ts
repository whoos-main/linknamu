import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

// 개발 모드의 핫 리로드에서도 연결을 재사용하도록 전역에 캐시
export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인)");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection() {
  const client = await getMongoClient();
  return client
    .db(process.env.MONGODB_DB ?? "linknamu")
    .collection<{ linkId: string; count: number }>("clicks");
}
