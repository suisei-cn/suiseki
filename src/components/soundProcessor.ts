import type { Sound, StarList } from '../types'

export function categorizeSounds(sounds: Sound[]): StarList {
  const starList: StarList = {}
  for (const i of sounds) {
    if (!starList[i.title]) starList[i.title] = []
    starList[i.title].push(i)
  }
  return starList
}
