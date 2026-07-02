import Layout from "@/layout";

const CoinRouter = {
  path: "/coin",
  component: Layout,
  redirect: "list",
  name: "Danh sách tiền ảo",
  meta: {
    // roles: [],
    icon: "el-icon-s-data",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/coin"),
      name: "Danh sách tiền ảo",
      meta: { title: "Danh sách tiền ảo" },
      //   roles: [],
    },
  ],
};

export { CoinRouter };
