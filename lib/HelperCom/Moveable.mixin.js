
/* 鼠标移动 需要绑定几个鼠标事件
 *      mousedown 启动
 *      mousemove 移动
 *      mouseup / mouseout 结束
 *  其中除第一个需要绑定在移动的目标上 其他的事件都需要绑定在document.body上 才可以顺畅的移动
 */

// 绑定同一个函数, 多次绑定不会

function getTranslate(el){
    var styleObj = window.getComputedStyle(el);
    var matrixStr = styleObj.transform;
    if(matrixStr === 'none'){
        return {
            x: 0,
            y: 0
        }
    }
    else{
        var matrixArr = matrixStr.replace('matrix(', '').replace(')', '').split(',');
        if(matrixArr.length == 6){
            return {
                x: parseInt(matrixArr[4]),
                y: parseInt(matrixArr[5]),
            }
        }
        else if(matrixArr.length == 16){
            return {
                x: parseInt(matrixArr[12]),
                y: parseInt(matrixArr[13]),
            }
        }
        else{

        }
    }
}

var Moveable = {
    componentDidMount: function() {
        var el = this.getDOMNode();
        this.moveable_el = el;

        
        // get initial data
        this.moveable_data = {
            lastPos: {
                x: 0,
                y: 0
            },
            startPos: {}
        };

        // bing event handler
        el.addEventListener('mousedown', this._moveStart);
        // 不能绑在body, 因为body可能会因为塌陷不占满全屏
        document.addEventListener('mousemove', this._moveIng);
        document.addEventListener('mouseup', this._moveEnd);

        // requestAnimationFrame timer
        this.moveable_rafDone = true;
    },
    _getTranslate: function(nowX, nowY){
        // console.log('current: ', nowX, nowY);
        // console.log('start:   ', this.moveable_data.startPos.x, this.moveable_data.startPos.y);
        // console.log('last:    ', this.moveable_data.lastPos.x, this.moveable_data.lastPos.y);
        var x = nowX - this.moveable_data.startPos.x + this.moveable_data.lastPos.x;
        var y = nowY - this.moveable_data.startPos.y + this.moveable_data.lastPos.y;

        return 'translateX('+ x +'px)  translateY('+ y +'px)';
    },
    _moveStart: function(e){
        this.moveable_move_start = true;

        this.moveable_data.lastPos = getTranslate(this.moveable_el);
        // console.log( this.moveable_data.lastPos );

        this.moveable_data.startPos.x = e.pageX;
        this.moveable_data.startPos.y = e.pageY;
    },
    // 全自动的 直接将位置设定在元素上
    _moveIng: function(e){
        if(this.moveable_move_start){
            e.preventDefault();
            if( this.moveable_rafDone ){
                this.moveable_rafDone = false;
                var self = this;
                requestAnimationFrame(function(){
                    var curX = e.pageX;
                    var curY = e.pageY;
                    var val = self._getTranslate(curX, curY);
                    
                    self.moveable_el.style.webkitTransform = val;
                    self.moveable_rafDone = true;
                });
            }
        }
    },
    _moveEnd: function(){
        if(this.moveable_move_start){
            this.moveable_move_start = false;
            // 一系列停止的动作
            // this.moveData.lastX = x;
            // this.moveData.lastY = y;
        }
    }
};


module.exports = Moveable;