<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
     <Loader v-if="loading"/>
    <section v-else>
      <div class="row">
        <CreateCategory @created = 'addNewCategory' />
        <CorrectCategory
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          @updated="categoryUpdate"
        />
        <p class="center" v-else>
          No categories yet
        </p>
      </div>
    </section>
  </div>
</template>
<script>

import Loader from '@/components/apps/Loader';

import CreateCategory from '@/components/categories/CreateCategory';
import CorrectCategory from '@/components/categories/CorrectCategory';

export default {
  data:()=>({
    categories:[],
    loading:true,
    updateCount:0
  }),
  components:{
    CreateCategory,
    CorrectCategory,
    Loader
  },
  async mounted(){
     this.categories = await this.$store.dispatch('fetchCategories');
     this.loading = false;
  },
  methods:{
    addNewCategory(category){
      this.categories.push(category);
    },
    categoryUpdate(category){
      const indx = this.categories.findIndex( c => c.id === category.id );
      this.categories[indx].title = category.title;
      this.categories[indx].limit = category.limit;
      this.updateCount++;
    }
  }
}
</script>
