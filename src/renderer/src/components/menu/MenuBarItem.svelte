<script lang="ts">
  import { menuBarState } from '../../state/menuBarState.svelte'

  let { label }: { label: string } = $props()

  let isOpen = $derived(menuBarState.selected === label)

  const onclick = (e: MouseEvent): void => {
    if (menuBarState.selected !== undefined) {
      menuBarState.selected = undefined
    } else {
      console.log(`selected ${label}`)
      menuBarState.selected = label
    }

    e.stopPropagation()
  }

  const onmouseover = (e: MouseEvent): void => {
    if (menuBarState.selected === undefined) {
      return
    }

    menuBarState.selected = label
  }

  const onfocus = (e: FocusEvent): void => {
    void e // todo
  }

  const onkeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      menuBarState.selected = label
    } else if (e.key === 'Escape') {
      menuBarState.selected = undefined
    }
  }
</script>

<svelte:window onclick={() => (menuBarState.selected = undefined)} />

<div
  class="menu-item"
  role="menuitem"
  tabindex="0"
  class:open={isOpen}
  {onfocus}
  {onclick}
  {onmouseover}
  {onkeydown}
>
  {label}
  <div class="dropdown" class:open={isOpen}>
    <slot></slot>
  </div>
</div>

<style>
  .menu-item {
    padding: 4px 10px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
  }

  .menu-item:hover {
    background: var(--bg-hover);
  }

  .menu-item.open {
    background: var(--bg-hover);
  }

  .dropdown {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--bg-panel);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    min-width: 220px;
    z-index: 5;
    padding: 4px 0;
  }

  .dropdown.open {
    display: flex;
  }
</style>
