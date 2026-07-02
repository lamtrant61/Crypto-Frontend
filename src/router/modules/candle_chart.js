import Layout from "@/layout";

const CandleChartRouter = {
  path: "/candle_chart",
  component: Layout,
  redirect: "list",
  name: "Phân tích kỹ thuật",
  meta: {
    // roles: [],
    icon: "el-icon-s-marketing",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/candle_chart"),
      name: "Phân tích kỹ thuật",
      meta: { title: "Phân tích kỹ thuật" },
      //   roles: [],
    },
  ],
};

export { CandleChartRouter };
