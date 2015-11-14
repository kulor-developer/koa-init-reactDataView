var path    = require( "path" ),
    self;

// 增加concat配置中对react的引用
function addConcat( grunt , tool ){
    var _filePath   = path.resolve( self.cwd , "grunt/concat.yaml" ) ,
        _config     = grunt.file.readYAML( _filePath ) ,
        _val        = "<%= src %>/js/lib/react.js";
    if( _config[ "global" ].src.indexOf( _val ) === -1 ){
        _config[ "global" ].src.unshift( _val );
    }
    tool.file.writeYAML( _filePath , _config );
    return _config;
}

// 修改grunt初始化文件
function addAliases( grunt , tool ){
    var _filePath   = path.resolve( self.cwd , "grunt/aliases.yaml" ) ,
        _config     = grunt.file.readYAML( _filePath ) ,
        _replace    = function( list , key ){
            if( list.indexOf( "react" ) === -1 ){
                _config[ key ].push( "react" );
            }
        };
    _replace( _config.dev , "dev" );
    _replace( _config.mock , "mock" );
    tool.file.writeYAML( _filePath , _config );
    return _config;
}   

// 增加watch 文件 ，指向js-react
function addReactWatch( grunt , tool ){
    var _filePath       = path.resolve( self.cwd , "grunt/watch.yaml" ) ,
        _watchFile      = grunt.file.readYAML( _filePath );
    if( !_watchFile[ "js-react" ] ){
        _watchFile[ "js-react" ] = {
            files   : [ "<%= src %>/js/**/*.jsx" ] ,
            tasks   : [ "react" ]
        }
        tool.file.writeYAML( _filePath , _watchFile );
    }
}

// 增加package.json devDependencies内容
function replacePackageJson( grunt ){
    var _filePath       = path.resolve( self.cwd , "package.json" ) ,
        _packageJson    = grunt.file.readJSON( _filePath );
    _packageJson.devDependencies    = _packageJson.devDependencies || {};
    _packageJson.devDependencies[ "grunt-react" ]   = "^0.12.3";
    grunt.file.write( _filePath , JSON.stringify( _packageJson , null , "    " ) );
}

module.exports  = function( bower , grunt , tool , log , callback ) {
    self    = this;
    log( "start load kulor-reactDataView" );
    tool.file.copy( path.resolve( __dirname , "src/js/util/reactDataView.js" ) , path.resolve( self.cwd , "src/js/util/reactDataView.js" ) );
    tool.file.copy( path.resolve( __dirname , "src/js/lib/react.js" ) , path.resolve( self.cwd , "src/js/lib/react.js" ) );
    tool.file.copy( path.resolve( __dirname , "grunt/react.yaml" ) , path.resolve( self.cwd , "grunt/react.yaml" ) );
    replacePackageJson( grunt );
    addReactWatch( grunt , tool );
    addConcat( grunt , tool );
    addAliases( grunt , tool );
    log( "kulor-reactDataView init success" );
    callback();
}