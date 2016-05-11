/////////////////////////////////////////////////////////////////////
//  五子棋对象
/////////////////////////////////////////////////////////////////////
var GoBang = (function(window) {
    // 继承工具方法
    var _copy = function(source) {
        var result = new Object()
        for (var key in source) {
            result[key] = source[key]
        }
        return result
    }
    var _inherit = function(superType, subType) {
        var prototype = _copy(superType.prototype)
        prototype.constructor = subType
        subType.prototype = prototype
    }

    /**
     * [棋子基类]
     * @game [dom] 游戏真实dom
     * @x [number] x位置
     * @y [number] y位置
     * @color [string] 颜色
     */
    function Chessman(game, x, y, color) {
        this.game = game
        this.x = x || 0
        this.y = y || 0
        this.color = color || '#000000'
    }

    /**
     * [棋盘基类]
     * @container [string] 容器id
     * @width [number] 棋盘宽度 默认正方形棋盘
     * @game [dom] 真实游戏dom
     */
    function Chessboard(container, width, game) {
        this.container = document.getElementById(container || 'container') //容器
        this.width = width || 900 // 宽度
        this.game = game || '' // 真实游戏dom
    }

    /**
     * [canvas类继承与Chessman]
     */
    function ChessmanCanvas(game, x, y, color) {
        Chessman.call(this, game, x, y, color)
    }

    // 继承Chessman类
    _inherit(Chessman, ChessmanCanvas)

    // 实现接口定义 采用canvas渲染
    ChessmanCanvas.prototype.render = function() {
        var ctx = this.game.getContext('2d')
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x * 30 + 15, this.y * 30 + 15, 12, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        return ctx
    }

    /**
     * [dom类继承与Chessman]
     */
    function ChessmanDom(game, x, y, color) {
        Chessman.call(this, game, x, y, color)
    }

    // 继承Chessman类
    _inherit(Chessman, ChessmanDom)

    // 渲染方法 采用dom渲染
    ChessmanDom.prototype.render = function() {
        var chessman = document.createElement('div')
        chessman.style.width = '24px'
        chessman.style.height = '24px'
        chessman.style.borderRaduis = '50%'
        chessman.style.webkitBorderRadius = '50%'
        chessman.style.backgroundColor = this.color
        chessman.style.position = 'absolute'
        chessman.style.top = this.y * 30 + 3 + 'px'
        chessman.style.left = this.x * 30 + 3 + 'px'
        this.game.appendChild(chessman)
        return chessman
    }

    /**
     * [svg类继承与Chessman]
     */
    function ChessmanSvg(game, x, y, color) {
        Chessman.call(this, game, x, y, color)
    }

    // 继承Chessman类
    _inherit(Chessman, ChessmanSvg)

    // 渲染方法 采用svg渲染
    ChessmanSvg.prototype.render = function() {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', this.x * 30 + 15)
        circle.setAttribute('cy', this.y * 30 + 15)
        circle.setAttribute('r', 12)
        circle.setAttribute('fill', this.color)
        this.game.appendChild(circle)
        return circle
    }


    /**
     * [继承Chessboard类的canvas类]
     */
    function ChessboardCanvas(container, width, game) {
        Chessboard.call(this, container, width, game)
    }

    _inherit(Chessboard, ChessboardCanvas)

    // 实现接口定义的render方法
    ChessboardCanvas.prototype.render = function() {
        var canvas = document.createElement('canvas') // 创建canvas元素
        var boardWidth = this.width
        canvas.width = boardWidth
        canvas.height = boardWidth
        canvas.style.background = '#AFB14B'
        this.container.appendChild(canvas)
        this.game = canvas
        var ctx = canvas.getContext('2d')
        for (var i = 0; i <= boardWidth; i = i + 30) {
            ctx.strokeStyle = '#313131'
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(boardWidth, i)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, boardWidth)
            ctx.stroke()
        }
        return canvas
    }

    /**
     * [继承Chessboard类的dom类]
     */
    function ChessboardDom(container, width, game) {
        Chessboard.call(this, container, width, game)
    }

    _inherit(Chessboard, ChessboardDom)

    // 实现接口定义的render方法
    ChessboardDom.prototype.render = function() {
        var dom = document.createElement('div') // 创建dom元素
        var boardWidth = this.width
        dom.style.width = boardWidth + 'px'
        dom.style.height = boardWidth + 'px'
        dom.style.position = 'relative'
        dom.style.backgroundColor = '#AFB14B'
        this.container.appendChild(dom)
        this.game = dom
        for (var i = 0; i <= boardWidth; i = i + 30) {
            var lineH = document.createElement('div')
            lineH.style.width = '100%'
            lineH.style.height = '1px'
            lineH.style.backgroundColor = '#313131'
            lineH.style.position = 'absolute'
            lineH.style.top = i + 'px'
            lineH.style.left = 0
            dom.appendChild(lineH)

            var lineV = document.createElement('div')
            lineV.style.width = '1px'
            lineV.style.height = '100%'
            lineV.style.backgroundColor = '#313131'
            lineV.style.position = 'absolute'
            lineV.style.top = 0
            lineV.style.left = i + 'px'
            dom.appendChild(lineV)
        }
        return dom
    }

    /**
     * [继承Chessboard类的svg类]
     */
    function ChessboardSvg(container, width, game) {
        Chessboard.call(this, container, width, game)
    }

    _inherit(Chessboard, ChessboardSvg)

    // 实现接口定义的render方法
    ChessboardSvg.prototype.render = function() {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') // 创建svg元素
        var boardWidth = this.width
        svg.setAttribute('width', boardWidth)
        svg.setAttribute('height', boardWidth)
        svg.style.backgroundColor = '#AFB14B'
        this.container.appendChild(svg)
        this.game = svg
        for (var i = 0; i <= boardWidth; i = i + 30) {
            var lineH = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            lineH.setAttribute("x1", 0)
            lineH.setAttribute("y1", i)
            lineH.setAttribute("x2", boardWidth)
            lineH.setAttribute("y2", i)
            lineH.style.stroke = '#313131'
            lineH.style.strokeWidth = 1
            svg.appendChild(lineH)

            var lineV = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            lineV.setAttribute("x1", i)
            lineV.setAttribute("y1", "0")
            lineV.setAttribute("x2", i)
            lineV.setAttribute("y2", boardWidth)
            lineV.style.stroke = '#313131'
            lineV.style.strokeWidth = 1
            svg.appendChild(lineV)
        }
        return svg
    }

    /**
     * [创建五子棋对象]
     */
    function GoBang(render) {
        var _Chessman, _Chessboard
        render = render || 'dom'
        switch (render) {
            case 'canvas':
                _Chessman = ChessmanCanvas
                _Chessboard = ChessboardCanvas
                break
            case 'svg':
                _Chessman = ChessmanSvg
                _Chessboard = ChessboardSvg
                break
            default:
                _Chessman = ChessmanDom
                _Chessboard = ChessboardDom
        }

        // 定义棋子类需要完成的接口
        _Chessman.interface = new Interface('renderChess', ['render'])
            // 定义棋盘类需要完成的接口
        _Chessboard.interface = new Interface('rendererChessBoard', ['render'])

        return {
            render: render,
            Chessman: _Chessman,
            Chessboard: _Chessboard,
        }
    }

    return GoBang
})(window)
