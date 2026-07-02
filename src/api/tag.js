import Resource from "@/api/resource";
import request from "@/utils/request";

class TagResource extends Resource {
  constructor() {
    super("coin");
  }

  list_tag(query, data) {
    return request({
      url: `${this.uri}/list_tag`,
      method: "get",
      params: query,
      data: data,
    });
  }
}

export { TagResource as default };
