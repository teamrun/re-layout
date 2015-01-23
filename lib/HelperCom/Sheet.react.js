var React = require('react');
var shortId = require('shortid');

require('./sheet.less');
// 接收:
//      单元格大小
//      row count
//      clum count

var Sheet = React.createClass({
    getInitialState: function() {
        var unitW = this.props.unitWidth || 40;
        var unitH = this.props.unitHeight || unitW;
        var id = shortId.generate();

        var styleEle = document.createElement('style');
        styleEle.innerHTML = '.sheet.sheet-'+id+' tr td{ width: '+unitW+'px; height: '+unitH+'px; }';
        document.body.appendChild(styleEle);

        return {
            id: id
        };
    },

    render: function() {
        var rowCount = this.props.row;
        var cluCount = this.props.clu;

        var rows = [];
        for(var i=0; i< rowCount; i++){
            
            var units = [];
            for(var j=0; j< cluCount; j++){
                var key = 'td-'+i+'-'+j;
                units.push(<td key={key}></td>);
            }

            rows.push( <tr key={'tr-'+i}>{units}</tr> );
        }

        return (
            <table className={"sheet sheet-"+this.state.id}>
                {rows}
            </table>
        );
    }

});

module.exports = Sheet;

// (new Array(rowCount)).map()
//    won't work...