import type { FC } from "react";

import { MENUS } from "@/configs/menus";
import { navigateTo } from "@/router/router-utils";

export const MainLeft: FC = () => {
  return (
    <div className="fixed top-14 bottom-0 left-0 w-64 bg-white p-4">
      {MENUS.map((menu) => {
        return (
          <div
            className="
              cursor-pointer p-2 underline
              hover:bg-black/5
            "
            key={menu.title}
            onClick={() => navigateTo(menu.link)}
          >
            {menu.title}
          </div>
        );
      })}
    </div>
  );
};
