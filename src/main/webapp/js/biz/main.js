(function(win) {
	require.config({
		urlArgs: "bust=" + new Date().getTime(),
		baseUrl : 'js/biz/'
	});
	require(['vue-route-config', 'index/nav', 'comms/dd-pagination'],function(){
		require(['index/index']);
	});
})(window);