module.exports = {
  'extends': 'airbnb',
  installedESLint: true,
  env: {
    browser: true,
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import'
  ],
  // Add JSX-control-statement define
  globals: {
    If: true,
    Choose: true,
    When: true,
    Otherwise: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
};
