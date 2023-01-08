export default interface LoggerInterface {
  write (message: string): void
  append (loggerMessage: LoggerMessage): void
}

export interface LoggerMessage {
  dateTimeOccurred: Date
  message: string
}

