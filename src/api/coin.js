import Resource from "@/api/resource";
import request from "@/utils/request";

class CoinResource extends Resource {
  constructor() {
    super("coin");
  }

  list_coin(query, data) {
    return request({
      url: `${this.uri}/list_coin`,
      method: "get",
      params: query,
      data: data,
    });
  }

  detail_coin(id) {
    return request({
      url: `${this.uri}/get_data_coin/${id}`,
      method: "get",
    });
  }

  data_detail_coin(id) {
    return request({
      url: `${this.uri}/get_data_coin_detail/${id}`,
      method: "get",
    });
  }

  get_update_time() {
    return request({
      url: `${this.uri}/get_update_time`,
      method: "get",
    });
  }

  save_coin(data) {
    return request({
      url: `${this.uri}/save_coin`,
      method: "post",
      data: data,
    });
  }

  get_cash_flow(query) {
    return request({
      url: `${this.uri}/get_cash_flow`,
      method: "get",
      params: query,
    });
  }
}

export { CoinResource as default };
