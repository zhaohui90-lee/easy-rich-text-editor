import Model from "../../core/model";
import EmitterMixin from "../../utils/Emittermixin";

export default class DataController extends /* #__PURE__ */ EmitterMixin() {

  public readonly model: Model

  public readonly mapper: Mapper
}