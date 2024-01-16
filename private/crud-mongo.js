const { connectMongo } = require('./mongo.js')

async function prepareCRUD() {
  const collectionName = "strings"

  const collection = await connectMongo(collectionName)
  const docs = await collection.find().toArray()

  const crud = {
    async c(str) {
      if (typeof str !== 'string') throw 'strings only'
      if (docs.some(doc => doc.string == str)) throw 'duplicate string'
      const doc = { string: str }
      const result = await collection.insertOne(doc)
      console.log({ result, doc, docs})
      docs.push(doc)
    },

    r() {
      return docs.map(doc => doc.string)
    },

    async u(oldStr, newStr) {
      const i = docs.findIndex(doc => doc.string == oldStr)
      if (i == -1) throw 'string not found'
      if (typeof newStr !== 'string') throw 'strings only'
      if (docs.some(doc => doc.string == newStr)) throw 'duplicate string'
      docs[i].string = newStr
      await collection.updateOne({ string: oldStr }, { $set: { string: newStr } })
    },

    async d(str) {
      const i = docs.findIndex(doc => doc.string == str)
      if (i == -1) throw 'string not found'
      docs.splice(i, 1)
      await collection.deleteOne({ string: str })
    }
  }
  return crud
}
module.exports = { prepareCRUD }