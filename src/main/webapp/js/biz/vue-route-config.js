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
		// 单位
		name : 'compEnter',
		component : 'comp-enter',
		path : '/enter',
		meta : {
			libPath : 'components/enter'
		}
	}, {
		// 仓库
		name : 'compWarehouse',
		component : 'comp-warehouse',
		path : '/warehouse',
		meta : {
			libPath : 'components/warehouse'
		}
	}, {
		// 物料生产厂家
		name : 'compManu',
		component : 'comp-manu',
		path : '/manu',
		meta : {
			libPath : 'components/manu'
		}
	}, {
		// 购货单位
		name : 'compPurchase',
		component : 'comp-purchase',
		path : '/purchase',
		meta : {
			libPath : 'components/purchase'
		}
	}, {
		// 供应商
		name : 'compSupplier',
		component : 'comp-supplier',
		path : '/supplier',
		meta : {
			libPath : 'components/supplier'
		}
	}, {
		// 物料
		name : 'compItem',
		component : 'comp-item',
		path : '/item',
		meta : {
			libPath : 'components/item'
		}
	}, {
		//入库流程
		name : 'compBussStorage',
		component : 'comp-BussStorage',
		path : '/BussStorage',
		meta : {
			libPath : 'components/BussStorage'
		}
	}, {
		// 出库流程
		name : 'compBussIssue',
		component : 'comp-BussIssue',
		path : '/BussIssue',
		meta : {
			libPath : 'components/BussIssue'
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