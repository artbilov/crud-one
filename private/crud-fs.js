const { readFileSync, promises: { writeFile } } = require("fs")

const filePath = 'data/strings.json'
let strings = JSON.parse(readFileSync(filePath))

const crud = {
  async c(str) {
    if (typeof str !== 'string') throw 'strings only'
    if (strings.includes(str)) throw 'duplicate string'
    strings.push(str)
    await writeFile(filePath, JSON.stringify(strings, null, 2))
  },

  r() {
    const stringsClone = strings.slice()
    return stringsClone
  },

  async u(oldStr, newStr) {
    const i = strings.indexOf(oldStr)
    if (i == -1) throw 'string not found'
    if (typeof newStr !== 'string') throw 'strings only'
    if (strings.includes(newStr)) throw 'duplicate string'
    strings[i] = newStr
    await writeFile(filePath, JSON.stringify(strings, null, 2))
  },

  async d(str) {
    const i = strings.indexOf(str)
    if (i == -1) throw 'string not found'
    strings.splice(i, 1)
    await writeFile(filePath, JSON.stringify(strings, null, 2))
  }
}

module.exports = { crud }