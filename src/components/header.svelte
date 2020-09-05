<header id="headerContainer">
  <div id="header">
    <div>Suiseki <small>/ 彗跡</small></div>
    <div class="urls">
      <a href="https://twitter.com/suisei_hosimati"><i class="icon-twitter"></i></a>
      <a href="https://www.youtube.com/channel/UC5CwaMl1eIgY8h02uZw7u8A"><i
          class="icon-youtube"
        ></i></a>
      <a href="https://github.com/suisei-cn/suiseki"><i
          class="icon-github1"
        ></i></a>
    </div>
    <input
      id="inputFilter"
      type="text"
      placeholder="Filter by title/artist..."
      bind:value="{titleFilter}"
      on:input="{updateFilter}"
    />
  </div>
</header>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  let titleFilter: string = ''

  const dispatch = createEventDispatcher()

  function updateFilter() {
    dispatch('changed', { filter: titleFilter })
  }

  onMount(() => {
    const q = new URL(String(document.location)).searchParams.get('q')
    if (q) {
      titleFilter = q
      updateFilter()
    }
  })
</script>

<style lang="scss">
  @import '../styles/variables.scss';
  @import '../styles/fontface.scss';

  #headerContainer {
    background: $header-background;
    display: flex;
    overflow-y: scroll;
    width: 100vw;
  }

  #header {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-size: 2rem;
    height: $header-height;
    letter-spacing: 0.1rem;
    padding: 4px 8px;
    text-transform: uppercase;

    & > * {
      flex-shrink: 0;
    }
  }

  .urls {
    margin: 0 5px;

    a {
      color: $header-icon-color;
      font-size: 0.7em;
      margin: 0 3px;
      text-decoration: none;
    }
  }

  #inputFilter {
    margin: 0 14px;
  }
</style>
