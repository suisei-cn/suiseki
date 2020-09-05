async function sleep(time: number) {
  return new Promise((x) => {
    setTimeout(x, time)
  })
}

export async function alwaysTry<T>(a: () => T | undefined): Promise<T> {
  while (true) {
    const k = a()
    if (k) return k
    await sleep(300)
  }
}
