# nodejs-jsonwebtokens
Latihan Node js - Bagian JWT (Json Web Tokens)

Sumber : https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

At this point, we have 3 routes defined on our API routes (/api/authenticate, /api, and /api/users). Let's create route middleware to protect the last 2 routes. We won't want to protect the /api/authenticate route so what we'll do is place our middleware beneath that route. 