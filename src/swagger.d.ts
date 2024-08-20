import { OpenAPIV3 } from "openapi-types";
import { RequestHandler } from "express";
declare module "swagger-jsdoc" {
  interface Options {
    definition: OpenAPIV3.Document;
    apis: string[];
  }
  export default function swaggerJsdoc(options: Options): OpenAPIV3.Document;
}

declare module "swagger-ui-express" {
  interface SwaggerUiOptions {
    explorer?: boolean;
    swaggerOptions?: Record<string, any>;
  }
  export function serve(req: any, res: any, next: any): void;
  export function setup(
    swaggerDoc: Record<string, any>,
    options?: SwaggerUiOptions
  ): RequestHandler;
}
