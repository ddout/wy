/**
 * 分页
 */
Vue.component('comp-dd-pagination', {
	props: ['parmas'],
	computed: {
		getRowsCount:function(){
			return this.parmas.rowsCount;
		},
		getPage:function(){
			return this.parmas.start;
		},
		getPageSize:function(){
			var limit = this.parmas.limit;
			var rowsCount = this.parmas.rowsCount;
			if(rowsCount == 0){
				return 1;
			} else if(rowsCount/limit <= 1){
				return 1;
			} else if(rowsCount%limit == 0){
				return parseInt(rowsCount/limit,10);
			} else {
				return parseInt(rowsCount/limit,10)+1;
			}
		}
	},
	methods: {
		prev:function(){
			if(this.getPage <= 1){
				return;
			}
			this.$emit('prev')
		},
		next:function(){
			if(this.getPage >= this.getPageSize){
				return;
			}
			this.$emit('next')
		}
	},
	template:'\
		<nav aria-label="Page navigation">\
		  <ul class="pagination">\
		    <li>\
		      <a aria-label="Previous" v-on:click="prev">\
		        <span aria-hidden="true">&laquo;</span>\
		      </a>\
		    </li>\
			<li><a>共{{getRowsCount}}条</a></li>\
		    <li><a>第{{getPage}}/{{getPageSize}}页</a></li>\
		    <li>\
		      <a aria-label="Next" v-on:click="next">\
		        <span aria-hidden="true">&raquo;</span>\
		      </a>\
		    </li>\
		  </ul>\
		</nav>'

});
