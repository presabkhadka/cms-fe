<script setup>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import { onMounted, onUnmounted, ref } from "vue";

let users = ref([]);
let interval = null;
let isLoading = ref(false);
let deletingId = ref(null);

let fetchUsers = async () => {
  isLoading.value = true;
  try {
    let token = localStorage.getItem("Authorization");
    let response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/users`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    users.value = response.data.users;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  } finally {
    isLoading.value = false;
  }
};

let deleteUser = async (id) => {
  deletingId.value = id;
  try {
    let token = localStorage.getItem("Authorization");
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/delete-user/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    await fetchUsers();
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  } finally {
    deletingId.value = null;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="h-fit top-0 sticky overflow-hidden bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="h-full overflow-y-scroll p-6">
      <p v-if="isLoading">Loading...</p>
      <table class="border w-full" v-else>
        <thead class="border bg-gray-100">
          <tr>
            <th class="text-left px-4 py-2">Name</th>
            <th class="text-left px-4 py-2">Email</th>
            <th class="text-left px-4 py-2">Status</th>
            <th class="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.status }}</td>
            <td class="px-4 py-2">
              <button
                class="bg-red-500 hover:cursor-pointer hover:bg-red-300 px-4 py-2 rounded-lg text-white"
                @click="deleteUser(user.id)"
                v-if="deletingId !== user.id"
              >
                Delete
              </button>

              <button
                class="bg-red-500 px-4 py-2 rounded-lg text-white opacity-50 cursor-not-allowed"
                disabled
                v-else
              >
                Deleting...
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
