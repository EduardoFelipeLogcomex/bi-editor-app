import LoggerInterface, { LoggerMessage } from './logger.interface'

export default class Logger implements LoggerInterface {

  write(message: string): void {
    this.append({
      dateTimeOccurred: new Date(),
      message
    })
  }

  append (loggerMessage: LoggerMessage): void {
    throw new Error('Method not implemented.');
  }
}
