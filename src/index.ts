import { Elysia } from "elysia";

const app = new Elysia()
  // Response 
  .get("/", () => "Hello Elysia")
  .get("/string", () => new Response("hi"))

  // Paths and Parameters
  .get('/hello', ({ path }) => 'Hi you are in ' + path)
  .get('/id/:id', ({ params : { id } })=> id)
  .get('/id/:id/:name', ({ params : { id, name }}) => id + ' ' + name)
  .get('/id/*', ({ params }) => params['*'] )
  // Custom Method
  .route('M-SEARCH', '/m-search', () => 'connect')

  .onError(({ code }) => {
      if (code === 'NOT_FOUND')
            return 'Route not found :('
      })

  // Context set.status and error handling
  .get('/context' , ({ error }) => error(418, "kirifuji nagisa"))
  .get('/status' , ({ set }) => {
    set.status = 418
    set.headers['x-powered-by'] = 'Elysia'

    return "a mimir"
  })
  // Redirection to another resource
  .get('/youtube' , ({ set }) => {
    set.redirect = 'https://youtu.be/whpVWVWBW4U?&t=8'
  })
    // Default error handling
  .onBeforeHandle(({ set }) => {
      set.status = 404
      return "Not Found :("
    })


  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// Programmatically send a request to the server
// app.handle(new Request("http://localhost/")).then(console.log)

