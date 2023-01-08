export default interface LoaderHandlerInterface {
  handle (...args: any): Promise<void>
}
