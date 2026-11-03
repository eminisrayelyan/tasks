<script setup>
import { ref } from 'vue';

let input = ref('');
const addTask = defineEmits(['addTask']);

function handleSubmit() {
  addTask('addTask', input.value);
  input.value = '';
}
</script>

<template>
  <form action="/" @submit.prevent="handleSubmit" class="todo-form">
    <input type="text" v-model="input" class="input">
      <button class="btn">Add Task</button>
  </form>
</template>

<style scoped>
.todo-form {
  position: relative;
}

.input {
  background-color: #EBEDEF;
  border: none;
  height: 34px;
  width: 290px;
  border-radius: 20px;
  padding: 10px;
  font-size: 20px;
}

.btn {
  background-color: #FF643A;
  border: none;
  color: #FFFFFF;
  height: 34px;
  border-radius: 20px;
  width: 90px;
  cursor: pointer;
  position: absolute;
  right: 0;
}
</style>