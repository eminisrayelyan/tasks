<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
    task: Object
})

const emits = defineEmits(['deleteTask']);
function handleDelete(task) {
    emits('deleteTask', task)
}
</script>

<template>
    <div class="task">
        {{ props.task.title }}
        <div>
            <FontAwesomeIcon :icon="faXmark" @click="handleDelete(props.task.id)" class="delete" />
        </div>
    </div>
</template>

<style scoped>
.task-name {
    font-size: 20px;
}

.edit {
    color: #FF643A;

}

.delete {
    color: red;
    cursor: pointer;
}
</style>