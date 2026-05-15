/**
 * Shared fixture data for the LiveMail email UI.
 * Used by EmailInbox, EmailContent, and EmailUrlClick panels
 * so the sidebar/folder data stays consistent across all three.
 */

export const LIVEMAIL_BRAND_COLOR = '#0ea5e9'

export const FOLDERS = [
  { name: 'Inbox',      count: 20   },
  { name: 'Starred',    count: null },
  { name: 'Important',  count: null },
  { name: 'Sent Email', count: 36   },
  { name: 'Drafts',     count: 2    },
  { name: 'Trash',      count: null },
] as const

export const LABELS = ['Personal', 'Work', 'Friends', '+ Add'] as const
