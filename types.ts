export type RecordType = Record<number, string>;

export type SnakeNode = Coordinate & { prev: SnakeNode | null };

export type Food = Coordinate | null;

export type GridDimensions = {
  rows: number;
  cols: number;
};

export type Direction = Coordinate;

export type Coordinate = { x: number; y: number };
