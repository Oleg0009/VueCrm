<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
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
import { Pie } from 'vue-chartjs';
export default {
  extends:Pie,
  mixins:[paginationMixin],
  data:()=>({
    records:[],
    loading:true
  }),
  async mounted(){
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setupGraph(categories);
    this.loading = false;
  },
  methods:{
    setupGraph(categories){ 
      console.log(),
        this.setupPagination(this.records.map((record)=>{
        return{
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === "outcome" ? "red" : "green",
          typeText: record.type === "outcome" ? "Outcome" : "Income"
        }
      })) 
      this.renderChart({
            labels: categories.map(c=>c.title),
            datasets: [{
                label: 'Расходы по категориям',
                data: categories.map(c =>{
                  return this.records.reduce((total,r )=>{
                    if(r.categoryId === c.id && r.type === 'outcome'){
                      total += +r.amount
                    }
                    return total
                  },0)
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        });
    },
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
