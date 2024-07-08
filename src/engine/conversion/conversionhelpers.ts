export default class ConversionHelpers<TDispatcher> {
  
  private readonly _dispatchers: Array<TDispatcher>

  constructor(dispatchers: Array<TDispatcher>) {
    this._dispatchers = dispatchers
  }

  // public add(dispatcher: TDispatcher) {
  //   this._dispatchers.push(dispatcher)
  // }
  public add(conversionHelper: (dispatcher: TDispatcher) => void): this {
    for (const dispatcher of this._dispatchers) {
      conversionHelper(dispatcher)
    }

    return this
  }
}