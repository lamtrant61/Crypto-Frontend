import Resource from "@/api/resource";
import request from "@/utils/request";

class PredictResource extends Resource {
  constructor() {
    super("predict");
  }

  get_predict_data(query) {
    return request({
      url: `${this.uri}/predict_range`,
      method: "get",
      params: query
    });
  }
}

export { PredictResource as default };
