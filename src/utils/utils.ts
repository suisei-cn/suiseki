export async function sleep(time: number) {
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

export function getTimelines(): HTMLElement | undefined {
  if (!window.timelines) window.timelines = document.querySelector('timelines')
  return window.timelines
}

type ExportVarFunction = (name: string) => string

export function generateExportVarFunction(
  baseElement: HTMLElement
): ExportVarFunction {
  return (name: string) =>
    getComputedStyle(baseElement).getPropertyValue('--' + name.replace('$', ''))
}

export function pxify(px: string): number {
  return Number(px.replace('px', ''))
}
