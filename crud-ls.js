const crud = (() => {
  const key = 'crud_strings'
  let strings = JSON.parse(localStorage.getItem(key)) || []

  onstorage = e => {
    if (e.key == key) strings = JSON.parse(e.newValue) || []
    crud.onchange?.()
  }

  const crud = {
    c(str) {
      if (typeof str !== 'string') throw 'strings only'
      if (strings.includes(str)) throw 'duplicate string'
      strings.push(str)
      localStorage.setItem(key, JSON.stringify(strings))
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
      localStorage.setItem(key, JSON.stringify(strings))
    },

    d(str) {
      const i = strings.indexOf(str)
      if (i == -1) throw 'string not found'
      strings.splice(i, 1)
      localStorage.setItem(key, JSON.stringify(strings))
    }
  }
  return crud
})()