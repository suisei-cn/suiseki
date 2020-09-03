import type { Sound } from '../types'

export function categorizeSounds(
  sounds: Sound[]
): {
  [name: string]: Sound[]
} {
  const starList = {}
  for (const i of sounds) {
    if (!starList[i.title]) starList[i.title] = []
    starList[i.title].push(i)
  }
  return starList
}
