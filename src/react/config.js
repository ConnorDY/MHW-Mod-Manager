import { cwd, fs, path } from './electron';

const configPath = path.join(cwd, 'config.json');

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
      const newConfigObject = { ...config, ...newConfig };

      fs.writeFileSync(configPath, JSON.stringify(newConfigObject));

      console.log('Wrote new config file:');
      console.log(newConfigObject);
    }
  };
})();

export default Config;
