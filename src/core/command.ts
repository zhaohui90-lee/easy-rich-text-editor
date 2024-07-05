import type Editor from "./editor";

export default abstract class Command {

  public readonly editor: Editor

  declare public value: unknown
}