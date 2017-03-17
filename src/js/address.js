new Vue({
    el: '.container',
    data: {
        addressList: [],
        limitNum: 3,
        currentIndex: 0,
        shippingMethods: 1
    },
    mounted: function(){
        var self = this;
        this.$nextTick(function(){
            self.getAddressList();
        });
    },
    computed: {
        filteredAddress: function(){
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function() {
            var self = this;
            this.$http.get('data/address.json').then(function(res){
                var res = res.data;
                console.log(res);
                if(res.status == '1') {
                    self.addressList = res.result;
                }
            });
        },
        loadMore: function() {
            if(this.limitNum == this.addressList.length) {
                this.limitNum = 3;
            } else {
                this.limitNum = this.addressList.length;
            }
        },
        setDefault: function(addressId) {
            this.addressList.forEach(function(address, index){
                if(address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        }
    }
});
