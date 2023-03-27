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
  private id: string = ''
  static instance: Chat | null = null
  private constructor() {}

  public connect(id: string | undefined) {
    if (!id) {
      console.error('connet id is undefined')
      return
    }
    this.id = id
    if (this.chat) {
      this.chat.close()
    }

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
    this.chat = null
    console.log('chat close!')
  }

  static getInstance() {
    if (!Chat.instance) {
      Chat.instance = new Chat()
    }

    return Chat.instance
  }
}

export default Chat
