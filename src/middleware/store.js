import objectpath from 'objectpath'

export default ({ initialState }) => (recycle) => {
  const store = initialState || {}

  recycle.on('componentInit', (component) => {
    const storePath = parsePath(component.get('storePath'))
    const componentInitialState = component.get('initialState')
    if (storePath) {
      if (componentInitialState) {
        if (getByPath(storePath, store)) {
          const pathStr = storePath.join('.')
          throw new Error(`'${pathStr}' is already defined. Could not use ${component.getName()}'s initialState. Consider defining it in store.`)
        }
        setByPath(storePath, componentInitialState, store)
      }
      component.set('initialState', getByPath(storePath, store))
    }
  })

  recycle.on('componentUpdated', (state, action, component) => {
    if (action && action.fromStore) {
      return
    }
    const storePath = parsePath(component.get('storePath'))
    if (storePath) {
      setByPath(storePath, state, store)
      recycle.getAllComponents()
        .filter(c => c !== component)
        .filter(c => shouldUpdate(storePath, parsePath(c.get('storePath'))))
        .map(c => c.setState(getByPath(parsePath(c.get('storePath')), store), { fromStore: true }))
    }
  })
}

export function getByPath(parts, current) {
  for (let i = 0; i < parts.length; ++i) {
    if (current[parts[i]] === undefined) {
      return undefined
    }
    current = current[parts[i]]
  }
  return current
}

export function setByPath(path, value, current) {
  path.forEach((i, index) => {
    if (index === path.length - 1) {
      current[i] = value
      return
    }
    if (!current[i]) {
      current[i] = {}
    }
    current = current[i]
  })
}

export function parsePath(path) {
  if (typeof path === 'string') {
    return objectpath.parse(path)
  }
  return path
}

export function shouldUpdate(sourcePath, targetPath) {
  if (!targetPath) {
    return false
  }
  if (targetPath[0] !== sourcePath[0]) {
    return false
  }
  return true
}
