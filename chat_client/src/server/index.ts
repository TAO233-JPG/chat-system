import * as api from './methods'

import Chat from '@/server/ws/chat'

export const chat = Chat.getInstance()

export default api
