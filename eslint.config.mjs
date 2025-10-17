import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'no-inline-comments': 'error',
      'no-warning-comments': [
        'error',
        {
          terms: ['todo', 'fixme', 'xxx', 'note', 'hack'],
          location: 'anywhere',
        },
      ],
      'spaced-comment': [
        'error',
        'always',
        {
          block: {
            balanced: true,
          },
        },
      ],

      'capitalized-comments': [
        'error',
        'always',
        {
          ignoreConsecutiveComments: true,
        },
      ],
      'multiline-comment-style': ['error', 'starred-block'],
    },
  }
)
