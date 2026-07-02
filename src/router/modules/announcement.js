import Layout from "@/layout";

const AnnouncementRouter = {
  path: "/announcement",
  component: Layout,
  redirect: "list",
  name: "Thông báo",
  meta: {
    // roles: [],
    icon: "el-icon-document",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/announcement"),
      name: "Thông báo",
      meta: { title: "Thông báo" },
      //   roles: [],
    },
  ],
};

export { AnnouncementRouter };
