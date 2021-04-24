<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'income' ? 'Income' : 'Outcome'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
              'red':record.type ==='outcome',
              'green':record.type ==='income',
          }">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount}}</p>
              <p>Категория:{{record.categoryName}}</p>

              <small>{{record.date | data('datatime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else> No such record </p>
  </div>
</template>
<script>

import Loader from '../components/apps/Loader.vue'


export default {
  name:'detail',
  data:()=>({
    record:null,
    loading:true
  }),
  async mounted(){
        // this.categories = await this.$store.dispatch('fetchCategories');


  
        const recordId = this.$route.params.id;
        const record = await this.$store.dispatch('fetchRecordById',recordId);
        const category = await this.$store.dispatch('fetchCategoryById',record.categoryId);
        console.log(record);
        this.record = {
          ...record,
          categoryName:category.title
        }
        this.loading = false;

  },
  components:{
    Loader
  }
}
</script>
