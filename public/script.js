var PRICE = 4.99;
var LOAD_NUM = 10;

new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [],
		cart: [],
		results: [],
		search: 'anime',
		lastSearch: '',
		loading: false,
		price: PRICE
	},
	computed: {
		noMoreItems: function() {
			return this.items.length === this.results.length && this.results.length > 0;
		}
	},
	methods: {
		appendItems: function() {
			if(this.items.length < this.results.length) {
				var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
				this.items = this.items.concat(append);
			}
		},
		onSubmit: function() {
			if(this.search.length != 0){
				this.items = [];
				var subURI = '/search/'+this.search;
				this.loading = true;
				this.$http
					.get(subURI)
					.then(function(res) {
						this.lastSearch = this.search;
						this.results = res.data;
						this.appendItems();
						this.loading = false;
					});
			}
		},
		addItem: function(index) {
			this.total += PRICE;
			var item = this.items[index];
			var found = false;
			for(var i = 0; i < this.cart.length; i++){
				if(this.cart[i].id === item.id){
					found = true;
					this.cart[i].qty++;
					break;
				}
			}
			if(!found){
				this.cart.push({
					id: item.id,
					title: item.title,
					price: PRICE,
					qty: 1
				});
			}
		},
		inc: function(item) {
			item.qty++;
			this.total += PRICE;
		},
		dec: function(item) {
			if(item.qty > 1){
				item.qty--;
				this.total -= PRICE;
			}else{
				alert('You only have 1!!');
			}
		},
		rem: function (item) {
			var sure = confirm('Are you sure you want to remove ' + item.title + ' from your cart?');
			if(sure === true){
				for(var i=0; i <= this.cart.length; i++){
					if(this.cart[i].id === item.id){
						this.cart.splice(i, 1);
						this.total = this.total - (PRICE * item.qty);
					}
				}
			}
		}
	},
	filters: {
		currency: function(price) {
			return price.toFixed(2)+'€';
		}
	},
	mounted: function() {
		this.onSubmit();

		var vueInstance = this;
		var elem = document.getElementById('product-list-bottom');
		var watcher = scrollMonitor.create(elem);
		watcher.enterViewport(function() {
			vueInstance.appendItems();
		});
	}
});