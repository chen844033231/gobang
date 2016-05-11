/////////////////////////////////////////////////////////////////////
//  棋子, 棋盘类
/////////////////////////////////////////////////////////////////////
var isSupportCanvas = !!document.createElement("canvas").getContext  // 直接改变该变量及可以改变canvas和dom互换
//var isSupportCanvas = false 

/**
 * [棋子类]
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

// 动态渲染方法
Chessman.prototype.render = (function() {
    if (isSupportCanvas) {
        return function() {
            var ctx = this.game.getContext('2d')
            ctx.fillStyle = this.color
            ctx.beginPath()
            ctx.arc(this.x * 30 + 15, this.y * 30 + 15, 12, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
            return ctx
        }
    } else {
        return function() {
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
    }
})()


/**
 * [棋盘类]
 * @container [string] 容器id
 * @width [number] 棋盘宽度 默认正方形棋盘
 * @game [dom] 真实游戏dom
 */
function Chessboard(container, width, game) {
    this.container = document.getElementById(container || 'container') //容器
    this.width = width || 900 // 宽度
    this.game = game || '' // 真实游戏dom
}

// 渲染棋盘
Chessboard.prototype.render = (function() {
    if (isSupportCanvas) {
        return function() {
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
    } else {
        return function() {
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
    }
})()
