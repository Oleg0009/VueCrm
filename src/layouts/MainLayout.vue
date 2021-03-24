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
      <div class="fixed-action-btn" v-tooltip="'Add new category'">
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

import messages from '@/utils/messages';

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
   computed:{
    error(){
      return this.$store.getters.error;
    }
  },
  watch:{
    error(fbError){
       return this.$error(messages[fbError.code] || 'Something went wrong');
    }
  },
  components:{
    Navbar,
    Sidebar,
    Loader
  }
}
</script>
