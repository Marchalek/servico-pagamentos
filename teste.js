const { default: axios } = require('axios')
const express = require ('express')
const { listar } = require('./rotas/tabelaPagamentos')
const app = express()

app.use(express.json())

app.listen(3200, (req, res) => {console.log('API rodando')})
listarnomes()

async function getData () {
    const dados = await axios.get("http://localhost:3100/API/pagamentos")
    return dados
}

async function listarnomes() {
    dados = await getData()
    nomes = dados.data
    console.log(nomes)
}

app.get('/', async (req, res) => {
    const data = await getData()

    console.log(data)
    res.send(data.data)
})