import type { Component } from 'svelte'
import type { EditorGame } from '../editorGame'
import { HotkeyHandlingResult } from '../systems/hotkey/hotkeyHandlingResult'
import { HotkeyTool } from '../systems/hotkey/hotkeyTool'
import { Save } from '@lucide/svelte'

/**
 * Saves the realm.
 */
export class SaveTool extends HotkeyTool {
  constructor() {
    super({
      key: 'KeyS',
      modifiers: ['ControlLeft']
    })
  }

  get name(): string {
    return 'tool.save'
  }

  get icon(): Component {
    return Save
  }

  available(game: EditorGame): boolean {
    return game !== undefined
  }

  tick(game: EditorGame): HotkeyHandlingResult {
    game.saveLevel()

    return HotkeyHandlingResult.FINISHED
  }
}
