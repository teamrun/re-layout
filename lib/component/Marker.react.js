var React = require('react');

var MoveableMixin = require('../HelperCom/Moveable.mixin');

var style = {
    height: 100,
    width: 100,
    backgroundColor: '#ccc'
};

var Marker = React.createClass({
    mixins: [MoveableMixin],

    render: function() {
        return (
            <div className="obj-marker" style={style} />
        );
    }

});

module.exports = Marker;