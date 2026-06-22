import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: [['html', { outputFile: 'src/test/html/index.html' }]],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/test/**', 'src/server.ts'],
      reportsDirectory: 'src/test/coverage',
    },
  },
})
