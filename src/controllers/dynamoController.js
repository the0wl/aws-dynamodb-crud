const { DynamoDB, config } = require('aws-sdk')
const databaseConfig = require('../config/db')

let dynamoDataBase

module.exports = {
  /**
   * Define as configurações do objeto DynamoDB e instancia-o.
   * As configurações serão lidas de `./src/config/secret.json`.
   */
  init() {
    config.loadFromPath('./src/config/secret.json')
    dynamoDataBase = new DynamoDB({ apiVersion: databaseConfig.apiVersion })
  },

  /**
   * Lê itens da tabela configurada no arquivo `./src/config/db.js`
   *
   * @param {String} primaryKey Atributo primário da tabela.
   * @param {String} sortKey Atributo de ordenação da tabela.
   * @param {String} condition Condição aplicada na chave primária e de ordenação.
   * @param {Object} atributes Demais campos do item (Opcional).
   * @param {String} filter Filtro aplicado nos demais atributos da tabela (Opcional).
   * @return {Object} 
   */
   select(primaryKey, sortKey, condition, atributes = null, filter = null) {
    let params = {
      ExpressionAttributeValues: {
        ':k': { S: primaryKey },
        ':s': { S: sortKey }
      },
      KeyConditionExpression: condition,
      TableName: databaseConfig.tableName
    }

    if (atributes) {
      const keys = Object.keys(atributes)

      keys.forEach((key) => {
        params.ExpressionAttributeValues[key] = atributes[key]
      })
    }

    if (filter) {
      params['FilterExpression'] = filter
    }

    return new Promise((resolve, reject) => {
      dynamoDataBase.query(params, function (err, data) {
        if (err) {
          reject({message: `error`, error: err})
        } else {
          resolve({message: "success", items: data.Items})
        }
      })
    })
  },

  /**
   * Insere um item na tabela configurada no arquivo `./src/config/db.js`
   *
   * @param {String} primaryKey Atributo primário da tabela.
   * @param {String} sortKey Atributo de ordenação da tabela.
   * @param {Object} atributes Demais campos do item (Opcional).
   * @return {Object}
   */
  insert(primaryKey, sortKey, atributes = null) {
    let params = {
      TableName: databaseConfig.tableName,
      Item: {
        'pk': { S: primaryKey },
        'sk': { S: sortKey },
      },
      ReturnValues: "ALL_NEW"
    }

    if (atributes) {
      const keys = Object.keys(atributes)

      keys.forEach((key) => {
        params.Item[key] = atributes[key]
      })
    }

    return new Promise((resolve, reject) => {
      dynamoDataBase.putItem(params, function (err, data) {
        if (err) {
          reject({message: `error`, error: err})
        } else {
          resolve({message: "success", items: data})
        }
      })
    })
  },

  /**
   * Altera um item na tabela configurada no arquivo `./src/config/db.js`
   *
   * @param {String} primaryKey Atributo primário da tabela.
   * @param {String} sortKey Atributo de ordenação da tabela.
   * @param {Object} expressionNames Nomes dos atributos manipulados.
   * @param {Object} expressionValues Valores dos atributos manipulados.
   * @param {String} updateExpression Quais atributos serão manipulados.
   * @param {String} condition Demais regras que devem ser consideradas (Opcional). 
   * @return {Object} 
   */
  update(primaryKey, sortKey, expressionNames, expressionValues, updateExpression, condition = null) {
    let params = {
      Key: {
          "pk": {
            "S": primaryKey
          },
          "sk": {
            "S": sortKey
          },
      },
      ExpressionAttributeNames: expressionNames,
      ExpressionAttributeValues: expressionValues,
      UpdateExpression: updateExpression,
      TableName: databaseConfig.tableName,
      ReturnValues: "ALL_NEW"
    }

    if (condition) {
      params["ConditionExpression"] = condition
    }

    return new Promise((resolve, reject) => {
      dynamoDataBase.updateItem(params, function (err, data) {
        if (err) {
          reject({message: `error`, error: err})
        } else {
          resolve({message: "success", items: data})
        }
      })
    })
  },

  /**
   * Remove um item na tabela configurada no arquivo `./src/config/db.js`
   *
   * @param {String} primaryKey Atributo primário da tabela.
   * @param {String} sortKey Atributo de ordenação da tabela.
   * @return {Object} 
   */
  delete(primaryKey, sortKey) {

    var params = {
      Key: {
       "pk": {
         S: primaryKey
        }, 
       "sk": {
         S: sortKey
        }
      }, 
      TableName: databaseConfig.tableName
    }

    return new Promise((resolve, reject) => {
      dynamoDataBase.deleteItem(params, function (err) {
        if (err) {
          reject({message: `error`, error: err})
        } else {
          resolve({message: "success"})
        }
      })
    })

  }

}