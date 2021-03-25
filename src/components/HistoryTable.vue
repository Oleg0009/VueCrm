<template>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
        <tr v-for="record in records" :key="record.id">
          <td>{{record.id}}</td>
          <td>{{record.amount | currency("UAH")}}</td>
          <td>{{record.date | data("datetime")}}</td>
          <td>{{record.categoryName}}</td>
          <td>
            <span class="white-text badge" :class="record.typeClass" >{{record.typeText}}</span>
          </td>
          <td>
            <button class="btn-small btn" v-tooltip="'Detail record page'" @click="$router.push('/detail-record/'+ record.id)">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
</template>
<script>
export default {
  props:{
    records:{
      type:Array,
      required:true
    }
  }
}
</script>
