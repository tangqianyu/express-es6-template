export function getDefinedObj(o) {
  let temp = {}
  for (let key in o) {
    if (!!o[key]) {
      temp = {
        ...temp,
        [key]: o[key]
      }
    }
  }
  return temp
}