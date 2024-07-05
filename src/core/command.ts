import type Editor from "./editor/editor";

export default abstract class Command {

  public readonly editor: Editor

  declare public value: unknown
}