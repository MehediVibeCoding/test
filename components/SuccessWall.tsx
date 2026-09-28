import SuccessWallClient from "./SuccessWallClient";
import { getSuccessToppers } from "@/lib/academyData";

export default async function SuccessWall() {
  const toppers = await getSuccessToppers();

  return <SuccessWallClient toppers={toppers} />;
}
