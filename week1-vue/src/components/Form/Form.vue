<script setup>
import './Form.css'
import { watch, ref } from 'vue';

 const props = defineProps({
  editingTask: String
 })

let input = ref('');
const addTask = defineEmits(['addTask']);

function handleSubmit() {
  addTask('addTask', input.value);
  input.value = '';
}

// watch (
//   () => props.editingTask,
//   (task) => {
//     input.value = task  ?? '';
//   },
//   { immediate: true }
// )
</script>

<template>
  <form action="/" @submit.prevent="handleSubmit" class="todo-form">
    <input type="text" v-model="input" class="input">
      <button class="btn">Add Task</button>
  </form>
</template>

<style scoped></style>
