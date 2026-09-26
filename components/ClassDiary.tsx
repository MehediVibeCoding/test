import { getClassDiaryEntries } from "@/lib/academyData";
import ClassDiaryClient from "./ClassDiaryClient";

export default async function ClassDiary() {
  const entries = await getClassDiaryEntries(9);

  return <ClassDiaryClient entries={entries} />;
}
