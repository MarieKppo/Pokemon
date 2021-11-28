const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déjà pris.'
        },
        validate: {
          notEmpty: {msg: 'Le nom ne peut pas être vide.'},
          notNull: {msg: 'la propriété nom est requise.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'Utilisez uniquement des nombres entiers pour déclarer les points de vie.'},
          min: {
            args: [0],
            msg: "Les points de vie doivent être supérieur à 0 et inférieur à 999."
          },
          max:{
            args:[999],
            msg: "Les points de vie doivent être inférieur à 999 et supérieur à 0."
          },
          notNull: {msg:'La propriété point de vie est requise'},
          
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: 'Utilisez uniquement des nombres entiers pour déclarer les points de dégâts.'},
          min: {
            args: [0],
            msg: "Les points de dégâts doivent être supérieur à 0 et inférieur à 999."
          },
          max:{
            args:[999],
            msg: "Les points de dégâts doivent être inférieur à 999 et supérieur à 0."
          },
          notNull: {msg:'La propriété point de dégâts est requise'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {msg: 'Utilisez une URL valide pour l\'image.'},
          notNull: {msg:'La propriété image est requise'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        validate:{
          isTypeValid(value){
            if(!value){
              throw new Error(`Un Pokemon doit avoir au moins un type.`)
            }
            if(value.split(',').length > 3) {
              throw new Error(`Un Pokemon ne peut pas avoir plus de 3 types.`)
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le ou les types du Pokemon doivent figurer dans la liste suivante : ${validTypes}`)
              } 
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }