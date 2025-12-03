
import { db } from "./mysql-adapter";

export type Tournament = {
  id: string;
  title: string;
  date: string;
  location: string;
  discipline: string;
  maxParticipants: number;
  registeredCount: number;
  status: 'upcoming' | 'registration_open' | 'completed';
  organizerId: string;
};

// Получить все турниры для конкретного организатора
export async function getTournaments(organizerId: string): Promise<Tournament[]> {
  const allTournaments = db.query("SELECT * FROM tournaments") as Tournament[];
  return allTournaments.filter(t => t.organizerId === organizerId);
}

// Получить все турниры для статистики
export async function getAllTournaments(): Promise<Tournament[]> {
  const result = db.query("SELECT * FROM tournaments");
  // The fake DB can return an empty object, so we ensure it's always an array
  if (Array.isArray(result)) {
    return result as Tournament[];
  }
  const data = localStorage.getItem("__fake_db__");
  if(data) {
    const dbData = JSON.parse(data);
    return dbData.tournaments || [];
  }
  return [];
}


// Создать турнир с привязкой к организатору
export async function createTournament(data: Omit<Tournament, "id" | "registeredCount" | "organizerId">, organizerId: string) {
  const { title, date, location, discipline, maxParticipants, status } = data;
  return db.query(
    `INSERT INTO tournaments (title, date, location, discipline, maxParticipants, registeredCount, status, organizerId) 
     VALUES ('${title}', '${date}', '${location}', '${discipline}', ${maxParticipants}, 0, '${status}', '${organizerId}')`
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
