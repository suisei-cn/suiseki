type SideEffectFunc = (...args: any[]) => void

export default function throttle(
  fun: SideEffectFunc,
  time: number
): SideEffectFunc {
  let timeout = undefined

  return (...args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fun(...args)
      timeout = undefined
    }, time)
  }
}
