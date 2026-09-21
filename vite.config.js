import { copyFileSync, mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages has no server that can send /panther or /about to the app, so a direct visit would be a 404.
// After the build, this copies the app's index.html into a folder for each address (dist/panther/index.html and so on).
// The case addresses come from the id of each file in src/cases, so a new case gets its own address automatically.
function addressPages() {
  return {
    name: 'address-pages',
    apply: 'build',
    closeBundle() {
      const casesDir = 'src/cases'
      const caseIds = readdirSync(casesDir)
        .filter((file) => file.endsWith('.js') && file !== 'index.js')
        .map((file) => readFileSync(join(casesDir, file), 'utf8').match(/^\s*id:\s*'([^']+)'/m)?.[1])
        .filter(Boolean)

      for (const address of ['about', ...caseIds]) {
        mkdirSync(join('dist', address), { recursive: true })
        copyFileSync(join('dist', 'index.html'), join('dist', address, 'index.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), addressPages()],
  base: '/',
})
