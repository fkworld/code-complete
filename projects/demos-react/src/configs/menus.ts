import { ROUTES } from "@/generated/routes";

export const MENUS: Array<{ title: string; link: string }> = [
  ...ROUTES.map((route) => {
    return {
      title: route.path,
      link: route.path,
    };
  }),
  {
    title: "/404",
    link: "/404",
  },
];
