import { db } from "./mysql-adapter";

export type Fighter = {
  id: string;
  name: string;
  club: string;
  age: number;
  discipline: string;
  rating: number;
  belt: string; // Может быть и null, нужно уточнить
};

// Получить всех бойцов
export async function getAllFighters(): Promise<Fighter[]> {
  const result = db.query("SELECT * FROM fighters");
  return Array.isArray(result) ? result as Fighter[] : [];
}

// Получить одного бойца по ID
export async function getFighterById(id: string): Promise<Fighter | null> {
  // Наш адаптер пока не умеет SELECT ... WHERE, поэтому фильтруем вручную
  const allFighters = await getAllFighters();
  return allFighters.find(f => f.id === id) || null;
}
