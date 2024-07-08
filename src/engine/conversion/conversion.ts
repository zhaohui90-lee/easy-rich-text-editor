export default class Conversion {
  
}

type ConversionType<T extends string> = T extends `${string}Downcast`
  ? DowncastHelper
  : T extends `${string}Upcast`
    ? UpcastHelper
    : DowncastHelper | UpcastHelper