export type RecordType = Record<number, string>;
// Snake stuff
export type SnakeNode = { x: number; y: number; prev: SnakeNode | null };

export type GridDimensions = {
  rows: number;
  cols: number;
}

