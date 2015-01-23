var React = require('react/lib/ReactWithAddons');
var shortId = require('shortid');

var CX = React.addons.classSet;

require('./sheet.less');


/*
 * 接受的props: 
 *      多少行             row={6}
 *      多少列             clu={6}
 *      每个单元格的宽高    unitWidth={100}  unitHeight
 *      是否显示奇偶异色    striped={true}
 *      额外的样式          style={SheetBGStyle}
 *     
 */

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

        var classes = CX({
            sheet: true,
            'sheet-striped': this.props.striped
        })
        classes += ' sheet-'+this.state.id;

        return (
            <table className={ classes } style={this.props.style || {}}>
                {rows}
            </table>
        );
    }

});

module.exports = Sheet;

// (new Array(rowCount)).map()
//    won't work...