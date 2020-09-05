<div id="aplayer" bind:this="{playerContainer}"></div>

<script lang="ts">
  import { onMount } from 'svelte'
  import APlayer from 'aplayer'
  import 'aplayer/dist/APlayer.min.css'
  import type { Sound } from '../types'

  let playerContainer: HTMLElement
  let player

  function playerHandler(e: CustomEvent) {
    const d: Sound = e.detail
    const v = player.list.add({
      name: d.title,
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
      audio: [
        {
          url: 'https://static.suisei.moe/music/3444b6c806697ec6.m4a',
          name: 'NEXT COLOR PLANET',
          artist: '星街すいせい',
        },
      ],
    })
    window.addEventListener('player', playerHandler)
  })
</script>
