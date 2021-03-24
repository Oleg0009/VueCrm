<template>
<div>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>
  <p v-if="!categories.length" class="center">No categories yet.<router-link to="/categories"> Add new category</router-link></p>
  <Loader v-else-if="loading"/>
  <form @submit.prevent="submitHandler"  v-else class="form">
       <div class="input-field" >
          <select ref="select" v-model="category">
            <option v-for="category in categories"
              :key="category.id"
              :value="category.id">
              {{category.title}}
              </option>
          </select>
          <label>Выберите категорию</label>
        </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid:($v.amount.$dirty && !$v.amount.minValue) || ($v.amount.$dirty && !$v.amount.required)}"
      >
      <label for="amount">Сумма</label>
      <span 
       v-if="$v.amount.$dirty && !$v.amount.minValue"
      class="helper-text invalid">Ammount value is not correct</span>
        <span
      v-else-if="$v.amount.$dirty && !$v.amount.required"
      class="helper-text invalid">Enter ammount</span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid:($v.description.$dirty && !$v.description.required  )}"
      >
      <label for="description">Описание</label>
      <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid">Enter description</span>
    
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>

import Loader from '@/components/apps/Loader';

import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  name:'Record',
  data:()=>({
    categories:[],
    loading:true,
    select:null,
    category:null,
    type: 'outcome' ,
    amount:1,
    description:''
  }),
  validations:{
    description:{ required },
    amount:{ required, minValue : minValue(1) }
  }, 
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
    if( this.categories.length > 0 ){
      this.category = this.categories[0].id;
    }
    setTimeout(()=>{
     this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    },0);
  
  },
  beforeDestroy(){
    if(  this.select &&  this.select.destroy ){
       this.select.destroy();
    }
  },
  computed:{
    ...mapGetters(['info']),
    canCreateRecord(){
      if(this.type == 'income'){
        return true
      }
      return this.info.bill >= this.amount 
    }
  },
  methods:{
   async submitHandler(){
      if(this.$v.$invalid){
          this.$v.$touch();
          return
      }
      
      if(this.canCreateRecord){
        try{
          if(this.type == 'income'){
            await this.$store.dispatch('changeBill', this.info.bill + this.amount) ;
          }
          else{
            await this.$store.dispatch('changeBill', this.info.bill - this.amount) ;
          }
        
          await this.$store.dispatch('createRecord', {
            categoryId:this.category,
            amount:this.amount,
            description:this.description,
            type:this.type,
            date:new Date().toJSON()
          }) 
        }
        catch(e){
          throw e
        }
      
      }else{
        this.$message(`No enought money on the bill (${ this.amount - this.info.bill})`)
      }



    }
  }

}
</script>
