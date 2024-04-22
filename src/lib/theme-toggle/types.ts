/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export type GenericObject = Record<string, any>;

export type Pretty<T extends GenericObject> = {} & {
  [K in keyof T]: T[K];
};

export type Assign<
  Target extends GenericObject,
  Source extends GenericObject,
> = Pretty<Source & Omit<Target, keyof Source>>;
