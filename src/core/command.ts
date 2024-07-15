import type Editor from "./editor/editor";

export default abstract class Command {

  public readonly editor: Editor

  /**
   * @observable
   * @readonly
   */
  declare public value: unknown

  /**
   * @observable
   * @readonly
   */
  declare public isEnabled: boolean

  protected _isEnabledBasedOnSelection: boolean

  private _affectsData: boolean

  private readonly _disabledStack: Set<string>

  constructor(editor: Editor) {
    this.editor = editor

    this.set('value', undefined)
    this.set('isEnabled', false)
  }

  public get affectsData(): boolean {
    return this._affectsData
  }

  protected set affectsData(affectsData: boolean) {
    this.affectsData = affectsData
  }
}