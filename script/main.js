/////////////////////////////////////////////////////////////////////
//  游戏入口
/////////////////////////////////////////////////////////////////////
(function(window) {

    var player = -1 // -1黑棋下  1白棋下
    var chess = new Array(38) // 二维数组保存五子棋数据 0无 1黑 2白  多加4个 防止数组超界
    for (var i = 0; i < chess.length; i++) {
        var arr = new Array(38)
        chess[i] = arr
        for (var j = 0; j < arr.length; j++) {
            chess[i][j] = 0
        }
    }
    
    var GoBang = null
    var render = 'svg'
    switch (render) {
        case 'canvas':
        	GoBang = GoBangCanvas
            break
        case 'svg':
            GoBang = GoBangSvg
            break
        default:
        	GoBang = GoBangDom
    }

    var gobang = new GoBang()

    var chessboard = gobang.renderChessBoard('container', 900) // 创建900宽的棋盘
    Interface.sure(gobang, GoBangInterface)  // 确认接口实现

    /**
     * [判断逻辑]
     * [根据下的棋子判断是否有5颗棋子]
     * @return {[boolean]} [是否有输赢]
     */
    var judgeLogic = function(i, j) {
        var count, condition1, condition2, condition3, condition4
        for (count = 0; count < 5; count++) { //横向
            condition1 = chess[i - 4 + count][j] === chess[i - 3 + count][j]
            condition2 = chess[i - 3 + count][j] === chess[i - 2 + count][j]
            condition3 = chess[i - 2 + count][j] === chess[i - 1 + count][j]
            condition4 = chess[i - 1 + count][j] === chess[i + count][j]
            if (condition1 && condition2 && condition3 && condition4) {
                return true
            }
        }
        for (count = 0; count < 5; count++) { //竖向
            condition1 = chess[i][j - 4 + count] === chess[i][j - 3 + count]
            condition2 = chess[i][j - 3 + count] === chess[i][j - 2 + count]
            condition3 = chess[i][j - 2 + count] === chess[i][j - 1 + count]
            condition4 = chess[i][j - 1 + count] === chess[i][j + count]
            if (condition1 && condition2 && condition3 && condition4) {
                return true
            }
        }
        for (count = 0; count < 5; count++) { //左斜
            condition1 = chess[i - 4 + count][j - 4 + count] === chess[i - 3 + count][j - 3 + count]
            condition2 = chess[i - 3 + count][j - 3 + count] === chess[i - 2 + count][j - 2 + count]
            condition3 = chess[i - 2 + count][j - 2 + count] === chess[i - 1 + count][j - 1 + count]
            condition4 = chess[i - 1 + count][j - 1 + count] === chess[i + count][j + count]
            if (condition1 && condition2 && condition3 && condition4) {
                return true
            }
        }
        for (count = 0; count < 5; count++) { //右斜
            condition1 = chess[i - 4 + count][j + 4 - count] === chess[i - 3 + count][j + 3 - count]
            condition2 = chess[i - 3 + count][j + 3 - count] === chess[i - 2 + count][j + 2 - count]
            condition3 = chess[i - 2 + count][j + 2 - count] === chess[i - 1 + count][j + 1 - count]
            condition4 = chess[i - 1 + count][j + 1 - count] === chess[i + count][j - count]
            if (condition1 && condition2 && condition3 && condition4) {
                return true
            }
        }
        return false
    }

    /**
     * [胜负判断]
     * @return {[number]} [0无胜负, 1黑子胜利, 2白子胜利]
     */
    var judge = function(i, j) {
        var hasWin = false
        hasWin = judgeLogic(i, j)
        if (hasWin) {
            if (chess[i][j] === 1) {
                alert('黑子赢')
            } else {
                alert('白字赢')
            }
        }
    }
    /**
     * 落子方法
     */
    var drop = function(e) {
        var x = parseInt(e.pageX / 30)
        var y = parseInt(e.pageY / 30)
        if (chess[x + 4][y + 4]) {
            alert("该处不能落子")
            return;
        }

        chess[x + 4][y + 4] = (player === -1 ? 1 : 2)
        var color = (player === -1 ? '#000000' : '#ffffff')
        gobang.renderChess(chessboard, x, y, color)

        judge(x + 4, y + 4)

        player *= -1 //交替下棋

    }

    // 注册监听事件
    chessboard.addEventListener('click', drop, false)
})(window)
