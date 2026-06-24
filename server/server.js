import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { z } from "zod";
import { nanoid } from "nanoid";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { askTimeTravelAgent } from "./ai/timeTravelAgent.js";
import { generateRecommendation } from "./ai/recommendationAgent.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reservationsPath = path.join(__dirname, "data", "reservations.json");

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
      : true
  })
);

async function ensureReservationsFile() {
  await fsp.mkdir(path.dirname(reservationsPath), { recursive: true });

  try {
    await fsp.access(reservationsPath);
  } catch {
    await fsp.writeFile(reservationsPath, "[]", "utf-8");
  }
}

async function readReservations() {
  await ensureReservationsFile();

  const content = await fsp.readFile(reservationsPath, "utf-8");

  try {
    const reservations = JSON.parse(content);
    return Array.isArray(reservations) ? reservations : [];
  } catch {
    return [];
  }
}

async function writeReservations(reservations) {
  await ensureReservationsFile();
  await fsp.writeFile(
    reservationsPath,
    JSON.stringify(reservations, null, 2),
    "utf-8"
  );
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "TimeTravel Agency API"
  });
});

const chatSchema = z.object({
  message: z.string().min(1, "Le message est obligatoire."),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string()
      })
    )
    .optional()
    .default([])
});

app.post("/api/chat", async (req, res) => {
  const result = chatSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Message invalide."
    });
  }

  try {
    const answer = await askTimeTravelAgent(result.data);

    res.json({
      answer
    });
  } catch (error) {
    console.error("Erreur /api/chat :", error);

    res.status(500).json({
      error: "Impossible de contacter l’agent temporel."
    });
  }
});

const recommendationSchema = z.object({
  experience: z.string().min(1),
  period: z.string().min(1),
  environment: z.string().min(1),
  activity: z.string().min(1)
});

app.post("/api/recommendation", async (req, res) => {
  const result = recommendationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Réponses invalides."
    });
  }

  try {
    const recommendation = await generateRecommendation(result.data);
    res.json(recommendation);
  } catch (error) {
    console.error("Erreur /api/recommendation :", error);

    res.status(500).json({
      error: "Impossible de générer une recommandation."
    });
  }
});

const reservationSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire."),
  email: z.string().email("Email invalide."),
  destination: z.enum(["Paris 1889", "Crétacé", "Florence 1504"]),
  date: z.string().min(1, "La date est obligatoire."),
  message: z.string().optional().default("")
});

app.post("/api/reservations", async (req, res) => {
  const result = reservationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Formulaire invalide. Vérifiez les champs obligatoires."
    });
  }

  const selectedDate = new Date(`${result.data.date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
    return res.status(400).json({
      error: "La date de départ doit être aujourd’hui ou dans le futur."
    });
  }

  try {
    const reservations = await readReservations();

    const newReservation = {
      id: `TTA-${nanoid(8)}`,
      name: result.data.name,
      email: result.data.email,
      destination: result.data.destination,
      date: result.data.date,
      message: result.data.message,
      status: "pending_tunnel_stabilization",
      createdAt: new Date().toISOString()
    };

    reservations.push(newReservation);

    await writeReservations(reservations);

    res.status(201).json({
      message: "Réservation enregistrée.",
      reservation: newReservation
    });
  } catch (error) {
    console.error("Erreur /api/reservations :", error);

    res.status(500).json({
      error: "Impossible d’enregistrer la réservation."
    });
  }
});

/*
  Partie production :
  après npm run build, Vite génère le dossier dist.
  Express sert ce dossier pour afficher le site en ligne.
*/
const distPath = path.join(__dirname, "..", "dist");

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "API TimeTravel Agency active",
      routes: ["/api/health", "/api/chat", "/api/recommendation", "/api/reservations"]
    });
  });
}

app.listen(PORT, () => {
  console.log(`API TimeTravel Agency lancée sur le port ${PORT}`);
});