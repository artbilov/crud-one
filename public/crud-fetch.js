const crud = (() => {

  return {
    async c(str) {
      if (typeof str !== 'string') throw 'strings only'

      const url = '/api/create'
      const init = { method: 'POST', headers: { 'Content-Type': 'text/json' }, body: JSON.stringify({ str }) }
      const response = await fetch(url, init)

      if (!response.ok) {
        const { error } = await response.json()
        throw error
      }
    },

    async r() {
      const url = '/api/read'
      const response = await fetch(url)
      const strings = await response.json()
      return strings
    },

    async u(oldStr, newStr) {
      if (typeof oldStr !== 'string') throw 'strings only'
      if (typeof newStr !== 'string') throw 'strings only'

      const url = '/api/update'
      const init = { method: 'PUT', headers: { 'Content-Type': 'text/json' }, body: JSON.stringify({ oldStr, newStr }) }
      const response = await fetch(url, init)

      if (!response.ok) {
        const { error } = await response.json()
        throw error
      }
    },

    async d(str) {
      if (typeof str !== 'string') throw 'strings only'

      const url = '/api/delete'
      const init = { method: 'DELETE', headers: { 'Content-Type': 'text/json' }, body: JSON.stringify({ str }) }
      const response = await fetch(url, init)

      if (!response.ok) {
        const { error } = await response.json()
        throw error
      }
    }
  }
})()