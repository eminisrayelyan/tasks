<script setup>
import './TaskItem.css'
const props = defineProps({
    task: Object
})

const emits = defineEmits(['deleteTask']);

// function handleEdit (id) {
//     emits('editTask', id);
// }

function handleDelete (task) {
    emits('deleteTask', task)
}
</script>

<template>
   <div>
        {{  props.task.title }}
        <div>
            <button @click="handleEdit(props.task)" class="edit">Edit</button>
            <button @click="handleDelete(props.task.id)" class="delete">Del</button>
        </div>
    </div>
</template>