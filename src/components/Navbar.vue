<script setup>
import { useRouter } from "vue-router";
import router from "../router";

const handleLogout = () => {
  localStorage.clear("Authorization");
  router.push("/");
};
</script>

<template>
  <div class="p-6 shadow-lg flex justify-between items-center">
    <h3 class="text-2xl">CMS</h3>
    <div class="flex gap-2 items-center text-lg">
      <RouterLink to="/home" v-slot="{ isActive }">
        <a
          :class="[
            'block py-2 px-3 rounded transition-colors duration-200',
            isActive
              ? 'bg-green-100 text-green-500'
              : 'text-black  dark:text-gray-200 dark:hover:bg-gray-800',
          ]"
        >
          Home
        </a>
      </RouterLink>
      <RouterLink to="/users" v-slot="{ isActive }">
        <a
          :class="[
            'block py-2 px-3 rounded transition-colors duration-200',
            isActive
              ? 'bg-green-100 text-green-500'
              : 'text-black  dark:text-gray-200 dark:hover:bg-gray-800',
          ]"
        >
          Users
        </a>
      </RouterLink>
      <RouterLink to="/contents" v-slot="{ isActive }">
        <a
          :class="[
            'block py-2 px-3 rounded transition-colors duration-200',
            isActive
              ? 'bg-green-100 text-green-500'
              : 'text-black  dark:text-gray-200 dark:hover:bg-gray-800',
          ]"
        >
          Contents
        </a>
      </RouterLink>
      <RouterLink to="/comments" v-slot="{ isActive }">
        <a
          :class="[
            'block py-2 px-3 rounded transition-colors duration-200',
            isActive
              ? 'bg-green-100 text-green-500'
              : 'text-black  dark:text-gray-200 dark:hover:bg-gray-800',
          ]"
        >
          Comments
        </a>
      </RouterLink>
    </div>
    <button class="text-lg" @click="handleLogout">Logout</button>
  </div>
</template>
