'use strict';

const stringUtil = require('ember-cli-string-utils');
const chalk = require('chalk');
const { isExperimentEnabled } = require('../../lib/experiments');

module.exports = {
  description: 'The default blueprint for leanes-cli projects.',

  filesToRemove: [
    // 'app/styles/.gitkeep',
    // 'app/templates/.gitkeep',
    // 'app/views/.gitkeep',
    // 'public/.gitkeep',
    // 'Brocfile.js',
  ],

  locals(options) {
    let entity = options.entity;
    let rawName = entity.name;
    let name = stringUtil.dasherize(rawName);
    let namespace = stringUtil.classify(rawName);

    let hasOptions = !options.welcome || options.yarn;
    let blueprintOptions = '';
    if (hasOptions) {
      let indent = `\n            `;
      let outdent = `\n          `;

      blueprintOptions =
        indent +
        [!options.welcome && '"--no-welcome"', options.yarn && '"--yarn"'].filter(Boolean).join(',\n            ') +
        outdent;
    }

    return {
      name,
      modulePrefix: name,
      namespace,
      yarn: options.yarn,
      welcome: options.welcome,
      blueprint: 'simple',
      blueprintOptions,
      lang: options.lang,
    };
  },

  beforeInstall() {
    const version = require('../../package.json').version;
    const prependEmoji = require('../../lib/utilities/prepend-emoji');

    this.ui.writeLine(chalk.blue(`LeanES CLI v${version}`));
    this.ui.writeLine('');
    this.ui.writeLine(prependEmoji('✨', `Creating a new LeanES app in ${chalk.yellow(process.cwd())}:`));
  },
};
