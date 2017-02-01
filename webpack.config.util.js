class WebpackConfigUtil {
  static loaderConfigToString(key, configs) {
    const optionString = [configs[key].query.presets.map(preset => `presets[]=${preset}`).join(','),
      configs[key].query.plugins.map(plugin => `plugins[]=${plugin}`).join(',')].join(',');

    let configString = key;

    if (optionString.length > 0) {
      configString = `${key}?${optionString}`;
    }

    return configString;
  }
}

module.exports = WebpackConfigUtil;
