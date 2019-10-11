'use strict'
require('./index.css');
require('@/common/nav/index.js');
require('@/common/header/index.js');
var _mm = require('util/mm.js');

require('util/swiper/swiper-3.3.1.min.css');
require('util/swiper/swiper-3.3.1.min.js');
var templateBanner = require('./banner.string');

var bannerHtml = _mm.renderHtml(templateBanner);
$('.banner-con').html(bannerHtml);

var mySwiper =new Swiper('.swiper-container',{
	autoplay: 2000,
	autoplayDisableOnInteraction:false,
	pagination:'.swiper-pagination',
	loop:true
});