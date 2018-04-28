//全局过滤器
Vue.filter('money', function(value, type){
	return '￥'+ value.toFixed(2) + type;
})

var vm = new Vue({
	el: '#app',
	data: {
		productList: [],
		totalMoney: 0,
		checkAllFlag: false,
		totalPrice: 0,
		delFlag: false,
		currentProduct: null,
	},
	filters: {
		//局部过滤器
		filterMoney: function(value) {
			return '￥'+ value.toFixed(2);
		}
	},
	mounted: function() {
		this.cartView();
		this.calTotalPrice();
	},
	methods: {
		cartView: function() {
			// var _this = this;
			this.$http.get('data/cartData.json', {"id": 123}).then(response=>{
				// console.log(response.data);
				this.productList = response.data.result.list;
				this.totalMoney = response.data.result.totalMoney;
			});
		},
		changeMoney: function(product, type) {
			if (type > 0) {
				//增加
				product.productQuantity++;
			} else {
				//减少
				product.productQuantity--;
				if (product.productQuantity < 1) {
					product.productQuantity = 1;
				}
			}
			this.calTotalPrice();
		},
		changeSelect: function(item) {

			if (typeof item.checked == 'undefined') {
				
				Vue.set(item, 'checked', true);
			} else {
				item.checked = !item.checked;
			}
			this.calTotalPrice();
		},
		checkAll: function(flag){
			this.checkAllFlag = flag;
			var _this = this;
			this.productList.forEach(function(value, index){
				if (typeof value.checked == 'undefined') {
					Vue.set(value, 'checked', _this.checkAllFlag);
				} else {
						value.checked = _this.checkAllFlag;
				}
			});
			this.calTotalPrice();

		},
		calTotalPrice: function() {
			var _this = this;
			_this.totalPrice = 0;
			this.productList.forEach(function(item, index){
				if (item.checked) {
					_this.totalPrice += item.productQuantity * item.productPrice; 
				}
			});

		},
		deleteProduct: function(item){
			this.delFlag = true;
			this.currentProduct = item;
		},
		deleteConfirm: function(){
			// var index = this.currentProduct.indexOf;
			var index = this.productList.indexOf(this.currentProduct);
			this.productList.splice(index, 1);
			this.delFlag = false;
		}
	}
})
