var GoBangInterface = new Interface('render', ['renderChess', 'renderChessBoard'])

function GoBangCanvas() {}

GoBangCanvas.prototype.renderChess = function(game, x, y, color) {
    var ctx = game.getContext('2d')
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x * 30 + 15, y * 30 + 15, 12, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    return ctx
}

GoBangCanvas.prototype.renderChessBoard = function(container, width) {
    var canvas = document.createElement('canvas') // 创建canvas元素
    var boardWidth = width
    canvas.width = boardWidth
    canvas.height = boardWidth
    canvas.style.background = '#AFB14B'
    document.getElementById(container).appendChild(canvas)
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

// SVG实现
function GoBangSvg() {}
GoBangSvg.prototype.renderChess = function(game, x, y, color) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', x * 30 + 15)
    circle.setAttribute('cy', y * 30 + 15)
    circle.setAttribute('r', 12)
    circle.setAttribute('fill', color)
    game.appendChild(circle)
    return circle
}
GoBangSvg.prototype.renderChessBoard = function(container, width) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') // 创建svg元素
    var boardWidth = width
    svg.setAttribute('width', boardWidth)
    svg.setAttribute('height', boardWidth)
    svg.style.backgroundColor = '#AFB14B'
    document.getElementById(container).appendChild(svg)
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

//dom实现
function GoBangDom() {}
GoBangDom.prototype.renderChess = function(game, x, y, color) {
    var chessman = document.createElement('div')
    chessman.style.width = '24px'
    chessman.style.height = '24px'
    chessman.style.borderRaduis = '50%'
    chessman.style.webkitBorderRadius = '50%'
    chessman.style.backgroundColor = color
    chessman.style.position = 'absolute'
    chessman.style.top = y * 30 + 3 + 'px'
    chessman.style.left = x * 30 + 3 + 'px'
    game.appendChild(chessman)
    return chessman
}
GoBangDom.prototype.renderChessBoard = function(container, width) {
    var dom = document.createElement('div') // 创建dom元素
    var boardWidth = width
    dom.style.width = boardWidth + 'px'
    dom.style.height = boardWidth + 'px'
    dom.style.position = 'relative'
    dom.style.backgroundColor = '#AFB14B'
    document.getElementById(container).appendChild(dom)
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
