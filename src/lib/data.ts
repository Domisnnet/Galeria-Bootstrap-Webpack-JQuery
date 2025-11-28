import type { Framework, ComponentInfo } from './types';

export const FRAMEWORKS: Framework[] = ['Bootstrap', 'Webpack', 'JQuery'];

const components: Record<Framework, ComponentInfo[]> = {
  Bootstrap: [
    { id: 'bs-1', name: 'Grid System', description: 'Powerful mobile-first flexbox grid to build layouts of all shapes and sizes.', documentationLink: 'https://getbootstrap.com/docs/5.3/layout/grid/', imageId: 'bootstrap-1' },
    { id: 'bs-2', name: 'Buttons', description: 'Use custom button styles for actions in forms, dialogs, and more.', documentationLink: 'https://getbootstrap.com/docs/5.3/components/buttons/', imageId: 'bootstrap-2' },
    { id: 'bs-3', name: 'Cards', description: 'A flexible and extensible content container with multiple variants and options.', documentationLink: 'https://getbootstrap.com/docs/5.3/components/card/', imageId: 'bootstrap-3' },
    { id: 'bs-4', name: 'Navbar', description: 'A responsive navigation header that can expand or collapse.', documentationLink: 'https://getbootstrap.com/docs/5.3/components/navbar/', imageId: 'bootstrap-4' },
    { id: 'bs-5', name: 'Forms', description: 'Examples and usage guidelines for form controls, layout options, and custom components.', documentationLink: 'https://getbootstrap.com/docs/5.3/forms/overview/', imageId: 'bootstrap-5' },
    { id: 'bs-6', name: 'Modals', description: 'Add dialogs to your site for lightboxes, user notifications, or completely custom content.', documentationLink: 'https://getbootstrap.com/docs/5.3/components/modal/', imageId: 'bootstrap-6' },
  ],
  Webpack: [
    { id: 'wp-1', name: 'Loaders', description: 'Transform files from a different language (like TypeScript) to JavaScript.', documentationLink: 'https://webpack.js.org/loaders/', imageId: 'webpack-1' },
    { id: 'wp-2', name: 'Plugins', description: 'Hook into the webpack build process to perform a wide range of tasks.', documentationLink: 'https://webpack.js.org/plugins/', imageId: 'webpack-2' },
    { id: 'wp-3', name: 'Dev Server', description: 'Provides live reloading during development.', documentationLink: 'https://webpack.js.org/configuration/dev-server/', imageId: 'webpack-3' },
    { id: 'wp-4', name: 'Code Splitting', description: 'Split your code into various bundles which can then be loaded on demand.', documentationLink: 'https://webpack.js.org/guides/code-splitting/', imageId: 'webpack-4' },
    { id: 'wp-5', name: 'Asset Management', description: 'Bundle any static asset, not just JavaScript.', documentationLink: 'https://webpack.js.org/guides/asset-management/', imageId: 'webpack-5' },
    { id: 'wp-6', name: 'Module Federation', description: 'Allows a JavaScript application to dynamically load code from another application.', documentationLink: 'https://webpack.js.org/concepts/module-federation/', imageId: 'webpack-6' },
  ],
  JQuery: [
    { id: 'jq-1', name: 'Selectors', description: 'Find HTML elements based on their name, id, classes, and more.', documentationLink: 'https://api.jquery.com/category/selectors/', imageId: 'jquery-1' },
    { id: 'jq-2', name: 'DOM Manipulation', description: 'Get and set DOM elements, and manipulate them with methods like .html(), .text(), and .append().', documentationLink: 'https://api.jquery.com/category/manipulation/', imageId: 'jquery-2' },
    { id: 'jq-3', name: 'Event Handling', description: 'Handle events like clicks, mouse movements, and keyboard input with .on() and .off().', documentationLink: 'https://api.jquery.com/category/events/', imageId: 'jquery-3' },
    { id: 'jq-4', name: 'Effects', description: 'Animate elements with methods like .fadeIn(), .slideUp(), and .animate().', documentationLink: 'https://api.jquery.com/category/effects/', imageId: 'jquery-4' },
    { id: 'jq-5', name: 'AJAX', description: 'Perform asynchronous HTTP (Ajax) requests with methods like $.ajax() and $.get().', documentationLink: 'https://api.jquery.com/category/ajax/', imageId: 'jquery-5' },
    { id: 'jq-6', name: 'UI Widgets', description: 'A curated set of user interface interactions, effects, widgets, and themes.', documentationLink: 'https://jqueryui.com/', imageId: 'jquery-6' },
  ],
};

export const getComponentsForFramework = (framework: Framework): ComponentInfo[] => {
  return components[framework] || [];
};
