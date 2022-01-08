import express from "express";
const app = express();

app.use(express.json());
app.use(express.static("dist"));

app.get("/connect", (req, res) => {
  res.json({});
});

app.listen(3201, () => console.log(`Server has been succesfully started!`));
