import swaggerJsDoc from "swagger-jsdoc";
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Information",
      contact: {
        name: "Apartment API",
      },
      servers: [{ url: `http://localhost:3000` }],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/controllers/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
