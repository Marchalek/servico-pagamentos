class Serializador {
    
    json (dados) {
        return JSON.stringify(dados)
    }

    filtrar (dados) {
        if (Array.isArray(dados)) {
            dados = dados.map(item => {
                return this.filtarObjeto(item)
            })
        }else {
            dados = this.filtarObjeto(dados)
        }

        return dados
    }
   
    filtarObjeto(dados) {
        const novoObjeto = {}
        const camposPublicos = [
            'id',
            'name',
            'discount',
            'multiply'
        ]
        camposPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    serializar (dados) {
        dados = this.filtrar(dados)
        return this.json(dados)
    }
}

module.exports = Serializador
