<template>
 <div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small">
      <i class="material-icons" @click="refresh">refresh</i>
    </button>
  </div>
  <Loader v-if="loading"/>
  <div v-else class="row">

      <CurrentCurrency
       :rates="currency.rates"
      />
      <Currencies
       :rates="currency.rates"
       :date="currency.date"
       />
  </div>
</div>
</template>
<script>
import Currencies from '@/components/home/Currencies';
import CurrentCurrency from '@/components/home/CurrentCurrency';

import Loader from '@/components/apps/Loader';

export default {
  data:()=>({
    loading:true,
    currency:null
  }),
  async mounted(){
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  methods:{
    async refresh(){
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    }
  },
  components:{
    Currencies,
    CurrentCurrency
  }
}
</script>


