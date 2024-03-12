import RouteRooms from "./routes/crud_router";

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use('/', RouteRooms);

app.get('/', (req: any, res: any) => {
  res.send('Hello World!!!!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})