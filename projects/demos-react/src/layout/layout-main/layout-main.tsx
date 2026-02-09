import type { FC } from "react";

import { MainLeft } from "./main-left";
import { MainRight } from "./main-right";
import { MainTop } from "./main-top";

export const LayoutMain: FC = () => {
  return (
    <>
      <MainTop />
      <MainLeft />
      <MainRight />
    </>
  );
};
