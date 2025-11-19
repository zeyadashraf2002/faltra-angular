// Backend: src/shared/plugins/cors.js
import fp from "fastify-plugin";
import cors from "@fastify/cors";

async function corsPlugin(app) {
  app.register(cors, {
    // Allow both React and Angular frontends
    origin: [
      "http://localhost:5173",  // React Frontend
      "http://localhost:4200"   // Angular Frontend (default port)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  });
}

export default fp(corsPlugin);