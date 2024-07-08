// editor -> view
import Conversion from '../../engine/conversion/conversion'
import Config from '../../utils/config'
import Command from '../command'
import { EditorConfig } from './editorConfig'

export default abstract class Editor {
  public readonly command: Command

  public readonly config: Config<EditorConfig>

  public readonly conversion: Conversion
}
