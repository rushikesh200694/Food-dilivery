import { io } from 'socket.io-client'

const SERVER_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : ""

let socketInstance = null

export const initSocket = () => {
  if (socketInstance) {
    return socketInstance
  }
  
  socketInstance = io(SERVER_URL, { withCredentials: true })
  return socketInstance
}

export const getSocket = () => {
  return socketInstance
}

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect()
    socketInstance = null
  }
}

export const emitSocketEvent = (event, data) => {
  if (socketInstance) {
    socketInstance.emit(event, data)
  }
}

export const onSocketEvent = (event, callback) => {
  if (socketInstance) {
    socketInstance.on(event, callback)
  }
}

export const offSocketEvent = (event, callback) => {
  if (socketInstance) {
    socketInstance.off(event, callback)
  }
}
