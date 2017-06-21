console.log(Vue);

var PRICE = 9.99;
var LIMIT = 5
new Vue({
    el:'#app',
    data: {
        total:0,
        items: [ ],
        cart: [],
        results:[],
        newSearch:'dogs',
        lastSearch:'',
        loading:false,
        price:PRICE
    },
    methods: {
        appendItems:function(){
           if(this.items.length < this.results.length){
            var append =  this.results.slice(this.items.length, this.items.length + LIMIT)
            this.items = this.items.concat(append)
           }
        },
        onSubmit: function() {
            console.log(this.$http)
            this.items = []
            this.loading = true
            this.$http.get('/search/'.concat(this.newSearch))
            .then(function(res){
               this.lastSearch - this.newSearch
               this.results = res.data
              // this.items = res.data.slice(0,LIMIT)  // see slice above im apprend method
               this.appendItems()
               this.loading = false
            })
        },
        addItem: function(index) {
          console.log(index)
          this.total += PRICE
          var item = this.items[index]
          var found = false
          //if item is already push in to the cart, just increse it ++
          for (var i = 0; i < this.cart.length; i++) {
              if(this.cart[i].id === item.id){
                  found = true
                  this.cart[i].qty++
                  break
              }
              
          }
          //this.cart.push(this.items[index])
          if(!found){  // if not found, then push item to cart
                this.cart.push({
                id: item.id,
                title:item.title,
                qty:1,
                price:PRICE
                })
          }
          

        },
        incBtn: function(item) {
          item.qty++
          this.total += PRICE
        },
        decBtn: function(item) {
          item.qty--
          this.total -= PRICE
          if(item.qty <= 0) {  // remove item from cart
             for(var i=0; i < this.cart.length; i++) {
                 if(this.cart[i].id === item.id){
                     this.cart.splice(i,1)
                     break
                 }
             }
          }
        }
    },
    filters: {
        currency: function(price) {
            return '$ '.concat(price.toFixed(2))
        }
    },
    mounted: function(){
        this.onSubmit()

        //scroll
         var vueInstance = this
        // var elem = document.getElementById('product-list-bottom')
        // var watcher = scrollMonitor.create(elem)
        // watcher.enterViewport(function(){
        //     vueInstance.appendItems()
        // })
        var elem = document.getElementById('product-list-bottom')
            var watcher = scrollMonitor.create(elem)
            watcher.enterViewport(function(){
            console.log('enter view port 777')
            vueInstance.appendItems()
        })
    }
})

// var elem = document.getElementById('product-list-bottom')
// var watcher = scrollMonitor.create(elem)
// watcher.enterViewport(function(){
//            console.log('enter view port 666666')
//         })