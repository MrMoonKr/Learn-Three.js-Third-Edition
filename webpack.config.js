const path = require( 'path' );
const { SourceMapDevToolPlugin } = require( 'webpack' );


module.exports = {

    entry: {
        '01-01': './src/chapter-01/js/01-01.js',
        '01-02': './src/chapter-01/js/01-02.js'

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
    ]

}