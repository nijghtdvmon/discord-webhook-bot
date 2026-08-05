const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const app = express();
app.use(express.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log("Bot online!");
});

app.post("/webhook", async (req, res) => {
  const data = req.body;

  const idol = data.idol || "idol";
  const url = data.url || "";
  const text = data.text || "";

  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    await channel.send(`📢 Nuovo post da **${idol}**!\n${text}\n🔗 ${url}`);
    res.send("ok");
  } catch (error) {
    console.error("Errore nell'invio del messaggio:", error);
    res.status(500).send("errore");
  }
});

app.listen(3000, () => {
  console.log("Server attivo su Railway");
});

client.login(TOKEN);
