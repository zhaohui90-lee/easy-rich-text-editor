import { isObject, map } from 'lodash-es'
import EmitterMixin, { Emitter } from './emittermixin'
import { Mixed } from './mixin'
import EditorError from './editorerror'

const observablePropertiesSymbol = Symbol('observableProperties')
const boundObservablesSymbol = Symbol('boundObservables')
const boundPropertiesSymbol = Symbol('boundProperties')

const decoratedMethods = Symbol('decoratedMethods')

const defaultObservableClass = /* #__PURE__ */ ObservableMixin(/* #__PURE__ */ EmitterMixin())

export default function ObservableMixin<Base extends Constructor<Emitter>>(base: Base): Mixed<Base, Observable>

/**
 * @label 无参数
 */
export default function ObservableMixin(): {
  new (): Observable
  prototype: Observable
}

export default function ObservableMixin(base?: Constructor<Emitter>): unknown {
  if (!base) {
    return defaultObservableClass
  }

  abstract class Mixin extends base implements ObservableInternal {
    public set(name: string | { [name: string]: unknown }, value?: unknown): void {
      if (isObject(name)) {
        Object.keys(name).forEach((property) => {
          this.set(property, name[property])
        }, this)

        return
      }

      initObservable(this)

      const properties = this[observablePropertiesSymbol]

      if ((name in this) && !properties!.has(name)) {
        throw new EditorError('observable-set-cannot-override', this)
      }
    }
  }
}

interface Binding {
  property: string

  to: Array<[Observable, string]>

  /**
   * 
   * Don't use `Function` as a type. The `Function` type accepts any function-like value.
   * It provides no type safety when calling the function, which can be a common source of bugs.
   * It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.
   * If you are expecting the function to accept certain arguments, you should explicitly define the function shape.
   * eslint@typescript-eslint/ban-types
   */
  callback?: (...args: unknown[]) => unknown
}

function initObservable(observable: ObservableInternal): void {
  if (observable[observablePropertiesSymbol]) {
    return
  }

  Object.defineProperty(observable, observablePropertiesSymbol, {
    value: new Map()
  })

  Object.defineProperty(observable, boundObservablesSymbol, {
    value: new Map()
  })

  Object.defineProperty(observable, boundPropertiesSymbol, {
    value: new Map()
  })
}

interface Observable extends Emitter {
  set<K extends keyof this & string>(name: K, value: this[K]): void

  set(values: object & { readonly [K in keyof this]?: unknown }): void
}

interface ObservableInternal extends Observable {
  [observablePropertiesSymbol]?: Map<string, unknown>

  [decoratedMethods]?: Array<string>

  [boundObservablesSymbol]?: Map<string, Binding>

  [boundPropertiesSymbol]?: Map<Observable, Record<string, Set<Binding>>>
}
