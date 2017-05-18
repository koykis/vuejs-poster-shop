//console.log(Vue);
new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{ title: 'Mpiftekia' },
			{ title: 'Souvlakia' },
			{ title: 'Mprizoles' }
		],
		cart: []
	},
	methods: {
		addItem: function(index) {
			this.total+=9.99;
			var item = this.items[index];
			this.cart.push({
				title: item.title,
				qty: 1
			});
			console.log(this.cart.length);
		}
	}
});