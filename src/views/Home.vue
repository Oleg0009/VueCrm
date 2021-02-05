<template>
 <div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <div class="row">
      <CurrentCurrency/>
      <Currencies/>
  </div>
</div>
</template>
<script>
import Currencies from '@/components/home/Currencies';
import CurrentCurrency from '@/components/home/CurrentCurrency';

export default {
  components:{
    Currencies,
    CurrentCurrency
  }
}
</script>


