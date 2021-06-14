<template>
  <div v-if="isTabActive" class="tab">
    <h4 v-if="isDefaultPayment">You are entering your proposal as: {{title}}</h4>
    <h4 v-else>{{title}} accepted: {{payment}}</h4>
    <div>
      <input type="text" v-if="isDefaultPayment" v-model="salary" @keyup.enter="confirmSalary" :placeholder="placeholder">
      <button @click="confirmSalary" :disabled="!isDefaultPayment">Confirm</button>
    </div>
  </div>
</template>

<script>
import { ref, inject, computed } from 'vue'

export default {
  props: {
    title: String,
    placeholder: String,
    payment: Number,
  },
  setup (props, { emit }) {
    const activeTab = inject('activeTab')
    const isTabActive = computed(() => activeTab.value === props.title)
    const isDefaultPayment = computed (() => props.payment === null || props.payment === 0)

    const salary = ref(null)

    const confirmSalary = function () {
      if (salary.value > 0) {
        emit('update:payment', parseInt(salary.value))
      } else {
        alert('Try to propose a real salary, please!')
      }
    }

    return {
      isTabActive,
      isDefaultPayment,
      salary,
      confirmSalary
    }
  }
}
</script>

<style scoped lang="scss">
  .tab {
    padding: 20px;
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #f1f1f1;

    input {
      margin-right: 20px;
    }
  }
</style>
