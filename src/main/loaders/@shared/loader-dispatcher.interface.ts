import LoaderHandlerInterface from './loader-handler.interface'

export default interface LoaderDispatcherInterface {
  register (name: string, loader: LoaderHandlerInterface): void
  run (): void
}