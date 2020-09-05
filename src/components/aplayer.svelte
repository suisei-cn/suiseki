<div id="aplayer" bind:this="{playerContainer}"></div>

<script lang="ts">
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'
  import APlayer from 'aplayer'
  import 'aplayer/dist/APlayer.min.css'
  import type { Sound } from '../types'

  let playerContainer: HTMLElement
  let player

  function playerHandler(e: CustomEvent) {
    const d: Sound = e.detail
    const day = dayjs(d.datetime)
    const v = player.list.add({
      name: `${d.title} (${day.format('YYYY/MM/DD')})`,
      artist: d.artist,
      url: d.url,
    })
    player.list.switch(player.list.audios.length - 1)
    player.play()
    player.setMode('normal')
  }

  onMount(() => {
    player = new APlayer({
      container: playerContainer,
      fixed: true,
      audio: [],
    })
    window.addEventListener('player', playerHandler)
  })
</script>
