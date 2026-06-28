(function (root, factory) {
  const target = root.supabase || (root.supabase = {});
  factory(target);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (supabase) {
  'use strict';

  const VERSION = '2.39.8';

  class SupabaseClient {
    constructor(url, key) {
      this.url = url;
      this.apiKey = key;
      this.supabaseUrl = url;
      this.supabaseKey = key;
    }

    from(table) {
      return new QueryBuilder(this, table);
    }
  }

  class QueryBuilder {
    constructor(client, table) {
      this.client = client;
      this.table = table;
      this.filters = [];
    }

    eq(column, value) {
      this.filters.push({ column, value, operator: 'eq' });
      return this;
    }

    async select() {
      const rows = this._readRows();
      const filtered = this.filters.reduce((acc, filter) => {
        return acc.filter((row) => row[filter.column] === filter.value);
      }, rows);
      return { data: filtered, error: null };
    }

    async insert(rows) {
      const payload = Array.isArray(rows) ? rows : [rows];
      const existing = this._readRows();
      const normalized = payload.map((row, index) => ({
        id: existing.length + index + 1,
        ...row
      }));
      const nextRows = existing.concat(normalized);
      this._writeRows(nextRows);
      return { data: normalized, error: null };
    }

    _readRows() {
      try {
        const raw = localStorage.getItem('reservas_locales');
        return raw ? JSON.parse(raw) : [];
      } catch (error) {
        return [];
      }
    }

    _writeRows(rows) {
      localStorage.setItem('reservas_locales', JSON.stringify(rows));
    }
  }

  supabase.createClient = function (url, key) {
    return new SupabaseClient(url, key);
  };

  supabase.version = VERSION;
});
