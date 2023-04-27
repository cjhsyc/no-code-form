import { createPinia } from 'pinia'

const pinia = createPinia()

pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state))
  store.$reset = () => {
    store.$patch(initialState)
  }
})

export * from './designer'
export * from './home'
export * from './user'
export { pinia }
