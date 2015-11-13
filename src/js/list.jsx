require( [ "ModalView" , "js/handler/list.js" ] , function( MV , List ){
    var _data   = {
        commits     : [
            {name : "John" , content : "hi,1111" } ,
            {name : "John" , content : "hi,2222" } 
        ]
    };
    var ListContainer   = React.createClass( {
        change     : function( commit , i  ){
            commit.content  = "hi,3333";
            this.setState();
        } ,
        render  : function(){
            return (
                <div className="global-body">
                    <h3>List</h3>
                    <ul>
                    {this.props.commits.map( function( commit , i ){
                        return (
                            <li data-key={i} onClick={this.change.bind( this , commit , i )}>
                                <h5>{commit.name}</h5>
                                <p>ps:{commit.content}</p>
                            </li>
                        )
                    }.bind( this ) )}
                    </ul>
                </div>
            );
        }
    } );

    var ListNav     = React.createClass( {
        setDefaultProps : function(){
            return {
                page    : 0 ,
                pageSize: 10
            };
        } ,
        getListNavTab   : function(){
            var _$dom   = [ (<a data-page="start">首页</a>) ];
            this.props.total    = this.props.commits.length;
            if( this.props.commits.length > this.pageSize ){
                _$dom.push( (<a data-page="pre">上一页</a>) );
            }
            for( var len = this.props.total; len--; ){
                _$dom.push( (<a data-page={len}>{len}</a>) );
            }
            if( this.props.commits.length - this.props.page * this.props.pageSize > this.props.pageSize ){
                _$dom.push( (<a data-page="next">下一页</a>) );
            }
            _$dom.push( (<a data-page="last">尾页</a>) );
            return _$dom;
        } ,
        render      : function(){
            return (
                <p>{this.getListNavTab.bind( this )}</p>
            );
        }
    } );

    var Container   = React.createClass( {
        maxins      : [ {
            sayHi   : function(){
                console.log( this );
            }
        } ] ,
        onReloadList: function(){
            console.log( 123123 );
        } ,
        render  : function(){
            return (
                <div className="global-body">
                    <ListContainer {...this.props}/>
                    <ListNav {...this.props}/>
                </div>
            );
        }
    } );
    React.render( <Container {..._data} /> , document.body );
} );