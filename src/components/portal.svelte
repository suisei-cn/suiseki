<!-- https://github.com/sveltejs/svelte/issues/3088#issuecomment-505785516 -->
<div class="portal-clone">
  <div bind:this="{ref}">
    <slot />
  </div>
</div>

<script lang="ts">
  // src/components/Portal.svelte
  import { onMount, onDestroy } from 'svelte'
  import { alwaysTry, getTimelines } from '../utils/utils'
  let ref: HTMLElement
  let portal: HTMLElement

  onMount(async () => {
    portal = document.createElement('div')
    portal.className = 'portal'
    getTimelines().appendChild(portal)
    portal.appendChild(ref)
  })

  onDestroy(() => {
    getTimelines().removeChild(portal)
  })
</script>

<style>
  .portal-clone {
    display: none;
  }
</style>
