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
    localStorage.setItem(this.storageKey, JSON.stringify(data));
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

      // Генерируем ID
      row.id = Date.now().toString();

      // Сохраняем
      db[table] = [...tableData, row];
      this.saveData(db);

      return { insertedId: row.id };
    }

    // === UPDATE table SET col = val WHERE id = ? ===
    if (lowerSQL.startsWith("update ")) {
      const { table, set, where } = this.parseUpdate(sql);
      const tableData = db[table] || [];
      let changed = 0;

      const updated = tableData.map((row) => {
        if (row.id === where.id) {
          Object.entries(set).forEach(([key, value]) => {
            row[key] = value;
          });
          changed++;
        }
        return row;
      });

      db[table] = updated;
      this.saveData(db);

      return { changedRows: changed };
    }

    // === DELETE FROM table WHERE id = ? ===
    if (lowerSQL.startsWith("delete from ")) {
      const { table, where } = this.parseDelete(sql);
      const tableData = db[table] || [];

      const filtered = tableData.filter((row) => row.id !== where.id);
      const deletedCount = tableData.length - filtered.length;

      db[table] = filtered;
      this.saveData(db);

      return { changedRows: deletedCount };
    }

    console.warn("Unsupported SQL:", sql);
    return [];
  }

  // === Парсеры SQL ===

  private parseTableName(sql: string, type: "select" | "insert" | "update" | "delete"): string {
    const regex = type === "select" 
      ? /select \* from ([a-z_]+)/i 
      : type === "insert" 
        ? /insert into ([a-z_]+)/i
        : type === "update"
          ? /update ([a-z_]+)/i
          : /delete from ([a-z_]+)/i;
    const match = sql.match(regex);
    return match ? match[1] : "";
  }

  private parseInsert(sql: string): { table: string; columns: string[]; values: any[] } {
    const tableMatch = sql.match(/insert into ([a-z_]+)/i);
    const table = tableMatch ? tableMatch[1] : "";

    const columnsMatch = sql.match(/\(([^\)]+)\)\s*values/i);
    const columns = columnsMatch ? columnsMatch[1].split(",").map(c => c.trim()) : [];

    const valuesMatch = sql.match(/values\s*\(([^\)]+)\)/i);
    const valuesStr = valuesMatch ? valuesMatch[1] : "";
    
    // Простой парсер значений (поддерживает строки в кавычках и числа)
    const values = valuesStr.split(",").map(val => {
      val = val.trim();
      if (val.startsWith("'") && val.endsWith("'")) {
        return val.slice(1, -1);
      }
      if (!isNaN(+val)) return +val;
      return val;
    });

    return { table, columns, values };
  }

  private parseUpdate(sql: string): { table: string; set: Record<string, any>; where: { id: string } } {
    const table = this.parseTableName(sql, "update");

    const setMatch = sql.match(/set\s+(.*)\s+where/i);
    const setPart = setMatch ? setMatch[1] : "";
    
    const set: Record<string, any> = {};
    setPart.split(',').forEach(part => {
        const [col, val] = part.split("=").map(s => s.trim());
        if (col && val) {
            set[col] = val.startsWith("'") ? val.slice(1, -1) : isNaN(+val) ? val : +val;
        }
    });

    const whereMatch = sql.match(/where\s+id\s*=\s*(['"]?)(\w+)\1/i);
    const whereId = whereMatch ? whereMatch[2] : "";

    return { table, set, where: { id: whereId } };
  }

  private parseDelete(sql: string): { table: string; where: { id: string } } {
    const table = this.parseTableName(sql, "delete");
    const whereMatch = sql.match(/where\s+id\s*=\s*(['"]?)(\w+)\1/i);
    const whereId = whereMatch ? whereMatch[2] : "";
    return { table, where: { id: whereId } };
  }
}

// Экспортируем один экземпляр
export const db = new MySQLAdapter();