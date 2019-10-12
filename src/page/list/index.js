









require('./index.css');
require('@/common/nav/index.js');
require('@/common/header/index.js');
var _mm = require('util/mm.js');

var templateIndex=require('./index.string');
var _product=require('service/product-service.js');

var page={
	data:{
		listParam:{
			keyword:_mm.getUrlParam('keyword')||'',
			categoryId:_mm.getUrlParam('categoryId')||'',
			orderBy:_mm.getUrlParam('orderBy')||'default',
			pageNum:_mm.getUrlParam('pageNum')||1,
			pageSize:_mm.getUrlParam('pageSize')||17
		}
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		this.loadList();
	},
	bindEvent:function(){
		var _this=this
		$('.sort-item').click(function(){
			var $this=$(this);
			_this.data.listParam.pageNum=1;
			if($this.data('type')==='default'){
				if ($this.hasClass('active')) {
					return;
				}else{
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					_this.data.listParam.orderBy='default';
				}
			}else if ($this.data('type')==='price') {
				$this.addClass('active');
				if (!$this.hasClass('asc')) {
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy='price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy='price_desc';
				}
			}
			_this.loadList();
		})
	},
	loadList:function(){
		var _this=this,
		listHtml='',
		listParam=this.data.listParam,
		$pListCon=$('.p-list-con');
		$pListCon.html('<div class="loading"></div>');
		listParam.categoryId ? (delete keyword):(delete listParam.categoryId);
		_product.getProductList(listParam,function(res){
			console.log(res);
			for(var i=0;i<res.list.length;i++){
				if(!res.list[i].mainImage){
					res.list.splice(i,1);
				}
				if(!(/\.(gif|png|jpg|jpeg).??.*$/.test(res.list[i].mainImage))){
					res.list.splice(i,1);
				}
			}
			listHtml=_mm.renderHtml(templateIndex,{
				list:res.list
			});
			$pListCon.html(listHtml);
		},function(){
			_mm.errorTips();
		});
	}
}
$(function(){
	page.init();
})