const { FuseBox, QuantumPlugin } = require('fuse-box');
const { context, task } = require('fuse-box/sparky');

context(
  class {
    getConfig() {
      return FuseBox.init({
        useTypescriptCompiler: true,
        experimentalFeatures: true,
        homeDir: 'server',
        target: 'server',
        output: 'dist/$name.js',
        plugins: [
          this.isProduction &&
            QuantumPlugin({
              target: 'server',
              bakeApiIntoBundle: 'server',
            }),
        ],
        alias: {
          server: '~',
        },
      });
    }
  }
);

task('default', context => {
  const fuse = context.getConfig();
  fuse
    .bundle('server')
    .watch('server/**')
    .instructions(' > [_entry.ts]')
    .completed(proc => proc.start());
  fuse.run();
});

task('dist', context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  fuse.bundle('server').instructions(' > [_entry.ts]');
  fuse.run();
});
