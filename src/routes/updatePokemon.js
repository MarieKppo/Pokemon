const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => { // return permet de passer à l'instruction suivant si erreur
        if(pokemon === null){
          const message = "Le pokemon demandé n'existe pas. Essayez de nouveau avec un autre identifiant."
          return res.status(404).json({message}) //return important pour interrompre le code de cette instruction
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) { // vérification si erreur validateur sequelize si oui = erreur client = 400
        return res.status(400).json({message: error.message, data: error})
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({message: message.error, data: error})
      }
      const message = "Le pokémon n'a pas pu être modifié. Essayez de nouveau dans quelques instants."
      res.status(500).json({message, data : error})
    })
  })
}