import LoggerInterface from '../../../infra/logger/logger.interface'
import LoaderDispatcherInterface from './loader-dispatcher.interface'
import LoaderHandlerInterface from './loader-handler.interface'

export default class LoaderDispatcher implements LoaderDispatcherInterface {
  private readonly _logger: LoggerInterface
  private _loaderHandlers: { [loader: string]: LoaderHandlerInterface } = {}

  constructor (logger: LoggerInterface) {
    this._logger = logger
  }
  
  register (name: string, loader: LoaderHandlerInterface): void {
    if (!this._loaderHandlers[name]) {
      this._loaderHandlers[name] = loader
    }
  }

  async run (): Promise<void> {
    for (const name of Object.keys(this._loaderHandlers)) {
      try {
        await this._loaderHandlers[name].handle()
      } catch (error) {
        this._logger.write(String(error))
        throw new Error('error on run system loaders')   
      }
    }
  }
}
