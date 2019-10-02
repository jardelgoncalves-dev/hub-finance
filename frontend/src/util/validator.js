export const isEmail = (email) => {
  // eslint-disable-next-line
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
  return regex.test(email)
}

export const isRequired = (field) => {
  return field !== undefined && field !== null && String(field).trim() !== ""
}

export const isNumber = (field) => {
  return !isNaN(field) && String(field).trim() !== "" && field !== null
}