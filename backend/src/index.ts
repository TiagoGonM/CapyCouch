import app from "./app";

app.listen(app.get("port"), () => {
  console.log(`Server is running on ${app.get("host")}:${app.get("port")}`);
});
