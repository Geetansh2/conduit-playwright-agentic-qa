export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

class Logger {
  private isDebugEnabled: boolean;

  constructor() {
    // Enable debug logs only in non-prod environments
    this.isDebugEnabled = process.env.NODE_ENV !== "prod";
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private format(level: LogLevel, message: string): string {
    return `[${this.getTimestamp()}] [${level}] ${message}`;
  }

  info(message: string, ...optionalParams: any[]) {
    console.log(this.format(LogLevel.INFO, message), ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    console.warn(this.format(LogLevel.WARN, message), ...optionalParams);
  }

  error(message: string, error?: any) {
    console.error(this.format(LogLevel.ERROR, message));
    if (error) {
      console.error(error);
    }
  }

  debug(message: string, ...optionalParams: any[]) {
    if (!this.isDebugEnabled) return;
    console.debug(this.format(LogLevel.DEBUG, message), ...optionalParams);
  }
}

export const logger = new Logger();