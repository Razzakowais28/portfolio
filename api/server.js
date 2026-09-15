import cors from "cors";
import express from "express";
import Redis from "ioredis";

const PORT = Number(process.env.PORT) || 3001;
const STATUS_TOKEN = process.env.STATUS_TOKEN;
const REDIS_URL = process.env.REDIS_URL;
const STATUS_KEY = "live_status_override";

const OVERRIDES = {
  "scrolling-reels": {
    key: "scrolling_reels",
    label: "SCROLLING REELS",
    icon: "📱",
    active: true,
  },
};

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

let memoryOverride = null;
let redis = null;

if (REDIS_URL) {
  redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: 2,
    lazyConnect: true,
  });

  redis.on("error", (error) => {
    console.error("Redis error:", error.message);
  });
}

async function readOverride() {
  if (redis) {
    const raw = await redis.get(STATUS_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  return memoryOverride;
}

async function writeOverride(value) {
  if (redis) {
    if (value) {
      await redis.set(STATUS_KEY, JSON.stringify(value));
    } else {
      await redis.del(STATUS_KEY);
    }
    return;
  }

  memoryOverride = value;
}

function unauthorized(res) {
  return res.status(401).json({ error: "Unauthorized" });
}

function isAuthorized(token) {
  return Boolean(STATUS_TOKEN) && token === STATUS_TOKEN;
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/status", async (_req, res) => {
  try {
    const override = await readOverride();
    res.json({ override });
  } catch (error) {
    console.error("Failed to read status:", error);
    res.status(500).json({ error: "Failed to read status" });
  }
});

app.get("/api/status/set", async (req, res) => {
  const token = String(req.query.token ?? "");
  const state = String(req.query.state ?? "").toLowerCase();

  if (!isAuthorized(token)) {
    return unauthorized(res);
  }

  try {
    if (state === "clear" || state === "normal") {
      await writeOverride(null);
      return res.json({ ok: true, override: null });
    }

    const override = OVERRIDES[state];
    if (!override) {
      return res.status(400).json({
        error: "Unknown state",
        allowed: [...Object.keys(OVERRIDES), "clear", "normal"],
      });
    }

    await writeOverride(override);
    return res.json({ ok: true, override });
  } catch (error) {
    console.error("Failed to set status:", error);
    return res.status(500).json({ error: "Failed to set status" });
  }
});

app.post("/api/status/set", async (req, res) => {
  const token = String(req.query.token ?? req.body?.token ?? "");
  const state = String(req.query.state ?? req.body?.state ?? "").toLowerCase();

  if (!isAuthorized(token)) {
    return unauthorized(res);
  }

  try {
    if (state === "clear" || state === "normal") {
      await writeOverride(null);
      return res.json({ ok: true, override: null });
    }

    const override = OVERRIDES[state];
    if (!override) {
      return res.status(400).json({
        error: "Unknown state",
        allowed: [...Object.keys(OVERRIDES), "clear", "normal"],
      });
    }

    await writeOverride(override);
    return res.json({ ok: true, override });
  } catch (error) {
    console.error("Failed to set status:", error);
    return res.status(500).json({ error: "Failed to set status" });
  }
});

async function start() {
  if (redis) {
    await redis.connect();
    console.log("Connected to Redis");
  } else {
    console.warn("REDIS_URL not set — using in-memory storage (resets on restart)");
  }

  if (!STATUS_TOKEN) {
    console.warn("STATUS_TOKEN not set — status updates will be rejected");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Status API listening on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
