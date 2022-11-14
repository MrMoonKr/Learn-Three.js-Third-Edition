const path = require( 'path' );
const { SourceMapDevToolPlugin } = require( 'webpack' );


module.exports = {

    entry: {
        '01-01': './src/chapter-01/js/01-01.js',
        '01-02': './src/chapter-01/js/01-02.js',
        '01-03': './src/chapter-01/js/01-03.js',
        '01-04': './src/chapter-01/js/01-04.js',
        '01-05': './src/chapter-01/js/01-05.js',
        '01-06': './src/chapter-01/js/01-06.js',
        
        '02-01': './src/chapter-02/js/02-01.js',
        '02-02': './src/chapter-02/js/02-02.js',
        '02-03': './src/chapter-02/js/02-03.js',
        '02-04': './src/chapter-02/js/02-04.js',
        '02-05': './src/chapter-02/js/02-05.js',
        '02-06': './src/chapter-02/js/02-08.js',
        '02-07': './src/chapter-02/js/02-07.js',
        '02-08': './src/chapter-02/js/02-08.js',

    },

    output: {
        path: path.join( __dirname , 'dist' ),
        //filename: '[name].bundle.js'
        filename: function( pathData, assetInfo ) {
            // console.log( 'pathData : ' );
            // console.log( pathData ) ;
            // console.log( 'assetInfo : ' );
            // console.log( assetInfo ) ;

            const parent   = 'chapter-' + pathData.chunk.name.substr( 0, 2 );
            const name     = pathData.chunk.name;
            const ext      = '.bundle.js';
            const fileName = path.join( parent, name + ext );
            // console.log( fileName );
            return fileName;
        }
    },

    devtool: "source-map",

    plugins: [
        // https://webpack.js.org/plugins/source-map-dev-tool-plugin
        new SourceMapDevToolPlugin( {
            filename:'[file].map',
            //append: '\n//# sourceMappingURL=[file].map'
            append: '\n//# sourceMappingURL=[name].bundle.js.map'
        } )
    ],

    devServer: {
        port: 5110,
        //static: false,
        // static: [
        //     'assets',
        //     'css',
        //     'src'
        // ],
        static: path.resolve( __dirname ),
    }

}