/**
 * Converts a key name to its display name.
 * @param key The key.
 */
export const keyNameToDisplayName = (key: string): string => {
  if (key.startsWith('Control')) {
    return 'Ctrl'
  }

  if (key.startsWith('Shift')) {
    return 'Shift'
  }

  if (key.startsWith('Alt')) {
    return 'Alt'
  }

  return key.replace('Key', '')
}
