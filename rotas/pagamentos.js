const TabelaPagamentos = require('./tabelaPagamentos')

class Pagamentos {
    constructor ({id, name, discount, multiply}) {
        this.id = id
        this.name = name
        this.discount = discount
        this.multiply = multiply + ((100-discount)/100)
    }

    async criar() {
        const resultado = await TabelaPagamentos.inserir({
            name: this.name,
            discount: this.discount,
            multiply: this.multiply
        })
        this.id = resultado.id
    }

    async carregar() {
        const encontrado = await TabelaPagamentos.pegarPorId(this.id)
        this.id = encontrado.id
        this.name = encontrado.name
        this.discount = encontrado.discount
        this.multiply = encontrado.multiply
    }

    remover() {
        return TabelaPagamentos.remover(this.id)
    }

    async atualizar(){
        await TabelaPagamentos.pegarPorId(this.id)
        const campos = ['name', 'discount', 'multiply']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
            dadosParaAtualizar[campo] = valor
        })

        if(Object.keys(dadosParaAtualizar).length === 1) {
            throw new DadosNaoFornecidos()
        }

        await TabelaPagamentos.atualizar(this.id, dadosParaAtualizar)
    }
}

module.exports = Pagamentos