import { Options } from "swagger-jsdoc";

const options: Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de ejemplo con Node.js + TypeScript + Express",
        version: "1.0.0",
        description: "Documentación de la API usando Swagger",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Servidor local",
        },
      ],
      tags: [
        { name: "Auth", description: "Endpoints de autenticación" },
        { name: "Users", description: "Gestión de usuarios" },
        { name: "Business", description: "Gestión de negocios" },
        { name: "Products", description: "Gestión de productos" },
        { name: "Orders", description: "Gestión de ordenes de productos" },
      ],
    },
    apis: ["src/presentation/**/*.ts"],
};

export default options;
