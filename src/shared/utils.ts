export const getRnd = (except: number[]) => {
  let rnd = Math.floor(Math.random() * 10 + 1) // 1~10

  while (except.includes(rnd)) {
    rnd = Math.floor(Math.random() * 10 + 1)
  }

  return rnd
}

export const getRndInRange = (min: number, max: number, except: number[]) => {
  let rnd = Math.floor(Math.random() * (max - min + 1) + min)

  while (except.includes(rnd)) {
    rnd = Math.floor(Math.random() * (max - min + 1) + min)
  }

  return rnd
}

export const numberWithSpaces = (x: number) => {
  return x.toString().replace(/\B(?=(\d{1})+(?!\d))/g, " ")
}
