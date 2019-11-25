'use strict'

require('./index.css');
var _mm = require('util/mm.js');
var templatePagination = require('./index.string');

var Pagination=function(){
	var _this=this;
	this.defaultOption={
		container:null,
		pageNum:1,
		pageRange:4,
		onSelectPage:null
	}
	$(document).on('click','.pg-item',function(){
		var $this=$(this);
		if ($this.hasClass('active')||$this.hasClass('disabled')) {
			return;
		}
		typeof _this.option.onSelectPage==='function' ? _this.option.onSelectPage($this.data('value')):null;
	});
}
Pagination.prototype.render = function(userOption) {
	this.option=$.extend({},this.defaultOption,userOption);
	if (!(this.option.container instanceof jQuery)) {
		return;
	}
	if (this.option.pages<=1) {
		return;
	}
	this.option.container.html(this.getPaginationHtml());
}
Pagination.prototype.getPaginationHtml=function(){
	var html='',
		option=this.option,
		pageArray=[],
		start=(option.pageNum - option.pageRange>0) ? (option.pageNum - option.pageRange) : 1,
		end=(option.pageNum + option.pageRange< option.pages) ? (option.pageNum + option.pageRange) : option.pages;
		pageArray.push({
			name:'上一页',
			value:this.option.prePage,
			disabled:!this.option.hasPreviousPage
		});
		for (var i = start; i <= end; i++) {
			pageArray.push({
				name:i,
				value:i,
				active:(i===option.pageNum),
			})
		}
		pageArray.push({
			name:'下一页',
			value:this.option.nextPage,
			disabled:!this.option.hasNextPage
		});
		html=_mm.renderHtml(templatePagination,{
			pageArray:pageArray,
			pageNum:option.pageNum,
			pages:option.pages
		})
		return html;
}
module.exports=Pagination;