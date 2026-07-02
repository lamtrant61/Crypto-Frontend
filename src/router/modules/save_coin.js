import Layout from "@/layout";

const SaveCoinRouter = {
  path: "/save_coin",
  component: Layout,
  redirect: "list",
  name: "Danh sách đã lưu",
  meta: {
    // roles: [],
    icon: "el-icon-s-order",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/save_coin"),
      name: "Danh sách đã lưu",
      meta: { title: "Danh sách đã lưu" },
      //   roles: [],
    },
  ],
};

export { SaveCoinRouter };
