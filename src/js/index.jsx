require( [ "ModalView" , "js/handler/nav-header.js" , "js/handler/body-content.js" , "Listener" , "ReactDataView" ] , function( MV , NavHeaderContainer , BodyContentContainer , Listener , RDV ){
    var _mv     = new MV( "index" , $( document.body ) , function(){
        this.initReactDataView()
            // initReactView();
    } , {
        view    : false
    } );

    _mv.addModalEvent( {
        initReactDataView   : function(){
            var _rdv    = new RDV( {
                getDefaultProps     : function(){
                    return {
                        navOpts     : (function(){
                            var _nav    = [];
                            for( var i = 10; i--; ){
                                _nav.push( {
                                    title   : "Home" + i ,
                                    active  : !i ? true : false
                                } );
                            }
                            return _nav;
                        })()
                    };
                } ,
                componentDidMount : function(){
                    console.log( arguments );
                } ,
                render  : function(){
                    return (
                        <div>
                            <NavHeaderContainer {...this.props} />
                            <BodyContentContainer {...this.props} />
                        </div>
                    );
                }
            } ) ,
            _Component  = _rdv.getReactObject();
            _rdv.addEventReflect( {
                navSearchContent    : function(){
                    console.log( "xxx" );
                }
            } );
            React.render( <_Component /> , document.body );
            return this;
        }
    } ).addViewEvent( {

    } ).init();
} );