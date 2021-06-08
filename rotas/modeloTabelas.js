const Sequelize = require('sequelize')
const instancia = require('../banco-de-dados/index')

const colunas = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    discount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    multiply: {
        type: Sequelize.FLOAT,
        allowNull: true,
    }
}
const opcoes = {
    freezeTableName: true,
    tableName: 'Payments',
}


module.exports = instancia.define('pagamento', colunas, opcoes)     