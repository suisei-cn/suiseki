<!-- https://github.com/sveltejs/svelte/issues/3088#issuecomment-505785516 -->
<div class="portal-clone">
  <div bind:this="{ref}">
    <slot />
  </div>
</div>

<script lang="ts">
  // src/components/Portal.svelte
  import { onMount, onDestroy, getContext } from 'svelte'
  import { alwaysTry } from '../utils/utils'
  let target: HTMLElement
  let ref: HTMLElement
  let portal: HTMLElement

  onMount(async () => {
    target = await alwaysTry(() => {
      return getContext('timelines')
    })
    portal = document.createElement('div')
    portal.className = 'portal'
    target.appendChild(portal)
    portal.appendChild(ref)
  })

  onDestroy(() => {
    target.removeChild(portal)
  })
</script>

<style>
  .portal-clone {
    display: none;
  }
</style>
