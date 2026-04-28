// src/core/agents/testAgent.ts

export class TestAgent {

  static step(name: string, fn: () => Promise<void>) {
    console.log(`STEP: ${name}`);
    return fn();
  }
}