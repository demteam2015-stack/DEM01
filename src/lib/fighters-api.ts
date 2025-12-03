
import { db } from "./mysql-adapter";

export type Fighter = {
  id: string;
  name: string;
  club: string;
  age: number;
  discipline: string;
  rating: number;
  belt?: string;
};

export async function getFighters(): Promise<Fighter[]> {
  const result = db.query("SELECT * FROM fighters");
  return Array.isArray(result) ? result as Fighter[] : [];
}
