module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/support/hooks.ts',
      'src/steps/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ]
  }
};