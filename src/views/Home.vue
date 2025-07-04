<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Card from "../components/Card.vue";
import Navbar from "../components/Navbar.vue";
import axios from "axios";

let totalContent = ref(0);
let totalUsers = ref(0);
let totalCategories = ref(0);
let contentInterval = null;
let userInterval = null;
let categoryInterval = null;

let fetchTotalContents = async () => {
  try {
    let token = localStorage.getItem("Authorization");
    let response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/total-content`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    totalContent.value = response.data.totalContents;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  }
};
let fetchTotalUsers = async () => {
  try {
    let token = localStorage.getItem("Authorization");
    let response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/total-users`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    totalUsers.value = response.data.totalUsers;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  }
};
let fetchTotalCategories = async () => {
  try {
    let token = localStorage.getItem("Authorization");
    let response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/total-categories`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    totalCategories.value = response.data.totalCategories;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  }
};

onMounted(() => {
  fetchTotalContents();
  fetchTotalUsers();
  fetchTotalCategories();
  contentInterval = setInterval(fetchTotalContents, 10000);
  userInterval = setInterval(fetchTotalUsers, 10000);
  categoryInterval = setInterval(fetchTotalCategories, 10000);
});

onUnmounted(() => {
  if (contentInterval) {
    clearInterval(contentInterval);
  }
  if (userInterval) {
    clearInterval(userInterval);
  }
  if (categoryInterval) {
    clearInterval(categoryInterval);
  }
});
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="h-fit top-0 sticky overflow-hidden bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="h-full overflow-y-scroll p-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card :value="totalUsers" title="Total Users"> </Card>
        <Card :value="totalContent" title="Total Contents"> </Card>
        <Card :value="totalCategories" title="Total Categories"> </Card>
      </div>
    </div>
  </div>
</template>
