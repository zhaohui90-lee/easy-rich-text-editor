/**
 * URL the document
 */
export const DOCUMENT_URL = ''

/**
 * editor error class
 */
export default class EditorError extends Error {
  public readonly context: object | null | undefined

  public readonly data?: object

  constructor(errorName: string, context?: object | null, data?: object) {
    super(getErrorMessage(errorName, data))
    this.name = 'EditorError'
    this.context = context
    this.data = data
  }
}

function getErrorMessage(errorName: string, data?: object): string {
  const processedObjects = new WeakSet()
  const circularReferenceReplacer = (key: string, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      if (processedObjects.has(value)) {
        return `[Object ${value.constructor.name}]`
      }

      processedObjects.add(value)
    }

    return value
  }

  const stringifiedData = data ? `${JSON.stringify(data, circularReferenceReplacer)}` : ''
  const documentationLink = getLinkToDocumentationMessage(errorName)
  return errorName + stringifiedData + documentationLink
}

function getLinkToDocumentationMessage(errorName: string): string {
  return `\nRead more: ${DOCUMENT_URL}#error-${errorName}`
}
