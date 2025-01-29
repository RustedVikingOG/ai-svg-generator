export interface IMessage {
  id: number
  text: string
  sender: 'user' | 'ai'
  timestamp: string
}

export interface IHistoryEntry {
  id: string
  code: string
  timestamp: string
  modelName: string
}

export interface IModel {
  label: string
  value: string
}
