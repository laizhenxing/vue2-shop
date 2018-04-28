var vm = new Vue({
	el: '.container',
	data: {
		addressList: [],
		limitNum: 3,
		currentIndex: 0,
		sendIndex: 1,
	},
	mounted: function() {
		this.$nextTick(function(){
			this.getAddressList();
		});
	},
	computed: {
		filterAddress: function() {
			
			return this.addressList.slice(0, this.limitNum);
		}
	},
	methods: {
		getAddressList: function(){
			var _this = this;
			this.$http.get('data/address.json').then(function(response){
				if (response.data.status == '0') {
					_this.addressList = response.data.result;
				}
				
			})
		},
		setDefault: function(addressId) {
			this.addressList.forEach(function(address, index) {
				if (address.addressId == addressId) {
					address.isDefault = true;
				} else {
					address.isDefault = false;
				}
			});
		},
		addresDelete: function(address) {
			var index = this.addressList.indexOf(address);
			this.addressList.splice(index,1);
		}
	}
})