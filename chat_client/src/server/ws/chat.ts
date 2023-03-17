import type { Imessage, UserT } from '@/stores/type'
import io, { Socket } from 'socket.io-client'

export interface Idata<T> {
  type: string
  data: T
  status?: 'success' | 'fail'
}

interface Tlistener<T> {
  (data: Idata<T>): void
}

class Chat {
  private chat: Socket | null = null
  private id: string
  static instance: Chat | null = null
  private constructor(id: string) {
    // this.listenEvent<Imessage>('init', (data) => {
    //   console.log(data)
    // })
    this.id = id
  }

  public connect() {
    this.chat = io('http://localhost:3000', {
      path: '/chat',
      auth: {
        id: this.id
      }
    })
  }

  public listenEvent<T>(event: string, fn: Tlistener<T>) {
    this.chat?.on(event, fn)
  }
  public emitEvent<T>(event: string, data: T) {
    // const sendedData: Idata<T> = {
    //   type: event,
    //   data
    // }
    this.chat?.emit(event, data)
  }

  public close() {
    this.chat?.close()
  }

  private sendMessage(data: Imessage) {
    this.emitEvent('sendMessage', data)
  }

  static getInstance(id: string = '') {
    if (!Chat.instance) {
      Chat.instance = new Chat(id)
    }

    return Chat.instance
  }
}

export default Chat
