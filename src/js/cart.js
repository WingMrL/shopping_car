var vm = new Vue({
    el: '#app',
    data: {
        productList: [],
        checkAllFlag: false,
        totalMoney: 0,
        delFlag: false,
        curProduct: null
    },
    filters: {
        formatMoney: function(value){
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function(){
        this.$nextTick(function(){
            this.cartView();
        });
    },
    methods: {
        cartView: function(){
            var self = this;
            this.$http.get('data/cart.json', {"id": 123}).then(function(res){
                console.log(res);
                self.productList = res.body.result.productList;
            });
        },
        changeMoney: function(item, way) {
            if(way > 0) {
                item.productQuentity ++;
            } else {
                item.productQuentity --;
                if(item.productQuentity < 1) {
                    item.productQuentity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function(item){
            if(typeof item.checked == 'undefined') {
                // Vue.set(item, 'checked', true);
                this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            var checkCount = 0;
            for(var i = 0, len = this.productList.length; i < len; ++ i) {
                if(typeof this.productList[i].checked != 'undefined' && this.productList[i].checked == true) {
                    checkCount ++;
                }
            }
            if(checkCount == this.productList.length) {
                this.checkAllFlag = true;
            } else {
                this.checkAllFlag = false;
            }
            this.calcTotalPrice();
        },
        checkAll: function(flag) {
            var self = this;
            this.checkAllFlag = flag;
            this.productList.forEach(function(item, index, arr) {
                if(typeof item.checked == 'undefined') {
                    self.$set(item, 'checked', self.checkAllFlag);
                } else {
                    item.checked = self.checkAllFlag
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function() {
            var self = this;
            this.totalMoney = 0;
            this.productList.forEach(function(item, index, arr){
                if(item.checked) {
                    self.totalMoney += item.productQuentity * item.productPrice;
                }
            });
        },
        delConfirm: function(item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function() {
            var index = this.productList.indexOf(this.curProduct);
            console.log(index);
            this.productList.splice(index, 1);
            this.delFlag = false;
            this.calcTotalPrice();
        }
    }
});
Vue.filter('money', function(value, type){
    return '￥' + value.toFixed(2) + type;
});
