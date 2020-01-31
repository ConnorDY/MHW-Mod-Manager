# MHW Mod Manager

A basic mod manager for Monster Hunter World (MHW).

Simply drop your mod Zip files into the mods folder then click a button to activate or deactivate your mods.

## Features

- Activating (installing) mods
- Deactivating (uninstalling) mods

Coming soon:

- Mod conflict detection

## Configuration

The configuration file for this app can be found at: `C:/Users/<UserName>/AppData/Local/Programs/mhw-mod-manager/config.json`

The following configuration options are available:

| Option   |  Type   |                    Default                    |                    Description                    |
| -------- | :-----: | :-------------------------------------------: | :-----------------------------------------------: |
| binPath  | String  |                                               | Location of MonsterHunterWorld.exe on your system |
| darkMode | Boolean |                    `false`                    |   If `true`, the app uses a dark color scheme.    |
| modsPath | String  | `AppData/Local/Programs/mhw-mod-manager/mods` |          Location of your mods Zip files          |

## Screenshots

### Light Mode

![alt text](./screenshots/light-mode.png 'Light Mode')

### Dark Mode

![alt text](./screenshots/dark-mode.png 'Light Mode')
