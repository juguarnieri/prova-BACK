require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const eventRoutes = require("./src/routes/eventRoutes"); 
const participantRoutes = require("./src/routes/participantRoutes"); 
const reportRoutes = require("./src/routes/reportRoutes");

const setupSwagger = require("./src/config/swagger");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());



app.use("/api", participantRoutes); 
app.use("/api", eventRoutes); 
app.use("/api/reports", reportRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

app.use(express.json()); // Middleware para processar JSON
app.use(express.urlencoded({ extended: true })); // Middleware para processar URL-encoded