import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get('/hello', () => 'Hi')
  .get('/id/:id', ({ params : { id } })=> id)
  .route('M-SEARCH', '/m-search', () => 'connect')
  .onError(({ code }) => {
    if (code === 'NOT_FOUND')
        return 'Route not found :('
  })
  
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// Programmatically send a request to the server
// app.handle(new Request("http://localhost/")).then(console.log)

