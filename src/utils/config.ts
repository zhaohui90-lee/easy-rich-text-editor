import { cloneDeepWith, isElement, isPlainObject } from 'lodash-es'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @typeParam Cfg A type of the configuration dictionary.
 */
export default class Config<Cfg> {
  /**
   * Store for the whole configuration.
   *
   */
  private readonly _config: Record<string, any>

  /**
   * create the instance
   * @param configurations the config from user
   * @param defaultConfigurations the config from system
   */
  constructor(configurations?: Partial<Cfg>, defaultConfigurations?: Partial<Cfg>) {
    this._config = {}
    // set the default
    if (defaultConfigurations) {
      this.define(cloneConfig(defaultConfigurations))
    }
    // set init
    if (configurations) {
      this._setObjectToTarget(this._config, configurations)
    }
  }

  public set<K extends string>(name: K, value: GetSubConfig<Cfg, K>): void

  public set(config: Partial<Cfg>): void

  public set(name: string | Record<string, any>, value?: any) {
    this._setToTarget(this._config, name, value)
  }

  public define<K extends string>(name: K, value: GetSubConfig<Cfg, K>): void

  public define(config: Partial<Cfg>): void

  public define(name: string | Record<string, any>, value?: any) {
    const isDefine = true

    this._setToTarget(this._config, name, value, isDefine)
  }

  public get<K extends string>(name: K): GetSubConfig<Cfg, K> | undefined {
    return this._getFromSource(this._config, name)
  }

  /**
   * iterate all the top level names
   */
  public *name(): Iterable<string> {
    for (const name of Object.keys(this._config)) {
      yield name
    }
  }

  private _getFromSource(source: any, name: string): any {
    // split the source, ['resize', 'width']
    const parts = name.split('.')
    // take the name of the config, ['resize', 'width'] => `width`
    name = parts.pop()
    // iterate the parts
    for (const part of parts) {
      if (!isPlainObject(part)) {
        source = null
        break
      }
      // nest
      source = source[part]
    }
    // return undefined for non existing config
    return source ? cloneConfig(source[name]) : undefined
  }

  /**
   *
   * @param target Nested config object.
   * @param configuration
   * @param isDefine
   */
  private _setObjectToTarget(target: any, configuration: any, isDefine?: boolean) {
    Object.keys(configuration).forEach((key) => {
      this._setToTarget(target, key, configuration[key], isDefine)
    })
  }

  /**
   * Saves passed configuration to the specified target (nested object).
   *
   * @param target
   * @param name
   * @param value
   * @param isDefine
   */
  private _setToTarget(target: any, name: any, value: any, isDefine: boolean = false): void {
    if (isPlainObject(name)) {
      this._setObjectToTarget(target, name, value)

      return
    }

    // split the config name if it has the dot, `resize.width` => ['resize', 'width']
    const parts = name.split('.')
    // take the name of the config, ['resize', 'width'] => `width`
    name = parts.pop()

    // iterate the parts
    for (const part of parts) {
      // check if plain object
      if (!isPlainObject(part)) {
        target[part] = {}
      }

      // nest the target
      target = target[part]
    }

    // is a plain object
    if (isPlainObject(value)) {
      if (!isPlainObject(target[name])) {
        target[name] = {}
      }

      target = target[name]

      this._setObjectToTarget(target, value, isDefine)
      return
    }

    if (isDefine && typeof target[name] === 'undefined') {
      return
    }

    target[name] = value
  }
}

function cloneConfig<T>(source: T): T {
  return cloneDeepWith(source, leaveItemReference)
}

function leaveItemReference(value: unknown): unknown {
  return isElement(value) || typeof value === 'function' ? value : undefined
}

/**
 * An utility type excluding primitive values and arrays from the union.
 */
export type OnlyObject<T> = Exclude<T, undefined | null | string | number | boolean | Array<any>>

export type GetSubConfig<T, K> = K extends keyof T
  ? T[K]
  : K extends `${infer K1}.${infer K2}`
  ? K1 extends keyof T
    ? GetSubConfig<OnlyObject<T[K1]>, K2>
    : unknown
  : unknown
