const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
// const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(express.json())

sequelize.initDb()

// ici nous placerons nos futurs pour de terminaison (directement reliés à la BDD)
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// on ajoute la festion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver cette ressource. Veuillez saisir une autre adresse URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))