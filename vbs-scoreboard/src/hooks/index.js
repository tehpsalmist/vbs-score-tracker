import { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import pipe from 'callbag-pipe'
import throttle from 'callbag-lossless-throttle'
import forEach from 'callbag-for-each'
import { fromIPCEvent } from '../utilities'
import { EventEmitter } from 'events'

const emitter = new EventEmitter()

pipe(
  fromIPCEvent('new-score'),
  throttle(3500),
  forEach(event => emitter.emit('new-score', event))
)

export const useIPCRendererOn = (event, callback) => {
  useEffect(() => {
    ipcRenderer.on(event, callback)

    return () => ipcRenderer.removeListener(event, callback)
  }, [callback])
}

export const useThrottledScore = (callback) => {
  useEffect(() => {
    emitter.on('new-score', callback)

    return () => emitter.removeListener('new-score', callback)
  }, [callback])
}

let store = {}
let listeners = {}

const setStateForKey = key => newState => {
  // don't do anything if there is no new state provided
  if (newState !== undefined) {
    // update the store with the new state for the given key
    store = { ...store, [key]: newState }
  }

  // all all the listeners for this key to re-render dependent components
  listeners[key].forEach(listener => listener({}))
}

export const useStore = (key, initialState) => {
  // add the new key with its initial state if it doesn't exist already
  if (store[key] === undefined) {
    store = { ...store, [key]: initialState }
  }

  // create a new listener to trigger this component's re-render
  const newListener = useState()[1]

  useEffect(() => {
    // push the listener to the list of listeners for this key
    listeners[key] = listeners[key] || []
    listeners[key].push(newListener)

    // remove the listener for this component when unmounted
    return () => { listeners = listeners.filter(listener => listener !== newListener) }
  }, [])

  return [store[key], setStateForKey(key)]
}
