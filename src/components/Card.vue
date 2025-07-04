<script setup>
import { defineProps } from "vue";

defineProps({
  title: String,
  value: Number,
});
</script>

<template>
  <div class="bg-gray-100 rounded-lg shadow-md p-6">
    <slot>
      <div class="flex justify-between text-2xl">
        <p>{{ title }}</p>
        <p>{{ value }}</p>
      </div>
    </slot>
  </div>
</template>
