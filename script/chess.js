/////////////////////////////////////////////////////////////////////
//  兼容方法
/////////////////////////////////////////////////////////////////////
//var isSupportCanvas = !!document.createElement("canvas").getContext
var isSupportCanvas = true  // 直接改变该变量及可以改变canvas和dom互换
/**
 * [绘制棋子]
 * @game [dom] 容器
 * @return dom 棋盘
 */
var drawChess = (function(){
	if(isSupportCanvas) {
		return function(chessboard, player, x, y) {
			var ctx = chessboard.getContext('2d')
			var color = (player === -1 ? '#000000' : '#ffffff')
			ctx.fillStyle = color
			ctx.beginPath()
			ctx.arc(x * 30 + 15, y * 30 + 15, 12, 0, Math.PI * 2)
			ctx.fill()
		}
	} else {
		return function(chessboard, player, x, y) {
			var chessman = document.createElement('div')
			var color = (player === -1 ? '#000000' : '#ffffff')
			chessman.style.width = '24px'
			chessman.style.height = '24px'
			chessman.style.borderRaduis = '50%'
			chessman.style.webkitBorderRadius = '50%'
			chessman.style.backgroundColor = color
			chessman.style.position = 'absolute'
			chessman.style.top = y * 30 + 3 + 'px'
			chessman.style.left = x * 30 + 3 + 'px'
			chessboard.appendChild(chessman)
		}
	}
})()

/**
 * [绘制棋盘]
 * @game [dom] 容器,默认为id
 * @return dom 棋盘
 */
var drawChessboard = (function(id){
	var boardWidth = 900
	var game = document.getElementById(game || 'game')
	if(isSupportCanvas) {
		var canvas = document.createElement('canvas')  // 创建canvas元素
		canvas.width = boardWidth
		canvas.height = boardWidth
		canvas.style.background = '#AFB14B'
		game.appendChild(canvas)
		var ctx = canvas.getContext('2d')
		return function() {
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
		var dom = document.createElement('div')  // 创建dom元素
		dom.style.width = boardWidth + 'px'
		dom.style.height = boardWidth + 'px'
		dom.style.position = 'relative'
		dom.style.backgroundColor = '#AFB14B'
		game.appendChild(dom)
		return function(id) {
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