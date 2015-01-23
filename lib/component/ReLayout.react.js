var React = require('react');

var Sheet = require('../HelperCom/Sheet.react');

var ReLayout = React.createClass({
    render: function(){
        return (
            <div>
                ReLayout
                <Sheet row={6} clu={6} unitWidth={100}/>
            </div>
        )
    }
});


module.exports = ReLayout;