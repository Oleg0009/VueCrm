<template>
<div class="app-main-layout">
  <Loader v-if="loading"/>
  <div v-else>
      <Navbar @click="isOpen = !isOpen"/>
      <Sidebar v-model="isOpen"/>
      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/apps/Navbar';
import Sidebar from '@/components/apps/Sidebar';


import Loader from '@/components/apps/Loader';

export default {
  name:'main-layout',
  data:()=>({
    isOpen:true,
    loading:true,
  }),
  async mounted(){
    if(!Object.keys(this.$store.getters.info).length){
      await this.$store.dispatch('fetchInfo');
    }
       this.loading = false;
  },
  components:{
    Navbar,
    Sidebar,
    Loader
  }
}
</script>
