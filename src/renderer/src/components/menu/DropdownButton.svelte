<script lang="ts">
  import type { Component } from 'svelte'

  let {
    clicked,
    name,
    icon = undefined,
    hotkey = undefined
  }: {
    clicked: () => void | undefined
    name: string
    icon?: Component | undefined
    hotkey?: string | undefined
  } = $props()
</script>

<button class="dropdown-button" onclick={clicked}>
  <span class="icon">
    {#if icon !== undefined}
      {@const ButtonIcon = icon}
      <ButtonIcon size={12} />
    {/if}
  </span>
  <span class="name">{name}</span>
  <span class="hotkey">{hotkey}</span>
  <span class="chev"></span>
</button>

<style>
  .dropdown-button {
    display: grid;
    grid-template-columns: 18px 1fr auto 12px;
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
</style>
