const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if(error instanceof ValidationError) { // vérification si erreur validateur sequelize si oui = erreur client = 400
          return res.status(400).json({message: error.message, data: error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message: message.error, data: error})
        }
        const message = "Le pokémon n'a pas pu être créé. Essayez de nouveau dans quelques instants."
        res.status(500).json({message, data : error})
      })
  })
}