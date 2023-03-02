import express from "express";
import { login,register } from "./controllers/auth.js";
import { addItem, getItem, updateItem, deleteItem } from "./controllers/toDoList.js";
import cors from "cors";
const app = express();

app.use(
    cors({
      origin: "http://localhost:3000",
    })
);
app.use(express.json());

app.post("/api/login", login)
app.post("/api/register", register)

app.post("/api/to", addItem)
app.get("/api/to/:userId", getItem)
app.put("/api/to/:itemId", updateItem)
app.delete("/api/to/:itemId", deleteItem);

app.listen(8800,function(){
    console.log("Listening to port 8800");
});