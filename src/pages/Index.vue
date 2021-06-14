<template>
  <tabs>
    <tab title="Employer" v-model:payment="salaryByEmployer"></tab>
    <tab title="Employee" v-model:payment="salaryByEmployee"></tab>
  </tabs>
  <modal v-if="bothSalariesEntered" @close="resetSalaries"></modal>
</template>

<script>
import { ref, computed } from 'vue'

import Modal from '../components/Modal.vue'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'

export default {
  components: {
    Modal,
    Tabs,
    Tab
  },
  setup () {
    const salaryByEmployer = ref(null)
    const salaryByEmployee = ref(null)

    const resetSalaries = function () {
      salaryByEmployee.value = 0
      salaryByEmployer.value = 0
    }

    const bothSalariesEntered = computed(() => salaryByEmployer.value > 0 && salaryByEmployee.value > 0)

    resetSalaries()

    return {
      resetSalaries,
      salaryByEmployee,
      salaryByEmployer,
      bothSalariesEntered
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
