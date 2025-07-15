import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'coverage/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.stories.*',
        'src/stories/**',
        '**/*.test.*',
        '**/*.spec.*',
        '**/index.ts',
        '**/*.html',
        '**/*.css',
        'src/main.ts',
        'src/counter.ts',
        'src/style.css',
        'src/components/Button/**',
        'src/components/Header/**'
      ],
      include: [
        'src/**/*.ts',
        'src/**/*.js'
      ],
      all: true,
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  },
});