/////////////////////////////////////////////////////////////////////
//  接口类
/////////////////////////////////////////////////////////////////////
var Interface = function(name, methods) {
	this.name = name
	this.methods = methods
}

Interface.sure = function(instance, interfaceArr) {
	if(!interfaceArr) {
		throw('请传入接口实例')
	}
	if(!Array.isArray(interfaceArr)) {
		interfaceArr = [interfaceArr]
	}
	for(var i = 0; i < interfaceArr.length; i++) {
		if(interfaceArr[i].constructor !== Interface) {
			throw('第二个参数必须为接口实例')
		}
		for(var j = 0; j < interfaceArr[i].methods.length; j++) {
			if((!interfaceArr[i].methods[j] in instance) || typeof instance[interfaceArr[i].methods[j]] !== 'function') {
				throw(instance.constructor.name + '类没有实现接口' + interfaceArr[i].name + '中的:' + interfaceArr[i].methods[j] + '方法')
			}
		}
	}
	return true
}