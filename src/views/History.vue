<template>
  <div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>
  <Loader v-if="loading"/>
  <p v-else-if="!categories.length" class="center">No categories yet.<router-link to="/categories"> Add new category</router-link></p>
  <section v-else>
      <HistoryTable :records="records"/>
  </section>
</div>

</template>


<script>
import HistoryTable from "@/components/HistoryTable";
import Loader from '@/components/apps/Loader';
export default {
  data:()=>({
    categories:[],
    records:[],
    loading:true
  }),
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories');
    const records = await this.$store.dispatch('fetchRecords')

    this.records = records.map((record,indx)=>{
      return{
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        id:indx+1,
        typeClass: record.type === "outcome" ? "red" : "green",
        typeText: record.type === "outcome" ? "Outcome" : "Income"
      }
    })
    console.log( this.records);
    this.loading = false;
  },
  components:{
    HistoryTable,
    Loader
  } 
}
</script>
