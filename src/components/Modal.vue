<template>
  <div class="modal-box">
    <div class="modal">
      test
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  props: {
  },
  emits: ['close'],
  setup (props, { emit }) {

    const closeModal = function () {
      emit('close')
    }

    return {
      closeModal
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
    display: flex;

    .modal {
      background-color: #ffffff;
      margin: auto;
    }
  }
</style>
