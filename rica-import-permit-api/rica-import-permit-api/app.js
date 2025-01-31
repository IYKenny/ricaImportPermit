const express = require("express");
const { Helpers } = require("./utils/helpers");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sendEmail", async (req, res) => {
  try {
    await Helpers.sendEmail(req.body.email, req.body);
    res.send({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
