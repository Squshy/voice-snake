export type RecordType = Record<number, string>;
// Snake stuff
export type SnakeNode = { x: number; y: number; next: SnakeNode | null };

export type GridDimensions = {
  rows: number;
  cols: number;
}

