import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes the build work under https://yordank.github.io/karparov/
export default defineConfig({
  base: './',
  plugins: [react()],
});
