import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globalSetup: ['tests/globalSetup.ts'],
    include: ['tests/**/*.{test,spec}.ts'],
    coverage: {
      reporter: ['html'],
      reportsDirectory: 'tests/coverage',
      include: ['src/application/usecases/**/*.{ts,tsx}'],
    },
  },
});
