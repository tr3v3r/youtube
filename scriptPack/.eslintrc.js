module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },

  "env": {
        "browser": true,
        "es6": true
    },
 
  extends: 'airbnb',  
 
  'rules': {    
    "indent": ["error", 4],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    'consistent-return':'off',
    'linebreak-style':'off',
    'class-methods-use-this': ["error", { "exceptMethods": ["createWrapper","requestStatisticsForVideos","parseDescription","createElement"] }],
    'no-param-reassign': ["error", { "props": false }],
    'no-useless-escape':'off',
    'no-cond-assign':'off',
    'no-multi-assign':'off',
    'no-unneeded-ternary': ["error", { "defaultAssignment": false }]
  }
}
