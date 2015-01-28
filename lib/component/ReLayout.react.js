var React = require('react');

var Sheet = require('../HelperCom/Sheet.react');
var Marker = require('./Marker.react');

// 作为背景的格子的样式
var SheetBGStyle = {
    position: 'absolute',
    zIndex: -10
};

var ReLayout = React.createClass({
    render: function(){
        return (
            <div>
                ReLayout
                <Marker />
                <Marker key={2}/>
                <Marker key={4}/>
                <Sheet row={6} clu={6} unitWidth={100} striped={true} style={SheetBGStyle}/>
            </div>
        )
    }
});


module.exports = ReLayout;