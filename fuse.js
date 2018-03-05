const { FuseBox } = require('fuse-box');
const fuse = FuseBox.init({
  useTypescriptCompiler: true,
  experimentalFeatures: true,
  homeDir: 'server',
  target: 'server',
  output: 'dist/$name.js',
  alias: {
    server: '~',
  },
});

fuse
  .bundle('server')
  .watch('server/**')
  .instructions(' > [_entry.ts]')
  .completed(proc => proc.start());
fuse.run();
