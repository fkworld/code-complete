import type { FC } from "react";

import { IconBrandGithub } from "@tabler/icons-react";

import { APP_INFOS } from "@/configs/app-infos";

export const MainTop: FC = () => {
  return (
    <div
      className="
        fixed inset-x-0 top-0 flex h-14 items-stretch gap-4 bg-white p-4
      "
    >
      <div>{APP_INFOS.name}</div>
      <IconBrandGithub onClick={() => window.open(APP_INFOS.githubLink, "__blank")} />
    </div>
  );
};
