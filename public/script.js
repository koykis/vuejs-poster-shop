var PRICE = 4.99;

new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{ id: 1, title: 'Mpiftekia' },
			{ id: 2, title: 'Souvlakia' },
			{ id: 3, title: 'Mprizoles' }
		],
		cart: []
	},
	methods: {
		addItem: function(index) {
			this.total += PRICE;
			var item = this.items[index];
			var found = false;
			for(var i = 0; i < this.cart.length; i++){
				if(this.cart[i].id === item.id){
					found = true;
					this.cart[i].qty++;
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
			//console.log(this.cart.length);
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
			for(var i=0; i <= this.cart.length; i++){
				if(this.cart[i].id === item.id && sure === true){
					this.cart.splice(i, 1);
					this.total = this.total - (PRICE * item.qty);
				}
			}
		}
	},
	filters: {
		currency: function(price) {
			return price.toFixed(2)+'€';
		}
	}
});