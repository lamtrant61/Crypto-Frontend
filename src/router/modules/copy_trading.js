import Layout from "@/layout";

const CopyTradingRouter = {
  path: "/copy_trading",
  component: Layout,
  redirect: "list",
  name: "Sao chép giao dịch",
  meta: {
    // roles: [],
    icon: "el-icon-picture",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/copy_trading"),
      name: "Sao chép giao dịch",
      meta: { title: "Sao chép giao dịch" },
      //   roles: [],
    },
  ],
};

export { CopyTradingRouter };
