import type { DependentMap, MapEntries, ObjectFromEntries } from './types';

export var Object_fromEntries = Object.fromEntries;

export var fromEntries: <T extends DependentMap<MapEntries>>(
  entries: T
) => ObjectFromEntries<T extends DependentMap<infer U> ? U : never> =
  Object_fromEntries;
