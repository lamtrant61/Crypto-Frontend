import Resource from "@/api/resource";
import request from "@/utils/request";

class AnnouncementoinResource extends Resource {
  constructor() {
    super("announcement");
  }

  get_binance_announcement(query, data) {
    return request({
      url: `${this.uri}/binance_nnouncement`,
      method: "get",
      params: query,
      data: data,
    });
  }
}

export { AnnouncementoinResource as default };
