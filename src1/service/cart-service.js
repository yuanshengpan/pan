'use strict'

var _mm = require('util/mm.js');

var _cart = {
	// 1、登出
	getCartCount: function (resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			// 如果没有指定POST,则默认使用GET的请求方式
			success: resolve,
			error: reject
		})
	},
	addToCart:function(productInfo,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/cart/add.do'),
			data:productInfo,
			method:'POST',
			success: resolve,
			error: reject
		});
	}
}

module.exports = _cart;