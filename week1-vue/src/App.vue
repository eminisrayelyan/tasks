<script setup>
import { reactive, ref } from 'vue';
import Form from './components/Form/Form.vue'
import TaskItem from './components/TaskItem/TaskItem.vue';
let tasks = ref([])
let id = ref(0);
let editingTask = ref(null)

function addTask(inputValue) {
  if (!inputValue.trim()) {
    alert('Please write a task');
    return;
  }
  tasks.value.push(
    {
      id: ++id.value,
      title: inputValue.trim(),
      completed: false
    }
  )
}

// function editTask (task) {
//   editingTask.value = task.title;
// }

function deleteTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id);
}
</script>

<template>
  <div class="todo-container">
    <Form @addTask="addTask" :editingTask="editingTask"></Form>
    <div class="task-list">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @deleteTask="deleteTask"></TaskItem>
    </div>
  </div>



</template>

<style scoped></style>
