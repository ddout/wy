const
router = new VueRouter({
	routes : [ {
		name : 'index',
		path : '/',
		component : {
			template : '<div class="text-center">this is index!!!</div>'
		}
	}, {
		name : 'p404',
		path : '/404',
		component : {
			template : '<div class="text-center">this is 404!!!</div>'
		}
	}, {
		name:'bar-test',
		path : '/bar',
		component : {
			template : '<div>bar</div>'
		}
	}, {
		// 物料生产厂家
		name : 'compManu',
		component : 'comp-manu',
		path : '/manu',
		meta : {
			libPath : 'components/manu'
		}
	} ]
});
//
router.beforeEach(function(to, from, next) {
	if (to['name'] == null) {
		next('/404');
	} else if (to['meta']['libPath'] != '') {
		require([ to['meta']['libPath'] ], function() {
			next();
		});
	} else {
		next();
	}
});