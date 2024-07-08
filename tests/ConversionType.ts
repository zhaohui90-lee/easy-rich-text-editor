type DowncastHelper = {
  toNumber(): number
  toString(): string
  toBoolean(): boolean
}
type UpcastHelper = {
  toArray(): any[]
  toObject(): object
}

type ConversionType<T extends string> = T extends `${string}Downcast`
  ? DowncastHelper
  : T extends `${string}Upcast`
    ? UpcastHelper
    : DowncastHelper | UpcastHelper

function convert<T extends string>(type: T): ConversionType<T> {
  console.log('===>', type);
  return {} as any
}

const downcast = convert('numberDowncast')
downcast.toNumber()