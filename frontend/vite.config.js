// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })
// frontend/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// defineConfig tells Vite how to build and serve your React project
export default defineConfig({
  plugins: [
    react(),          // lets Vite understand JSX files
    tailwindcss(),    // processes Tailwind classes at build time
  ],
  server: {
    port: 5173,       // the port your frontend runs on locally
  },
})