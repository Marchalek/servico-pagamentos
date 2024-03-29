const roteador = require('express').Router()
const TabelaPagamentos = require('./tabelaPagamentos')
const Pagamentos = require('./pagamentos')
const Serializador = require ('../serializador')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaPagamentos.listar()
    const serializador = new Serializador
    res.status(200).send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body
    const pagamento = new Pagamentos(dadosRecebidos)
    await pagamento.criar()
    res.status(201).send(
        JSON.stringify(pagamento)
    )
})

roteador.delete('/:idPagamento', async (req, res, proximo) => {
    try{
        const id = req.params.idPagamento
        const pagamento = new Pagamentos ({id: id})
        await pagamento.carregar()
        await pagamento.remover()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
    
})

roteador.put('/:idPagamento', async (req, res, proximo) =>{
    try{
        const id = req.params.idPagamento
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id:id})
        const pagamento = new Pagamentos(dados)
        await pagamento.atualizar()
        res.send('Método atualizado')
        res.status(204)
        
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador



