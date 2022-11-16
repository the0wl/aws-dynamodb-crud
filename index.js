const express = require('express')
const dynamoDB = require('./src/controllers/dynamoController')

const port = 3030
const app = express()

app.use(express.json())
dynamoDB.init()

app.listen(port, function () {
  console.log(`app listening on port ${port}`)
})

// Ler itens
app.get('/modelo_airbnb/', function (req, res) {
  const { primaryKey, sortKey, condition, atributes, filter } = req.body
  dynamoDB.select(primaryKey, sortKey, condition, atributes, filter).then(response => res.send(response))
})

// Adicionar item
app.post('/modelo_airbnb/', function (req, res) {
  const { primaryKey, sortKey, atributes } = req.body
  dynamoDB.insert(primaryKey, sortKey, atributes).then(response => res.send(response))
})

// Editar item
app.put('/modelo_airbnb/', function (req, res) {
  const { primaryKey, sortKey, expressionNames, expressionValues, updateExpression, condition } = req.body
  dynamoDB.update(primaryKey, sortKey, expressionNames, expressionValues, updateExpression, condition).then(response => res.send(response))
})

// Remover item
app.delete('/modelo_airbnb/', function (req, res) {
  const { primaryKey, sortKey } = req.body
  dynamoDB.delete(primaryKey, sortKey).then(response => res.send(response))
})

