export type RecordType = Record<number, string>;

export type SnakeNode = { x: number; y: number; prev: SnakeNode | null };

export type Food = { x: number; y: number } | null;

export type GridDimensions = {
  rows: number;
  cols: number;
};
