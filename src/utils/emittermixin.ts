import { Mixed } from "./mixin";

const defaultEmitterClass = /* #__PURE__ */ EmitterMixin(Object)

export default function EmitterMixin<Base extends Constructor>(base: Base): Mixed<Base, Emitter>

export default function EmitterMixin(): {
  new (): Emitter,
  prototype: Emitter
}

export default function EmitterMixin(base?: Constructor) {
  if (!base) {
    return defaultEmitterClass
  }
}

export interface Emitter {
  
}