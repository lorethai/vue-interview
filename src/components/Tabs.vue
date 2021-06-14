<template>
  <ul>
    <li v-for="tab in tabs" :key="tab.title" :class="{active: activeTab === tab.props.title}" @click="activateTab(tab.props.title)">{{ tab.props.title }}</li>
  </ul>
  <slot></slot>
</template>

<script>
import { ref, reactive, provide } from 'vue'

export default {
  name: "Tabs",
  setup (props, { slots }) {
    const tabs = reactive(slots.default ? slots.default() : [])
    const activeTab = ref(tabs[0].props.title)

    provide('activeTab', activeTab)

    const activateTab = function (title) {
      if (activeTab.value === title) return false
      activeTab.value = title
    }

    return {
      activeTab,
      tabs,
      activateTab
    }
  }
}
</script>

<style scoped lang="scss">
  ul {
    padding: 0;
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: auto;
    background-color: #d2fcfc;

    li {
      padding: 20px;
      display: flex;
      list-style-type: none;
      cursor: pointer;
      background-color: lightblue;

      &.active {
        background-color: lightcoral;
      }
    }
  }
</style>
