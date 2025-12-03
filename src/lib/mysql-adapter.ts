/**
 * Псевдо-SQL адаптер, работающий через localStorage
 * Имитирует простые SQL-запросы: SELECT, INSERT, UPDATE, DELETE
 */
class MySQLAdapter {
  private storageKey = "__fake_db__";

  // Получаем данные из localStorage
  private getData() {
    if (typeof window === 'undefined') {
      return {};
    }
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  // Сохраняем данные в localStorage
  private saveData(data: Record<string, any[]>) {
    if (typeof window === 'undefined') {
      return;
    }
    // Инициализация данных по-умолчанию
    if (!data.fighters) {
      data.fighters = [
        { id: "1", name: "Иван Петров", club: "Кёкусин-клуб 'Щит'", age: 24, discipline: "Кекусин", rating: 1420, belt: "Чёрный пояс" },
        { id: "2", name: "Алексей Сидоров", club: "Fight Lab", age: 21, discipline: "ММА", rating: 1380, belt: "Коричневый" },
        { id: "3", name: "Елена Волкова", club: "Академия Бокса", age: 28, discipline: "Бокс", rating: 1550 },
        { id: "4", name: "Дмитрий Новиков", club: "Gracie Barra", age: 30, discipline: "BJJ", rating: 1600, belt: "Чёрный пояс" },
        { id: "5", name: "Светлана Кузнецова", club: "Школа Дзюдо 'Иппон'", age: 19, discipline: "Judo", rating: 1300, belt: "Коричневый" },
      ];
    }
    if (!data.tournaments) {
        data.tournaments = [];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  constructor() {
    // При первом создании экземпляра, убедимся, что данные есть
    if (typeof window !== 'undefined') {
        const db = this.getData();
        this.saveData(db);
    }
  }

  // Основной метод — эмулируем SQL
  query(sql: string): any[] | { insertedId?: string; changedRows?: number } {
    const db = this.getData();
    const lowerSQL = sql.trim().toLowerCase();

    // === SELECT * FROM table ===
    if (lowerSQL.startsWith("select * from ")) {
      const tableName = this.parseTableName(lowerSQL, "select");
      return db[tableName] || [];
    }

    // === INSERT INTO table (...) VALUES (...) ===
    if (lowerSQL.startsWith("insert into ")) {
      const { table, columns, values } = this.parseInsert(sql);
      const tableData = db[table] || [];

      const row: Record<string, any> = {};
      columns.forEach((col, i) => {
        row[col] = values[i];
      });

      if (!row.id) {
        row.id = Date.now().toString();
      }

      tableData.push(row);
      db[table] = tableData;
      this.saveData(db);
      return { insertedId: row.id };
    }

    // === UPDATE table SET ... WHERE ... ===
    if (lowerSQL.startsWith('update')) {
        const { table, updates, where } = this.parseUpdate(sql);
        const tableData = db[table] || [];
        let changedRows = 0;

        const updatedTableData = tableData.map(row => {
            if (row[where.key] === where.value) {
                changedRows++;
                return { ...row, ...updates };
            }
            return row;
        });

        db[table] = updatedTableData;
        this.saveData(db);
        return { changedRows };
    }

    // === DELETE FROM table WHERE ... ===
    if (lowerSQL.startsWith('delete from')) {
        const { table, where } = this.parseDelete(sql);
        const tableData = db[table] || [];
        let changedRows = 0;

        const updatedTableData = tableData.filter(row => {
            const shouldKeep = row[where.key] !== where.value;
            if (!shouldKeep) {
                changedRows++;
            }
            return shouldKeep;
        });

        db[table] = updatedTableData;
        this.saveData(db);
        return { changedRows };
    }

    return [];
  }

  private parseTableName(sql: string, type: "select" | "insert" | "update" | "delete"): string {
    if (type === "select") {
      return sql.substring("select * from ".length).split(" ")[0];
    } else if (type === "update") {
        return sql.split(' ')[1];
    } else if (type === "delete") {
        return sql.split(' ')[2];
    }
    return "";
  }

  private parseInsert(sql: string): { table: string, columns: string[], values: any[] } {
    const tableMatch = sql.match(/insert into (\w+)/i);
    const table = tableMatch ? tableMatch[1] : "";

    const columnsMatch = sql.match(/\((.*?)\)/);
    const columns = columnsMatch ? columnsMatch[1].split(',').map(s => s.trim()) : [];

    const valuesMatch = sql.match(/values \((.*?)\)/i);
    const valuesStr = valuesMatch ? valuesMatch[1] : "";

    // This is a very basic parser. It doesn't handle strings with commas.
    const values = valuesStr.split(',').map(s => {
        const trimmed = s.trim();
        if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
            return trimmed.substring(1, trimmed.length - 1);
        }
        if (!isNaN(Number(trimmed))) {
            return Number(trimmed);
        }
        return trimmed;
    });

    return { table, columns, values };
  }

    private parseUpdate(sql: string): { table: string, updates: Record<string, any>, where: { key: string, value: any } } {
        const table = this.parseTableName(sql, "update");
        const setClause = sql.substring(sql.toLowerCase().indexOf('set') + 3, sql.toLowerCase().indexOf('where')).trim();
        const whereClause = sql.substring(sql.toLowerCase().indexOf('where') + 5).trim();

        const updates: Record<string, any> = {};
        setClause.split(',').forEach(part => {
            const [key, value] = part.split('=').map(s => s.trim());
            updates[key] = this.parseValue(value);
        });

        const [whereKey, whereValue] = whereClause.split('=').map(s => s.trim());

        return {
            table,
            updates,
            where: { key: whereKey, value: this.parseValue(whereValue) }
        };
    }

    private parseDelete(sql: string): { table: string, where: { key: string, value: any } } {
        const table = this.parseTableName(sql, "delete");
        const whereClause = sql.substring(sql.toLowerCase().indexOf('where') + 5).trim();
        const [whereKey, whereValue] = whereClause.split('=').map(s => s.trim());

        return {
            table,
            where: { key: whereKey, value: this.parseValue(whereValue) }
        };
    }

    private parseValue(value: string): any {
        if (value.startsWith("'") && value.endsWith("'")) {
            return value.substring(1, value.length - 1);
        }
        if (!isNaN(Number(value))) {
            return Number(value);
        }
        return value;
    }
}

export const db = new MySQLAdapter();
