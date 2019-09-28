
export default class Validator {
  constructor (data = {}, messages = {}) {
    this.errors = {}
    this._run(data, messages)
  }

  required (variable, key, message) {
    if (variable === undefined || variable === null || variable.toString().trim() === '') {
      this._pushMessageErrorArray(key, message, 'Este campo é obrigatório!')
    }
  }

  email (variable, key, message) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (variable === undefined || !regex.test(variable) ) {
      this._pushMessageErrorArray(key, message, 'Email inválido!')
    }
  }


  number (variable, key, message) {
    if (isNaN(variable)) {
      this._pushMessageErrorArray(key, message, 'Este campo aceita apenas numeros!')
    }
  }

  boolean (variable, key, message) {
    if (variable === undefined || !validator.isBoolean(variable)) {
      this._pushMessageErrorArray(key, message, 'Este campo aceita apenas true ou false')
    }
  }

  hasError () {
    return Object.keys(this.errors).length > 0
  }

  hasKeyError (key) {
    return Object.keys(this.errors[key]).length > 0
  }

  firstKeyError (key) {
    return this.errors[key][0]
  }

  lastKeyError (key) {
    const len = Object.keys(this.errors[key]).length
    return this.errors[key][len - 1]
  }

  _pushMessageErrorArray (key, message, defaultMessage) {
    const [nameKey] = this._explode('.', key)
    if (!Array.isArray(this.errors[nameKey])) {
      this.errors[nameKey] = []
    }
    this.errors[nameKey].push(message[key] || defaultMessage)
  }

  _getMessageCorrect (messages = {}, key) {
    try {
      return messages[key]
    } catch (error) {
      throw new Error('key not found!')
    }
  }

  _explode (separator = ' ', value) {
    return value.split(separator)
  }

  _run (datas = {}, messages = {}) {
    Object.keys(datas).map(key => {
      const [, method] = this._explode('.', key)
      this._getMessageCorrect(messages, key)
      this[method](datas[key], key, messages)
    })
  }
}