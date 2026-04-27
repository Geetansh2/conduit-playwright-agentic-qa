// src/core/config/EnvironmentManager.ts

export class EnvironmentManager {

  static getEnv(): string {
    return process.env.TEST_ENV || 'qa';
  }
}