import { getActiveBatches } from "@/lib/academyData";
import BatchesClient from "./BatchesClient";

export default async function Batches() {
  const batches = await getActiveBatches();

  return <BatchesClient batches={batches} />;
}
