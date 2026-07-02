import Resource from "@/api/resource";
import request from "@/utils/request";

class CopyTradingResource extends Resource {
  constructor() {
    super("copy_trading");
  }

  get_list_copy_trading(query) {
    return request({
      url: `${this.uri}/list_copytrading`,
      method: "get",
      params: query,
    });
  }

  get_data_copy_trading(query) {
    return request({
      url: `${this.uri}/data_copytrading`,
      method: "get",
      params: query,
    });
  }
}

export { CopyTradingResource as default };
