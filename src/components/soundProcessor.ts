import type { Sound } from '../types'

export function categorizeSounds(
  sounds: Sound[]
): {
  [name: string]: Sound[]
} {
  const starList = {}
  for (const i of sounds) {
    const id = encodeURIComponent(i.title) + '|' + encodeURIComponent(i.artist)
    if (!starList[id]) starList[id] = []
    starList[id].push(i)
  }
  return starList
}
