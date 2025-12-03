/**
 * Псевдо-SQL адаптер, работающий через localStorage
 * Имитирует простые SQL-запросы: SELECT, INSERT, UPDATE, DELETE
 */
class MySQLAdapter {
  private storageKey = "__fake_db__";

  private getData() {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  private saveData(data: Record<string, any[]>) {
    if (typeof window === 'undefined') return;
    if (!data.fighters) {
      data.fighters = [
        { id: "1", name: "Иван Петров", club: "Кёкусин-клуб 'Щит'", age: 24, discipline: "Кекусин", rating: 1420, belt: "Чёрный пояс" },
        { id: "2", name: "Алексей Сидоров", club: "Fight Lab", age: 21, discipline: "ММА", rating: 1380, belt: "Коричневый" },
      ];
    }
    if (!data.tournaments) data.tournaments = [];
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  constructor() {
    if (typeof window !== 'undefined') {
      const db = this.getData();
      this.saveData(db);
    }
  }

  query(sql: string): any[] | { insertedId?: string; changedRows?: number } {
    const db = this.getData();
    const lowerSQL = sql.trim().toLowerCase();

    if (lowerSQL.startsWith("select * from ")) {
      const { tableName, where } = this.parseSelect(sql);
      const tableData = db[tableName] || [];
      if (where) {
        return tableData.filter(row => row[where.key] == where.value);
      }
      return tableData;
    }

    if (lowerSQL.startsWith("insert into ")) {
      const { table, columns, values } = this.parseInsert(sql);
      const tableData = db[table] || [];
      const row: Record<string, any> = {};
      columns.forEach((col, i) => { row[col] = values[i]; });
      if (!row.id) row.id = Date.now().toString();
      tableData.push(row);
      db[table] = tableData;
      this.saveData(db);
      return { insertedId: row.id };
    }

    if (lowerSQL.startsWith('update')) {
      const { table, updates, where } = this.parseUpdate(sql);
      let changedRows = 0;
      const updatedTableData = (db[table] || []).map(row => {
        if (row[where.key] == where.value) {
          changedRows++;
          return { ...row, ...updates };
        }
        return row;
      });
      db[table] = updatedTableData;
      this.saveData(db);
      return { changedRows };
    }

    if (lowerSQL.startsWith('delete from')) {
      const { table, where } = this.parseDelete(sql);
      let changedRows = 0;
      const updatedTableData = (db[table] || []).filter(row => {
        const shouldKeep = row[where.key] != where.value;
        if (!shouldKeep) changedRows++;
        return shouldKeep;
      });
      db[table] = updatedTableData;
      this.saveData(db);
      return { changedRows };
    }

    return [];
  }

  private parseValue(value: string): any {
    const trimmed = value.trim();
    if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
      return trimmed.substring(1, trimmed.length - 1);
    }
    if (!isNaN(Number(trimmed))) return Number(trimmed);
    return trimmed;
  }

  private parseSelect(sql: string): { tableName: string, where?: { key: string, value: any } } {
    const lowerSQL = sql.toLowerCase();
    const whereIndex = lowerSQL.indexOf(' where ');
    let tableName;
    let where;
    if (whereIndex > -1) {
      tableName = sql.substring("select * from ".length, whereIndex).trim();
      const whereClause = sql.substring(whereIndex + " where ".length).trim();
      const [whereKey, whereValue] = whereClause.split('=').map(s => s.trim());
      where = { key: whereKey, value: this.parseValue(whereValue) };
    } else {
      tableName = sql.substring("select * from ".length).trim().split(" ")[0];
    }
    return { tableName, where };
  }

  private parseInsert(sql: string): { table: string, columns: string[], values: any[] } {
    const tableMatch = sql.match(/insert into (\w+)/i);
    const table = tableMatch ? tableMatch[1] : "";
    const columnsMatch = sql.match(/\((.*?)\)/);
    const columns = columnsMatch ? columnsMatch[1].split(',').map(s => s.trim()) : [];
    const valuesMatch = sql.match(/values \((.*?)\)/i);
    const valuesStr = valuesMatch ? valuesMatch[1] : "";
    const values = valuesStr.split(',').map(s => this.parseValue(s));
    return { table, columns, values };
  }

  private parseUpdate(sql: string): { table: string, updates: Record<string, any>, where: { key: string, value: any } } {
    const table = sql.toLowerCase().split(' ')[1];
    const setClause = sql.substring(sql.toLowerCase().indexOf('set') + 3, sql.toLowerCase().indexOf('where')).trim();
    const whereClause = sql.substring(sql.toLowerCase().indexOf('where') + 5).trim();
    const updates: Record<string, any> = {};
    setClause.split(',').forEach(part => {
      const [key, value] = part.split('=').map(s => s.trim());
      updates[key] = this.parseValue(value);
    });
    const [whereKey, whereValue] = whereClause.split('=').map(s => s.trim());
    return { table, updates, where: { key: whereKey, value: this.parseValue(whereValue) } };
  }

  private parseDelete(sql: string): { table: string, where: { key: string, value: any } } {
    const table = sql.toLowerCase().split(' ')[2];
    const whereClause = sql.substring(sql.toLowerCase().indexOf('where') + 5).trim();
    const [whereKey, whereValue] = whereClause.split('=').map(s => s.trim());
    return { table, where: { key: whereKey, value: this.parseValue(whereValue) } };
  }
}

export const db = new MySQLAdapter();
