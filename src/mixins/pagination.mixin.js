import _ from 'lodash';

export default {
    data(){
        return {
            page:+this.$route.query.page || 1,
            pageSize:1,
            pageCount:0,
            allItems:[],
            items:[]
        }
    },
    methods:{
        setupPagination(allItems){
            this.allItems = _.chunk(allItems,this.pageSize);
            this.pageCount = _.size(this.allItems);
            this.items= this.allItems[this.page - 1] || this.allItems[0];
        }
    }
}