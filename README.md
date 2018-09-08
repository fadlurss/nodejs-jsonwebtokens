# Nodejs Token Autentikasi

Repositori ini menggunakan JSON Web Tokens dan package [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)  untuk mengimplementasikan token berdasarkan autentikasi sederhana menggunakan Node js API 

## Kebutuhan
<ul><li>node dan npm</li></ul>

## Penggunaan
<ol type="1">
<li> Clone repo ini
<li> Install npm berikut ini : `npm install express body-parser morgan mongoose jsonwebtoken --save` </li>
<li> Jalankan server nya : node app.js </li>
<li> Buat contoh user baru dengan mengunjungi : localhost:3000/setup</li>
</ol>
Setelah user ditambahkan, kita akan mulai membuat dan verifikasi tokennya.

## Mendapatkan token

Gunakan POST untuk http://localhost:3000/api/authenticate dengan mengklik bagian body terdapat bagian bawah berikut ini x-www-form-urlencoded

Sumber : https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

At this point, we have 3 routes defined on our API routes (/api/authenticate, /api, and /api/users). Let's create route middleware to protect the last 2 routes. We won't want to protect the /api/authenticate route so what we'll do is place our middleware beneath that route. 
