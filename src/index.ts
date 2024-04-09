import { Elysia, t } from "elysia";

// Decorate
class Logger {
  log(value: string) {
    console.log(value);
    return value;
  }
}

const app = new Elysia()
  .state('counter', 0)
  .state('version', 10)
  // Derive with authorization
  .derive(({ headers }) => {
    const auth = headers['authorization'];
    
    return {
      bearer: auth?.startsWith('Bearer ') ? auth.slice(7) : null
    }
  })

  // Decorate the app with a logger instance
  .decorate('logger', new Logger())

  // Middleware
  .get("/auth", ({ bearer }) => bearer ? "Authenticated" : "Unauthenticated")
  .get("/elysia-version", ({ store }) => store.version)
  .get("/log", ({ logger }) => logger.log("Hi"))

  .get("/:name", ({ params: name }) => `Hello ${name}`)
  .get("/api/:id" , ({ params: id }) => id, {
    params: t.Object({
      id: t.Numeric()
    })
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);