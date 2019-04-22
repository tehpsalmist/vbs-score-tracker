import { useEffect } from 'react'
import { ipcRenderer } from 'electron'

export const useIPCRendererOn = (event, callback) => {
  useEffect(() => {
    ipcRenderer.on(event, callback)

    return () => ipcRenderer.removeListener(event, callback)
  }, [callback])
}
