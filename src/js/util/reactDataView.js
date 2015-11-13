define( "ReactDataView" , [ "Base" , "Listener" ] , function( Base , Listener ){
    /*!
     *  封装react作为底层渲染模块
     *  提供listener 模块做信息传递
     */
    var ReactDataView = Base.extend( function( opt ){
            if( !( this instanceof ReactDataView ) ){
                return new ReactDataView( opt );
            }
            var _self   = this;
            this._reactDataViewConfig     = {
                eventReflect    : $.extend( {} , opt )
            }
            this._reactObject   = React.createClass( $.extend( {} , opt , {
                getDefaultProps     : function(){
                    var _props  = {};
                    if( typeof opt.getDefaultProps === "function" ){
                        _props  = opt.getDefaultProps.call( this );
                    }
                    $.extend( _props , {
                        listener    : new Listener( Math.ceil( Math.random() * 100000 ).toString( 36 ) )
                    } );
                    return _props;
                } ,
                componentDidMount : function(){
                    var _reactObject    = this;
                    if( typeof opt.componentDidMount === "function" ){
                        opt.componentDidMount.call( this );
                    }
                    this.props.listener.addEventListener( function( name ){
                        var _args   = Array.prototype.slice.call( arguments );
                        _args.shift();
                        if( name === true || typeof name === "function" ){
                            _reactObject.forceUpdate( typeof name === "function" ? name : void 0 );
                        } else if( typeof _self._reactDataViewConfig.eventReflect[ name ] === "function" ){
                            _self._reactDataViewConfig.eventReflect[ name ].apply( _reactObject , _args );
                        }
                    } );
                    return this;
                } ,
                render  : function(){
                    return opt.render.call( this );
                }
            } ) );
        } , {
            getReactObject      : function(){
                return this._reactObject;
            } ,
            addEventReflect     : function( reflects , reflectFunc ){
                if( typeof reflects === "string" && typeof reflectFunc === "function" ){
                    this._reactDataViewConfig.eventReflect[ reflects ]   = reflectFunc;
                } else if( typeof reflects === "object" ){
                    $.extend( this._reactDataViewConfig.eventReflect , reflects );
                }
                return this;
            } 
        } );
    return ReactDataView;
} );