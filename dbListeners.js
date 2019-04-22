module.exports = (store, keys, cbFactory) => {
  keys.forEach(key => {
    store.onDidChange(key, cbFactory(key))
  })
}
