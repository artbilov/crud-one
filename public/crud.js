const crud = (() => {
  const strings = []

  return {
    c(str) {
      if (typeof str !== 'string') throw 'strings only'
      if (strings.includes(str)) throw 'duplicate string'
      strings.push(str)
    },

    r() {
      const stringsClone = strings.slice()
      return stringsClone
    },

    u(oldStr, newStr) {
      const i = strings.indexOf(oldStr)
      if (i == -1) throw 'string not found'
      if (typeof newStr !== 'string') throw 'strings only'
      if (strings.includes(newStr)) throw 'duplicate string'
      strings[i] = newStr
    },

    d(str) {
      const i = strings.indexOf(str)
      if (i == -1) throw 'string not found'
      strings.splice(i, 1)

    }
  }
})()

if (typeof module !== 'undefined') module.exports = { crud }
