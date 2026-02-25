import type {
  DependentMap,
  MapEntries,
  ObjectFromEntries,
  PickLastUnionValue,
} from './types';

export var Object_fromEntries = Object.fromEntries;

export var fromEntries: <T extends DependentMap<MapEntries>>(
  entries: T
) => PickLastUnionValue<
  ObjectFromEntries<T extends DependentMap<infer U> ? U : never>
> = Object_fromEntries;
