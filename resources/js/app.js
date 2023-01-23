import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: name => {
    // const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return import(`./Pages/${name}`).then(module => module.default);
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
