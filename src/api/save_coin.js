import Resource from "@/api/resource";
import request from "@/utils/request";

class SaveCoinResource extends Resource {
  constructor() {
    super("save_coin");
  }

  list_save_coin(query, data) {
    return request({
      url: `${this.uri}/list_save_coin`,
      method: "get",
      params: query,
      data: data,
    });
  }

  create_save_coin(data) {
    return request({
      url: `${this.uri}/create_save_coin`,
      method: "get",
      data: data,
    });
  }

  delete_save_coin(coin_id) {
    return request({
      url: `${this.uri}/delete_save_coin/${coin_id}`,
      method: "delete",
    });
  }
}

export { SaveCoinResource as default };
