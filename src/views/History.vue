<template>
  <div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>
  <Loader v-if="loading"/>
  <p v-else-if="!items.length" class="center">No categories yet.<router-link to="/categories"> Add new category</router-link></p>
  <section v-else>
      <HistoryTable :records="items"/>
      <Paginate
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="paginateHandler"
        :prevText="'Prev'"
        :nextText="'Next'"
        :containerClass="'pagination'"
        :page-class="'waves-effect'"/>
  </section>
</div>

</template>


<script>
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryTable from "@/components/HistoryTable";
import Loader from '@/components/apps/Loader';
export default {
  mixins:[paginationMixin],
  data:()=>({
    records:[],
    loading:true
  }),
  async mounted(){
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setupPagination(this.records.map((record)=>{
        return{
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === "outcome" ? "red" : "green",
          typeText: record.type === "outcome" ? "Outcome" : "Income"
        }
      })) 
      this.loading = false;
  },
  methods:{
    paginateHandler(page){
        this.$router.push(`${this.$route.path}?page=${page}`);
        this.items= this.allItems[page - 1] || this.allItems[0];
    }
  },
  components:{
    HistoryTable,
    Loader
  } 
}
</script>
