const path  = require( 'path' ) ;
const fs    = require( 'fs' ).promises ;

const { SourceMapDevToolPlugin } = require( 'webpack' ) ;
const HtmlWebpackPlugin = require( 'html-webpack-plugin' ) ;


const CHAPTER_PARENT = path.join( __dirname, 'src/' ) ;
const CHAPTER_LIST = [
    'ch01' ,
    'ch02' ,
] ;
const HTML_TEMPLATE = './src/template.html' ;


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
        '02-06': './src/chapter-02/js/02-06.js',
        '02-07': './src/chapter-02/js/02-07.js',
        '02-08': './src/chapter-02/js/02-08.js',
        
        '03-01': './src/chapter-03/js/03-01.js',
        '03-02': './src/chapter-03/js/03-02.js',
        '03-03': './src/chapter-03/js/03-03.js',
        '03-04': './src/chapter-03/js/03-04.js',
        '03-05': './src/chapter-03/js/03-05.js',
        '03-06': './src/chapter-03/js/03-06.js',
        '03-07': './src/chapter-03/js/03-07.js',
        
        '04-01': './src/chapter-04/js/04-01.js',
        '04-02': './src/chapter-04/js/04-02.js',
        '04-03': './src/chapter-04/js/04-03.js',
        '04-04': './src/chapter-04/js/04-04.js',
        '04-05': './src/chapter-04/js/04-05.js',
        '04-06': './src/chapter-04/js/04-06.js',
        '04-07': './src/chapter-04/js/04-07.js',
        '04-08': './src/chapter-04/js/04-08.js',
        '04-09': './src/chapter-04/js/04-09.js',
        '04-10': './src/chapter-04/js/04-10.js',
        '04-11': './src/chapter-04/js/04-11.js',
        '04-12': './src/chapter-04/js/04-12.js',
        '04-13': './src/chapter-04/js/04-13.js',
        
        '05-01': './src/chapter-05/js/05-01.js',
        '05-02': './src/chapter-05/js/05-02.js',
        '05-03': './src/chapter-05/js/05-03.js',
        '05-04': './src/chapter-05/js/05-04.js',
        '05-05': './src/chapter-05/js/05-05.js',
        '05-06': './src/chapter-05/js/05-06.js',
        '05-07': './src/chapter-05/js/05-07.js',
        '05-08': './src/chapter-05/js/05-08.js',
        '05-09': './src/chapter-05/js/05-09.js',
        '05-10': './src/chapter-05/js/05-10.js',
        '05-11': './src/chapter-05/js/05-11.js',
        
        // '09-01': './src/chapter-09/js/09-01.js',
        // '09-02': './src/chapter-09/js/09-02.js',
        // '09-03': './src/chapter-09/js/09-03.js',
        '09-04': './src/chapter-09/js/09-04.js',
        '09-05': './src/chapter-09/js/09-05.js',
        '09-06': './src/chapter-09/js/09-06.js',
        '09-07': './src/chapter-09/js/09-07.js',
        // '09-08': './src/chapter-09/js/09-08.js',
        // '09-09': './src/chapter-09/js/09-09.js',
        // '09-10': './src/chapter-09/js/09-10.js',
        // '09-11': './src/chapter-09/js/09-11.js',
        // '09-12': './src/chapter-09/js/09-12.js',
        // '09-13': './src/chapter-09/js/09-13.js',
        // '09-14': './src/chapter-09/js/09-14.js',
        // '09-15': './src/chapter-09/js/09-15.js',
        // '09-16': './src/chapter-09/js/09-16.js',
        // '09-17': './src/chapter-09/js/09-17.js',
        // '09-18': './src/chapter-09/js/09-18.js',
        
        '13-01': './src/chapter-13/js/13-01.js',
        '13-02': './src/chapter-13/js/13-02.js',
        '13-04': './src/chapter-13/js/13-04.js',

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

/**
 * 챕터 목록으로 부터 webpack용 entry 객체 및 html plugin 목록 생성
 * @param {string} parentPath 상위 부모 디렉토리명
 * @param {Array<string>} chapters 챕터 디렉토리명 목록 ex) [ 'ch01', 'ch02', 'ch03', ] 
 * @param {string} template 템플릿 html 페이지 경로 ex) './src/template.html'
 */
const getDirectoryEntries = async ( parentPath, chapters, template='./src/template.html' ) => {

    const generatedPlugins = [] ;
    const generatedEntries = {} ;

    for ( const chapter of chapters )
    {
        const entries = await fs.readdir( parentPath + chapter, {
            withFileTypes: true,
            recursive: false
        } ) ;

        const candidates = entries.filter( ( entry ) => {
            return entry.name.endsWith( '.js' ) ;
        } ) ;

        for ( const candiate of candidates ) {

            const name   = path.parse( candiate.name ).name ;
            const plugin = new HtmlWebpackPlugin( {
                //filename: chapter + '/' + name + '.html' ,
                filename: path.join( chapter, name + '.html' ),
                chunks: [name] ,
                template: template
            } ) ;

            generatedEntries[ name ] = {
                //import: parentPath + chapter + '/' + candiate.name 
                import: path.join( parentPath, chapter, candiate.name )
            }

            generatedPlugins.push( plugin ) ;

        }
    }

    return { generatedEntries, generatedPlugins }
}
