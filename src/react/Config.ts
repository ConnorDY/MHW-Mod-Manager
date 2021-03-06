import { cwd, fs, path } from './electron';

const configPath = path.join(cwd, 'config.json');

interface ConfigType {
  binPath?: string;
  darkMode?: boolean;
  modsPath?: string;
}

// Config singleton
const Config = (() => {
  let config: ConfigType;

  function loadConfigFile(): ConfigType {
    return fs.existsSync(configPath)
      ? JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }))
      : {};
  }

  return {
    getConfig: (): ConfigType => {
      if (!config) config = loadConfigFile();
      return config;
    },
    writeConfig: (newConfig: ConfigType): void => {
      // combine new config and old config
      config = { ...config, ...newConfig };

      // write to config.json
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

      console.log('Wrote new config file:');
      console.log(config);
    }
  };
})();

export default Config;
