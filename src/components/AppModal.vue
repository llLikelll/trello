<template>
  <transition name="modal">
    <div class="modal-bg" v-if="visible">
      <div class="modal">
        <div class="modal-header">
          <div>{{ title }}</div>
          <button type="button" class="close" @click.prevent="visible = false">&times;</button>
        </div>
        <div class="modal-body">
          <slot name="body">Контент</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const visible = defineModel({type: Boolean, default: false})

defineProps({
  title: {
    type: String,
    default: '',
  }
})
</script>

<style scoped>
.modal-bg {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.modal {
  width: 500px;
  margin-top: 5rem;
  background-color: #fff;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #000;
}

.modal-body {
  padding: 1rem;
}
</style>