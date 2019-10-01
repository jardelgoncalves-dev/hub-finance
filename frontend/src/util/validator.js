export const isEmail = (email) => {
  // eslint-disable-next-line
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
  return regex.test(email)
}

export const isRequired = (field) => {
  return field !== "" && field !== undefined && field !== null
}