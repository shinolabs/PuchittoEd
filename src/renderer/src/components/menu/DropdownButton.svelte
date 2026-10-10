<script lang="ts">
  import type { Component } from 'svelte'
  import type { ToolTreeNode } from '../../editor/systems/hotkey/hotkeyToolRegistrar'
  import RecursiveMenuButton from './RecursiveMenuButton.svelte'
  import { ChevronRight } from '@lucide/svelte'

  let {
    clicked,
    name,
    icon = undefined,
    hotkey = undefined,
    children = undefined
  }: {
    clicked: () => void | undefined
    name: string
    icon?: Component | undefined
    hotkey?: string | undefined
    children?: ToolTreeNode[] | undefined
  } = $props()

  const isDropdown = $derived(children !== undefined)
  let unfolded = $state(false)

  const onmouseover = (): void => {
    if (!isDropdown) {
      return
    }

    unfolded = true
  }

  const onmouseleave = (): void => {
    if (!isDropdown) {
      return
    }

    unfolded = false
  }

  const onfocus = (): void => {}
</script>

<button class="dropdown-button" onclick={clicked} {onmouseover} {onmouseleave} {onfocus}>
  <span class="icon">
    {#if icon !== undefined}
      {@const ButtonIcon = icon}
      <ButtonIcon size={12} />
    {/if}
  </span>
  <span class="name">{name}</span>
  {#if children !== undefined}
    <span class="chev">
      <ChevronRight size={12} />
    </span>
    <div class="dropdown" class:open={unfolded}>
      {#each children as child (child.name)}
        <RecursiveMenuButton node={child} />
      {/each}
    </div>
  {:else}
    <span class="hotkey">{hotkey}</span>
  {/if}
</button>

<style>
  .dropdown-button {
    position: relative;
    display: grid;
    grid-template-columns: 18px 1fr auto;
    align-items: center;
    background: none;
    border: none;
    gap: 8px;
    height: 26px;
    padding: 0 8px 0 6px;
    border-radius: 4px;
    color: var(--text-main);
    cursor: pointer;
    font-size: 12px;
    white-space: nowrap;
    text-align: left;
  }

  .dropdown-button:hover {
    background: var(--bg-hover);
  }

  .dropdown-button .icon {
    display: flex;
    align-content: center;
    color: #ffffffcc;
  }

  .dropdown-button:hover .icon {
    color: var(--accent-hover);
  }

  .dropdown-button:hover .name {
    color: var(--text-light);
  }

  .dropdown-button .hotkey {
    color: var(--text-muted);
    padding-left: 18px;
    font-size: 11px;
  }

  .dropdown {
    display: none;
    flex-direction: column;
    position: absolute;
    top: -5px;
    left: calc(100% + 2px);
    min-width: 210px;
    background: var(--bg-panel);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    min-width: 220px;
    z-index: 99999;
    padding: 4px;
  }

  .dropdown.open {
    display: flex;
  }
</style>
