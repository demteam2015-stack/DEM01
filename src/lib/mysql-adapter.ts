
/**
 * Псевдо-SQL адаптер, работающий через localStorage
 * Имитирует простые SQL-запросы: SELECT, INSERT, UPDATE, DELETE
 */
class MySQLAdapter {
  private storageKey = "__fake_db__";

  private getData() {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(this.storageKey);
    // Initialize with some data if it's empty
    if (!data) {
        const initialData = {
            fighters: [
              { id: "1", name: "Иван Петров", club: "Кёкусин-клуб 'Щит'", age: 24, discipline: "Кекусин", rating: 1420, belt: "Чёрный пояс" },
              { id: "2", name: "Алексей Сидоров", club: "Fight Lab", age: 21, discipline: "ММА", rating: 1380, belt: "Коричневый" },
            ],
            tournaments: []
        };
        this.saveData(initialData);
        return initialData;
    }
    return JSON.parse(data);
  }

  private saveData(data: Record<string, any[]>) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  public query(sql: string): any {
    const data = this.getData();
    const sqlLower = sql.toLowerCase();

    if (sqlLower.startsWith('select')) {
      const match = sql.match(/SELECT \* FROM (\w+)(?: WHERE (.*))?/i);
      if (!match) return [];
      
      const [, tableName, whereClause] = match;
      const table = data[tableName] || [];

      if (!whereClause) {
        return table;
      }

      const whereMatch = whereClause.match(/(\w+)\s*=\s*'([^']*)'/);
      if (!whereMatch) return [];

      const [, key, value] = whereMatch;
      // Use '==' for implicit type conversion, which is fine for this mock
      return table.filter(item => item[key] == value);

    } else if (sqlLower.startsWith('insert')) {
        const match = sql.match(/INSERT INTO (\w+) \((.*?)\) VALUES \((.*?)\)/i);
        if (!match) return false;
        
        const [, tableName, cols, vals] = match;
        const keys = cols.split(',').map(k => k.trim());
        // This is a simplified parser, be careful with commas in values
        const values = vals.split(',').map(v => v.trim().replace(/'/g, ''));
        
        if (!data[tableName]) data[tableName] = [];

        const newRecord: Record<string, any> = { id: String(Date.now() + Math.random()) };
        keys.forEach((key, index) => {
            const value = values[index];
            // Try to convert to number if it looks like one
            newRecord[key] = isNaN(Number(value)) ? value : Number(value);
        });

        data[tableName].push(newRecord);
        this.saveData(data);
        return true;

    } else if (sqlLower.startsWith('update')) {
        const match = sql.match(/UPDATE (\w+) SET (.*?) WHERE (.*)/i);
        if (!match) return false;

        const [, tableName, setClause, whereClause] = match;
        if (!data[tableName]) return false;

        const whereMatch = whereClause.match(/(\w+)\s*=\s*'([^']*)'/);
        if (!whereMatch) return false;
        const [, whereKey, whereValue] = whereMatch;

        const setParts = setClause.split(',').map(p => p.trim());
        const updates: Record<string, any> = {};
        setParts.forEach(part => {
            const eqMatch = part.match(/(\w+)\s*=\s*'([^']*)'/);
            if (eqMatch) {
                 const value = eqMatch[2];
                 updates[eqMatch[1]] = isNaN(Number(value)) ? value : Number(value);
            }
        });
        
        let updatedCount = 0;
        data[tableName] = data[tableName].map(item => {
            if (item[whereKey] == whereValue) {
                updatedCount++;
                return { ...item, ...updates };
            }
            return item;
        });
        
        if (updatedCount > 0) {
            this.saveData(data);
        }
        return updatedCount > 0;

    } else if (sqlLower.startsWith('delete')) {
        const match = sql.match(/DELETE FROM (\w+) WHERE (.*)/i);
        if (!match) return false;

        const [, tableName, whereClause] = match;
        if (!data[tableName]) return false;

        const whereMatch = whereClause.match(/(\w+)\s*=\s*'([^']*)'/);
        if (!whereMatch) return false;
        const [, whereKey, whereValue] = whereMatch;
        
        const originalLength = data[tableName].length;
        data[tableName] = data[tableName].filter(item => item[whereKey] != whereValue);
        
        if (data[tableName].length < originalLength) {
            this.saveData(data);
            return true;
        }
        return false;
    }

    return null;
  }
}

export const db = new MySQLAdapter();
