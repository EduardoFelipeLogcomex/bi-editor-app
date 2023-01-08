import * as dotenv from 'dotenv'
import Logger from './infra/logger/logger'
import LoaderDispatcher from './main/loaders/@shared/loader-dispatcher'
import ScreenLoader from './main/loaders/screen.loader'

async function main () {
  const logger = new Logger()
  const loaderDispatcher = new LoaderDispatcher(logger)
  loaderDispatcher.register('screen', new ScreenLoader())
  await loaderDispatcher.run()
}

dotenv.config()
main()
