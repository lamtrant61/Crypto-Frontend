import Layout from "@/layout";

const HomeRouter = {
  path: "/home",
  component: Layout,
  redirect: "list",
  name: "Trang chủ",
  meta: {
    // roles: [],
    icon: "el-icon-s-home",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/dashboard"),
      name: "Trang chủ",
      meta: { title: "Trang chủ" },
      //   roles: [],
    },
  ],
};

export { HomeRouter };
