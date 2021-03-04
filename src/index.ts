class WebpackAtomizerPlugin {
  apply(compiler: any) {
    compiler.hooks.emit.tapAsync(
      'WebpackAtomizerPlugin',
      (compilation: any, callback: any) => {
        console.log('This is an example plugin!');
        console.log(
          'Here’s the `compilation` object which represents a single build of assets:',
          compilation
        );
        //compilation.addModule(/* ... */);

        callback();
      }
    );
  }
}
