var path    = require( "path" ),
    self;

function addReactWatch( grunt ){
    var _filePath       = path.resolve( _self.cwd , "grunt/watch.yaml" ) ,
        _watchFile      = grunt.file.read( _filePath );
    if( _watchFile.indexOf( "js-react" ) === -1 ){
        _watchFile += "\njs-react:\
                          files:\
                            - <%= src %>/js/**/*.jsx\
                          tasks:\
                            - react\n";
    }
    grunt.file.write( _filePath , _watchFile );
}

// 增加package.json devDependencies内容
function replacePackageJson( grunt ){
    var _filePath       = path.resolve( _self.cwd , "package.json" ) ,
        _packageJson    = grunt.file.readJSON( _filePath );
    _packageJson.devDependencies    = _packageJson.devDependencies || {};
    _packageJson.devDependencies[ "grunt-react" ]   = "^0.12.3";
    grunt.file.write( _filePath , JSON.stringify( _packageJson , null , "    " ) );
}

module.exports  = function( bower , grunt , tool , log , callback ) {
    self    = this;
    log( "start load kulor-reactDataView" );
    bower.commands
        .install( [ "react" ] , { save : true } )
        .on( "end" , function( installed ){
            tool.file.copy( path.resolve( __dirname , "src/js/util/reactDataView.js" ) , path.resolve( self.cwd , "src/js/util/reactDataView.js" ) );
            tool.file.copy( path.resolve( __dirname , "bower_components/react/react.js" ) , path.resolve( self.cwd , "src/js/lib/react.js" ) );
            tool.file.copy( path.resolve( __dirname , "grunt/react.yaml" ) , path.resolve( self.cwd , "grunt/react.yaml" ) );
            replacePackageJson( grunt );
            addReactWatch( grunt );
            log( "kulor-reactDataView init success" );
            callback();
        } );
}