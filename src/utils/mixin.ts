// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<Instance = object> = abstract new (...args: Array<any>) => Instance

export type Mixed<Base extends Constructor, Mixin extends object> = {
  new (...args: ConstructorParameters<Base>): Mixin & InstanceType<Base>
  prototype: Mixin & InstanceType<Base>
} & {
  // include all static fields from Base
  [K in keyof Base]: Base[K]
}