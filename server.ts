import express from "express";
const app = express();

const PORT: number = +process.env.PORT || 3000;
const HOST: string = process.env.HOST || "127.0.0.1";

app.use(express.json());
app.use(express.static("dist"));

app.get("/connect", (req, res) => {
    res.json({});
});

app.listen(PORT, HOST, () => console.log(`Server has been succesfully started on ${HOST}:${PORT}`));
