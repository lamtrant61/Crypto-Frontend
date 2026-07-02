import Layout from "@/layout";

const SimulatorRouter = {
  path: "/simulator",
  component: Layout,
  redirect: "list",
  name: "Giả lập giao dịch",
  meta: {
    // roles: [],
    icon: "el-icon-video-camera",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/simulator"),
      name: "Giả lập giao dịch",
      meta: { title: "Giả lập giao dịch" },
      //   roles: [],
    },
  ],
};

export { SimulatorRouter };
