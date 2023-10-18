const path = require("node:path");
const fs = require("node:fs");

module.exports = {
  packagerConfig: {
    asar: true,
    ignore: ["^/frontend", "^/backend/logs", "^/backend/run"]
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux", "win"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  hook: {
    packageAfterCopy: (config, buildPath, electronVersion, platform, arch) => {
      var src = path.join(__dirname, './backend/');
      var dst = buildPath;
      fs.cpSync(src, dst, {recursive: true});
    }
  },
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
