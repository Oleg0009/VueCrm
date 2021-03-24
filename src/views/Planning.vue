<template>
  
<div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>{{info.bill | currency("UAH")}}</h4>
  </div>
  <Loader v-if="loading"/>
  <p v-else-if="!categories.length" class="center">No categories yet.<router-link to="/categories"> Add new category</router-link></p>
  <section v-else>
    <div v-for="cat in categories" :key="cat.id">
      <p>
        <strong>{{cat.title}}</strong>
       {{cat.spend | currency("UAH")}} из {{cat.limit | currency("UAH")}}
      </p>
     
      <div class="progress" v-tooltip="cat.tooltip">
        <div
            class="determinate"
            :style="{ width: cat.progressPersent + '%'}"
            :class="[cat.progressColor]"
         
        ></div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
import Loader from '@/components/apps/Loader';
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
export default {
  name:"plannings",
  data:()=>({
    loading:true,
    categories:[]
  }),
  computed:{
    ...mapGetters(['info'])
  },
  async mounted(){
      const records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');
      this.categories = categories.map(category => {
        const spend = records
              .filter( r => category.id == r.categoryId)
              .filter(r=> r.type == "outcome")
              .reduce((total,current)=>{
                return total+=current.amount;
              },0);
        const percent = 100 * spend/category.limit;
        const progressPersent = percent > 100 ? 100 : percent; 
        const progressColor = percent < 60 
                    ? 'green'
                    : percent < 100
                    ? 'yellow'
                    : 'red'
        const tooltipVal = category.limit - spend;
        const tooltip = `${tooltipVal < 0 ? 'To much' : ' We have' } ${currencyFilter(Math.abs(tooltipVal))}`
        return {
          ...category,
          progressPersent,
          progressColor,
          spend,
          tooltip
        }
       
      })
      
      this.loading = false;
  },
  components:{
    Loader
  }
}
</script>
