import koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
const app = new koa();
const router = new Router();
const physicians = {
  1: {
    id: 1,
    name: "Dr. John Doe",
  },
  2: {
    id: 2,
    name: "Dr. Jane Doe",
  },
  3: {
    id: 3,
    name: "Dr. John Smith",
  },
};

const appointments = {
  1: {
    id: 1,
    physicianId: 1,
    patient: "Alice",
    time: "2021-01-01T10:00:00Z",
    kind: "New Patient",
  },
  2: {
    id: 2,
    physicianId: 1,
    patient: "Bob",
    time: "2021-01-01T10:30:00Z",
    kind: "Follow-up",
  },
  3: {
    id: 3,
    physicianId: 2,
    patient: "Charlie",
    time: "2021-01-01T11:00:00Z",
    kind: "New Patient",
  },
  4: {
    id: 4,
    physicianId: 3,
    patient: "David",
    time: "2021-01-01T11:30:00Z",
    kind: "Follow-up",
  },
};

// Get list of  physicians on /physicians

app.use(cors({ origin: "*" }));
app.use((ctx, next) => {
  if (ctx.path === "/physicians") {
    ctx.body = Object.values(physicians);
  } else {
    return next();
  }
});

// Get list of appointments on /appointments:id

router.get("/physicians/:physicianId", (ctx) => {
  const matchId = Number(ctx.params.physicianId); // Convert matchId to a number
  if (!Number.isInteger(matchId)) {
    ctx.status = 400;
    ctx.body = "Physician ID must be an integer";
    return;
  }
  const result = [];
  for (let [key, value] of Object.entries(appointments)) {
    if (value["physicianId"] === matchId) result.push(value);
  }
  ctx.body = result;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
