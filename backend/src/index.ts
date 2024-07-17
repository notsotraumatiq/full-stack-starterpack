import koa from "koa";
import cors from "@koa/cors";
const app = new koa();

app.use(cors());
app.use((ctx) => {
  ctx.body = "Hello World";
});

app.listen(3000);
