import './ui-image.js';

export default {
  title: 'Primitives/Media/Image',
  component: 'ui-image',
  parameters: {
    docs: {
      description: {
        component: 'A responsive image component with loading states, error handling, fallback support, and multiple fit modes.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'image-alt',
            enabled: true
          },
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: 'Loading behavior',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'lazy' }
      }
    },
    decoding: {
      control: 'select',
      options: ['async', 'auto', 'sync'],
      description: 'Decoding hint',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'async' }
      }
    },
    fit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'scale-down'],
      description: 'How the image should fit within its container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'cover' }
      }
    },
    srcset: {
      control: 'text',
      description: 'Responsive image sources',
      table: {
        type: { summary: 'string' }
      }
    },
    sizes: {
      control: 'text',
      description: 'Media conditions for responsive images',
      table: {
        type: { summary: 'string' }
      }
    },
    fallback: {
      control: 'text',
      description: 'Fallback image URL when main image fails to load',
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

// Template for creating image instances
const Template = (args) => {
  const image = document.createElement('ui-image');
  
  Object.keys(args).forEach(key => {
    if (args[key] !== undefined && args[key] !== '') {
      image.setAttribute(key, args[key]);
    }
  });
  
  return image;
};

// Sample images for stories
const SAMPLE_IMAGES = {
  landscape: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  portrait: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=800&fit=crop',
  square: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=600&fit=crop',
  small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  medium: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  large: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop'
};

// Individual stories
export const Default = Template.bind({});
Default.args = {
  src: SAMPLE_IMAGES.landscape,
  alt: 'Mountain landscape with lake reflection'
};

export const WithFallback = Template.bind({});
WithFallback.args = {
  src: 'https://invalid-url-that-will-fail.jpg',
  alt: 'Image that will fail to load',
  fallback: SAMPLE_IMAGES.landscape
};

export const LazyLoading = Template.bind({});
LazyLoading.args = {
  src: SAMPLE_IMAGES.landscape,
  alt: 'Lazy loaded mountain landscape',
  loading: 'lazy'
};

export const EagerLoading = Template.bind({});
EagerLoading.args = {
  src: SAMPLE_IMAGES.landscape,
  alt: 'Eager loaded mountain landscape',
  loading: 'eager'
};

// Fit modes - using constrained containers to show differences
const FitTemplate = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'width: 400px; height: 400px; border: 2px solid #ddd; border-radius: 8px; background: #f5f5f5; position: relative;';
  
  const image = document.createElement('ui-image');
  Object.keys(args).forEach(key => {
    if (args[key] !== undefined && args[key] !== '') {
      image.setAttribute(key, args[key]);
    }
  });
  image.style.cssText = 'width: 100%; height: 100%;';
  
  const label = document.createElement('div');
  label.textContent = `Fit: ${args.fit} (landscape image in square container)`;
  label.style.cssText = 'position: absolute; top: -30px; left: 0; font-size: 14px; color: #666; background: white; padding: 4px 8px; border-radius: 4px; border: 1px solid #ddd;';
  
  container.appendChild(image);
  container.appendChild(label);
  
  return container;
};

export const FitCover = FitTemplate.bind({});
FitCover.args = {
  src: SAMPLE_IMAGES.landscape,
  alt: 'Cover fit mode - fills container, may crop',
  fit: 'cover'
};

export const FitContain = FitTemplate.bind({});
FitContain.args = {
  src: SAMPLE_IMAGES.landscape,
  alt: 'Contain fit mode - fits entirely within container',
  fit: 'contain'
};

export const FitFill = FitTemplate.bind({});
FitFill.args = {
  src: SAMPLE_IMAGES.landscape,
  alt: 'Fill fit mode - stretches to fill container',
  fit: 'fill'
};

export const FitScaleDown = FitTemplate.bind({});
FitScaleDown.args = {
  src: SAMPLE_IMAGES.landscape,
  alt: 'Scale-down fit mode - like contain but never scales up',
  fit: 'scale-down'
};

// Responsive images
export const Responsive = Template.bind({});
Responsive.args = {
  src: SAMPLE_IMAGES.medium,
  alt: 'Responsive image',
  srcset: `${SAMPLE_IMAGES.small} 400w, ${SAMPLE_IMAGES.medium} 800w, ${SAMPLE_IMAGES.large} 1200w`,
  sizes: '(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px'
};

// Showcase stories
export const AllFitModes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem; max-width: 900px;';
  
  const header = document.createElement('div');
  header.innerHTML = '<h3 style="margin: 0 0 0.5rem 0;">Object-fit Comparison</h3><p style="margin: 0; color: #666; font-size: 14px;">Landscape image (4:3 aspect ratio) displayed in square containers (1:1 aspect ratio)</p>';
  container.appendChild(header);
  
  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;';
  
  const fitModes = [
    { mode: 'cover', description: 'Cover', details: 'Scales to fill container completely, crops excess' },
    { mode: 'contain', description: 'Contain', details: 'Scales to fit entirely within container, shows background' },
    { mode: 'fill', description: 'Fill', details: 'Stretches to fill container exactly, may distort aspect ratio' },
    { mode: 'scale-down', description: 'Scale-down', details: 'Like contain, but never scales larger than original size' }
  ];
  
  fitModes.forEach(({ mode, description, details }) => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 0.75rem;';
    
    const title = document.createElement('h4');
    title.textContent = description;
    title.style.cssText = 'margin: 0; font-size: 1rem; font-weight: 600; color: #333;';
    
    const subtitle = document.createElement('p');
    subtitle.textContent = details;
    subtitle.style.cssText = 'margin: 0; font-size: 0.875rem; color: #666; line-height: 1.4;';
    
    const imageContainer = document.createElement('div');
    imageContainer.style.cssText = 'width: 300px; height: 300px; border: 2px solid #ddd; border-radius: 8px; overflow: hidden; background: #f8f9fa; position: relative;';
    
    const image = document.createElement('ui-image');
    image.src = SAMPLE_IMAGES.landscape;
    image.alt = `Image with ${mode} fit mode`;
    image.fit = mode;
    image.style.cssText = 'width: 100%; height: 100%;';
    
    imageContainer.appendChild(image);
    section.appendChild(title);
    section.appendChild(subtitle);
    section.appendChild(imageContainer);
    grid.appendChild(section);
  });
  
  container.appendChild(grid);
  
  return container;
};

export const LoadingStates = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem; max-width: 600px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Loading States';
  container.appendChild(title);
  
  // Success state
  const successSection = document.createElement('div');
  const successTitle = document.createElement('h4');
  successTitle.textContent = 'Successful Load';
  successTitle.style.cssText = 'margin: 0 0 0.5rem 0;';
  
  const successImage = document.createElement('ui-image');
  successImage.src = SAMPLE_IMAGES.landscape;
  successImage.alt = 'Successfully loaded image';
  successImage.style.cssText = 'width: 300px; height: 200px;';
  
  successSection.appendChild(successTitle);
  successSection.appendChild(successImage);
  container.appendChild(successSection);
  
  // Error with fallback
  const fallbackSection = document.createElement('div');
  const fallbackTitle = document.createElement('h4');
  fallbackTitle.textContent = 'Error with Fallback';
  fallbackTitle.style.cssText = 'margin: 0 0 0.5rem 0;';
  
  const fallbackDescription = document.createElement('p');
  fallbackDescription.textContent = 'Main image URL is invalid, fallback image will be shown';
  fallbackDescription.style.cssText = 'margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #666;';
  
  const fallbackImage = document.createElement('ui-image');
  fallbackImage.src = 'https://invalid-url-will-fail.jpg';
  fallbackImage.alt = 'Image with fallback';
  fallbackImage.fallback = SAMPLE_IMAGES.square;
  fallbackImage.style.cssText = 'width: 300px; height: 200px;';
  
  fallbackSection.appendChild(fallbackTitle);
  fallbackSection.appendChild(fallbackDescription);
  fallbackSection.appendChild(fallbackImage);
  container.appendChild(fallbackSection);
  
  // Error without fallback
  const errorSection = document.createElement('div');
  const errorTitle = document.createElement('h4');
  errorTitle.textContent = 'Error without Fallback';
  errorTitle.style.cssText = 'margin: 0 0 0.5rem 0;';
  
  const errorDescription = document.createElement('p');
  errorDescription.textContent = 'Image fails to load and no fallback is provided';
  errorDescription.style.cssText = 'margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #666;';
  
  const errorImage = document.createElement('ui-image');
  errorImage.src = 'https://another-invalid-url.jpg';
  errorImage.alt = 'Image that will fail';
  errorImage.style.cssText = 'width: 300px; height: 200px; border: 2px dashed #ddd;';
  
  errorSection.appendChild(errorTitle);
  errorSection.appendChild(errorDescription);
  errorSection.appendChild(errorImage);
  container.appendChild(errorSection);
  
  return container;
};

export const ResponsiveGallery = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; max-width: 800px;';
  
  const images = [
    { src: SAMPLE_IMAGES.landscape, alt: 'Mountain landscape' },
    { src: SAMPLE_IMAGES.portrait, alt: 'Forest portrait' },
    { src: SAMPLE_IMAGES.square, alt: 'Lake view' },
    { src: SAMPLE_IMAGES.landscape, alt: 'Another landscape' },
    { src: SAMPLE_IMAGES.portrait, alt: 'Another portrait' },
    { src: SAMPLE_IMAGES.square, alt: 'Another square' }
  ];
  
  images.forEach(({ src, alt }) => {
    const image = document.createElement('ui-image');
    image.src = src;
    image.alt = alt;
    image.loading = 'lazy';
    image.fit = 'cover';
    image.style.cssText = 'width: 100%; height: 200px; border-radius: 0.375rem; overflow: hidden;';
    container.appendChild(image);
  });
  
  return container;
};

export const AccessibilityTest = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem; max-width: 600px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Accessibility Features';
  container.appendChild(title);
  
  // Good alt text
  const goodAltSection = document.createElement('div');
  const goodAltTitle = document.createElement('h4');
  goodAltTitle.textContent = 'Descriptive Alt Text';
  goodAltTitle.style.cssText = 'margin: 0 0 0.5rem 0;';
  
  const goodAltDescription = document.createElement('p');
  goodAltDescription.textContent = 'Image with meaningful, descriptive alt text for screen readers';
  goodAltDescription.style.cssText = 'margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #666;';
  
  const goodAltImage = document.createElement('ui-image');
  goodAltImage.src = SAMPLE_IMAGES.landscape;
  goodAltImage.alt = 'Serene mountain lake reflecting snow-capped peaks under a clear blue sky';
  goodAltImage.style.cssText = 'width: 300px; height: 200px;';
  
  goodAltSection.appendChild(goodAltTitle);
  goodAltSection.appendChild(goodAltDescription);
  goodAltSection.appendChild(goodAltImage);
  container.appendChild(goodAltSection);
  
  // Decorative image
  const decorativeSection = document.createElement('div');
  const decorativeTitle = document.createElement('h4');
  decorativeTitle.textContent = 'Decorative Image';
  decorativeTitle.style.cssText = 'margin: 0 0 0.5rem 0;';
  
  const decorativeDescription = document.createElement('p');
  decorativeDescription.textContent = 'Decorative image with empty alt attribute (will be ignored by screen readers)';
  decorativeDescription.style.cssText = 'margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #666;';
  
  const decorativeImage = document.createElement('ui-image');
  decorativeImage.src = SAMPLE_IMAGES.square;
  decorativeImage.alt = '';
  decorativeImage.style.cssText = 'width: 200px; height: 200px;';
  
  decorativeSection.appendChild(decorativeTitle);
  decorativeSection.appendChild(decorativeDescription);
  decorativeSection.appendChild(decorativeImage);
  container.appendChild(decorativeSection);
  
  return container;
};

// Interactive story with event handling
export const Interactive = Template.bind({});
Interactive.args = {
  src: SAMPLE_IMAGES.landscape,
  alt: 'Interactive image with event handling',
  fallback: SAMPLE_IMAGES.square
};

Interactive.play = async ({ canvasElement }) => {
  const image = canvasElement.querySelector('ui-image');
  
  // Add event listeners for demonstration
  image.addEventListener('ui-image-load', (event) => {
    console.log('Image loaded:', event.detail);
  });
  
  image.addEventListener('ui-image-error', (event) => {
    console.log('Image error:', event.detail);
  });
  
  // Add visual feedback container
  const feedback = document.createElement('div');
  feedback.style.cssText = 'margin-top: 1rem; padding: 0.5rem; background: #f5f5f5; border-radius: 0.375rem; font-size: 0.875rem;';
  feedback.textContent = 'Check browser console for image events';
  
  canvasElement.appendChild(feedback);
};

// Performance story
export const Performance = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem; max-width: 800px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Performance Features';
  container.appendChild(title);
  
  // Lazy loading section
  const lazySection = document.createElement('div');
  const lazyTitle = document.createElement('h4');
  lazyTitle.textContent = 'Lazy Loading';
  lazyTitle.style.cssText = 'margin: 0 0 1rem 0;';
  
  const lazyDescription = document.createElement('p');
  lazyDescription.textContent = 'Images below the fold are loaded only when they come into view';
  lazyDescription.style.cssText = 'margin: 0 0 1rem 0; color: #666;';
  
  const spacer = document.createElement('div');
  spacer.style.cssText = 'height: 100vh; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0); display: flex; align-items: center; justify-content: center; color: #666;';
  spacer.textContent = 'Scroll down to see lazy-loaded images';
  
  const lazyGrid = document.createElement('div');
  lazyGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem;';
  
  // Create multiple lazy-loaded images
  for (let i = 0; i < 6; i++) {
    const lazyImage = document.createElement('ui-image');
    lazyImage.src = `${SAMPLE_IMAGES.landscape}?v=${i}`;
    lazyImage.alt = `Lazy loaded image ${i + 1}`;
    lazyImage.loading = 'lazy';
    lazyImage.style.cssText = 'width: 100%; height: 150px;';
    lazyGrid.appendChild(lazyImage);
  }
  
  lazySection.appendChild(lazyTitle);
  lazySection.appendChild(lazyDescription);
  lazySection.appendChild(spacer);
  lazySection.appendChild(lazyGrid);
  container.appendChild(lazySection);
  
  return container;
};