
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    base: '/5904project-team3/',
    build: {
      target: 'esnext',
      outDir: 'docs', // 打包输出到 docs 目录，方便 GitHub Pages 使用
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/eff35c8ee306882ac1ea1d436efaa31b2f9e201d.png': path.resolve(__dirname, './src/assets/eff35c8ee306882ac1ea1d436efaa31b2f9e201d.png'),
        'figma:asset/d72bca1cc30c1e676d9a5f947093ee61a8023c50.png': path.resolve(__dirname, './src/assets/d72bca1cc30c1e676d9a5f947093ee61a8023c50.png'),
        'figma:asset/d37e48f9092bbcf8e511372c05e17483a45c522b.png': path.resolve(__dirname, './src/assets/d37e48f9092bbcf8e511372c05e17483a45c522b.png'),
        'figma:asset/c34cafb04a9bc0944013b0ca4048a7b2bb8e31ba.png': path.resolve(__dirname, './src/assets/c34cafb04a9bc0944013b0ca4048a7b2bb8e31ba.png'),
        'figma:asset/9c1fb7d9d9db690d97bb417070ac43ffa09c8467.png': path.resolve(__dirname, './src/assets/9c1fb7d9d9db690d97bb417070ac43ffa09c8467.png'),
        'figma:asset/32ad784bc5ca18ac5c2735a081f537b64bb0594f.png': path.resolve(__dirname, './src/assets/32ad784bc5ca18ac5c2735a081f537b64bb0594f.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src'),
      },
    },
    
    server: {
      port: 3000,
      open: true,
    },
  });