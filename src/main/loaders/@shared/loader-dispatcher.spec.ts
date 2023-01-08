import Logger from '../../../infra/logger/logger'
import LoaderDispatcher from './loader-dispatcher'
import LoaderHandlerInterface from './loader-handler.interface'

describe('Loader dispatch unit tests', () => {
  it('should register an loader handler', () => {
    const loaderDispatcher = new LoaderDispatcher(new Logger())
    
    const loadHandlerMock: LoaderHandlerInterface = {
      handle(): Promise<void> {
        return Promise.resolve()
      }
    }

    loaderDispatcher.register('any_loader', loadHandlerMock)
    expect(loaderDispatcher['_loaderHandlers']).toStrictEqual({
      any_loader: loadHandlerMock
    })
  })
})