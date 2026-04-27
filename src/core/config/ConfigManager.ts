// src/core/config/ConfigManager.ts

import fs from 'fs';
import path from 'path';
import { EnvironmentManager } from './EnvironmentManager';

export class ConfigManager {

  private static config: any;

  static loadConfig() {

    if (this.config) return;

    const env = EnvironmentManager.getEnv();

    const filePath = path.resolve(
      process.cwd(),
      `resources/config/${env}.json`
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`Config file not found: ${filePath}`);
    }

    const file = fs.readFileSync(filePath, 'utf-8');

    this.config = JSON.parse(file);
  }

  static get(key: string): any {
    this.loadConfig();

    return key.split('.').reduce((obj, k) => obj?.[k], this.config);
  }

  static getAll() {
    this.loadConfig();
    return this.config;
  }
}