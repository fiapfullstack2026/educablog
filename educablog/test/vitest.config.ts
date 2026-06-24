import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: [
      ['html', { outputFile: '../educablog/test/report/coverage/index.html' }],
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/test/**', 'src/server.ts'],
      reportsDirectory: '../educablog/test/report/coverage',
    },
  },
})
