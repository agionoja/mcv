export type UniqueArray<T extends any[]> = T extends [
  infer First,
  ...infer Rest,
]
  ? First extends Rest[number]
    ? never
    : [First, ...UniqueArray<Rest>]
  : T;
