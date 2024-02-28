const swaggerjsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Metadata info about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Elastic Implementation API", version: "1.0.0" }
    },
    apis: ["./v1/routes/elasticRoutes.js"]
}

// Docs on JSON format
const swaggerSpec = swaggerjsdoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Make our docs in JSON format available
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
}

module.exports = { swaggerDocs }