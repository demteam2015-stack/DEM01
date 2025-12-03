import { db } from "./mysql-adapter";

export type Tournament = {
  id: string;
  title: string;
  date: string;
  location: string;
  discipline: string;
  maxParticipants: number;
  registeredCount: number;
};

// Получить все турниры
export async function getTournaments(): Promise<Tournament[]> {
  return db.query("SELECT * FROM tournaments") as Tournament[];
}

// Создать турнир
export async function createTournament(data: Omit<Tournament, "id" | "registeredCount">) {
  const { title, date, location, discipline, maxParticipants } = data;
  return db.query(
    `INSERT INTO tournaments (title, date, location, discipline, maxParticipants, registeredCount) 
     VALUES ('${title}', '${date}', '${location}', '${discipline}', ${maxParticipants}, 0)`
  );
}

// Обновить турнир
export async function updateTournament(id: string, data: Partial<Tournament>) {
  const setParts = Object.entries(data)
    .map(([key, value]) => {
      const formattedValue = typeof value === 'string' ? `'${value}'` : value;
      return `${key} = ${formattedValue}`;
    })
    .join(", ");
  return db.query(`UPDATE tournaments SET ${setParts} WHERE id = '${id}'`);
}

// Удалить турнир
export async function deleteTournament(id: string) {
  return db.query(`DELETE FROM tournaments WHERE id = '${id}'`);
}