import Atomizer from 'atomizer';

export class WebpackAtomizerPlugin {
  private foundClasses: string[];

  constructor(
    private options: any = {},
    private atomizer: Atomizer = new Atomizer({ verbose: true })
  ) {
    this.foundClasses = [];
  }

  apply = (compiler: any) => {
    compiler.plugin('compilation', (compilation: any) => {
      compilation.plugin(
        'optimize-chunk-assets',
        (chunks: any[], callback: Function) => {
          chunks.forEach(chunk => {
            chunk.files.forEach((file: any) => {
              if (file.match(/\.([jt])sx?$/)) {
                const source: any = compilation.assets[file];
                this.foundClasses = this.foundClasses.concat(
                  this.atomizer.findClassNames(source.source())
                );
              }
            });
          });

          callback();
        }
      );
    });

    compiler.plugin('emit', (compilation: any, callback: Function) => {
      const cssFile: string = this.options.cssFile ?? 'atomic.css';
      delete this.options.cssFile;
      const cssString: string = this.atomizer.getCss(
        this.atomizer.getConfig(this.foundClasses, this.options)
      );

      compilation.assets[cssFile] = {
        source() {
          return cssString;
        },
        size() {
          return cssString.length;
        },
      };

      callback();
    });
  };
}
