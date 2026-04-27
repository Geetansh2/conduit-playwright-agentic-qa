import Ajv, { ValidateFunction, ErrorObject } from "ajv";
import { logger } from "../logger/Logger";

class JSONSchemaValidator {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      strict: false,
    });
  }

  private compileSchema(schema: object): ValidateFunction {
    return this.ajv.compile(schema);
  }

  validate(schema: object, data: any, testName: string = "API Response"): boolean {
    const validate = this.compileSchema(schema);

    const valid = validate(data);

    if (valid) {
      logger.info(`✅ Schema validation passed: ${testName}`);
      return true;
    }

    logger.error(`❌ Schema validation failed: ${testName}`);
    this.printErrors(validate.errors);

    return false;
  }

  private printErrors(errors: ErrorObject[] | null | undefined) {
    if (!errors) return;

    errors.forEach((err, index) => {
      logger.error(
        `Schema Error ${index + 1}: ${err.instancePath} ${err.message}`
      );
    });
  }
}

// Singleton instance
export const jsonSchemaValidator = new JSONSchemaValidator();