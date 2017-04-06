/**
 * 分页
 */
Vue.component('comp-dd-pagination', {
	data: function(){
		return {
			page:1,
			pageSize:1
		};
	},
	watch:{
		'$route': 'fetchData'
	},
	created: function() {
	    this.fetchData()
	},
	methods: {
		fetchData: function(){
			this.page = 1;
			this.pageSize = 1;
		},
		prev:function(){
			if(this.page <= 1){
				return;
			}
			this.page = this.page -1;
			this.$emit('prev')
		},
		next:function(){
			if(this.page >= this.pageSize){
				return;
			}
			this.page = this.page + 1;
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
		    <li><a>{{page}}/{{pageSize}}</a></li>\
		    <li>\
		      <a aria-label="Next" v-on:click="next">\
		        <span aria-hidden="true">&raquo;</span>\
		      </a>\
		    </li>\
		  </ul>\
		</nav>'

});
