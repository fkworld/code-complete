import type { ReplaceNumberToNumberStringDeep } from "./replace-number-to-number-string";

import { expectTypeOf } from "vitest";

interface Source {
  a: number;
  b: number | undefined;
  c: string;
  d: string | undefined;
  e: boolean;
  subObject: {
    a: number;
    b: number | undefined;
    c: string;
    d: string | undefined;
    e: boolean;
  };
}

type TargetReal = ReplaceNumberToNumberStringDeep<Source>;

interface TargetPredict {
  a: string | number;
  b: string | number | undefined;
  c: string;
  d: string | undefined;
  e: boolean;
  subObject: {
    a: string | number;
    b: string | number | undefined;
    c: string;
    d: string | undefined;
    e: boolean;
  };
}

expectTypeOf<TargetReal>().toEqualTypeOf<TargetPredict>();
