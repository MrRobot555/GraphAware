export interface TableRow {
  id?: string;
  data: Record<string, string>;
  kids: Record<string, { records: TableRow[] }>;
}

export type TableRows = TableRow[];

export interface StateType {
  fetchedData: TableRows;
  isFetched: boolean;
}

export interface HeaderType {
  text: string;
  value: string;
}
