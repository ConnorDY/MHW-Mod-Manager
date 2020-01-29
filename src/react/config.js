import { cwd, fs, path } from './electron';

const configPath = path.join(cwd, 'config.json');

// Config singleton
const Config = (() => {
  let config;

  function loadConfigFile() {
    return fs.existsSync(configPath)
      ? JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }))
      : {};
  }

  return {
    getConfig: () => {
      if (!config) config = loadConfigFile();
      return config;
    },
    writeConfig(newConfig) {
      // combine new config and old config
      config = { ...config, ...newConfig };

      // write to config.json
      fs.writeFileSync(configPath, JSON.stringify(config));

      console.log('Wrote new config file:');
      console.log(config);
    }
  };
})();

export default Config;
