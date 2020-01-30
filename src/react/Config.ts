import { cwd, fs, path } from './electron';

const configPath = path.join(cwd, 'config.json');

interface config {
  binPath?: string;
}

// Config singleton
const Config = (() => {
  let config: config;

  function loadConfigFile(): config {
    return fs.existsSync(configPath)
      ? JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }))
      : {};
  }

  return {
    getConfig: (): config => {
      if (!config) config = loadConfigFile();
      return config;
    },
    writeConfig: (newConfig: config): void => {
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
