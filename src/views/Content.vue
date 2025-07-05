<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import axios from "axios";

let contents = ref([]);

let fetchContents = async () => {
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
    contents.value = response.data.contents;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  }
};

let publishContent = async (id) => {
  try {
    let token = localStorage.getItem("Authorization");
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/content/publish/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  } finally {
    fetchContents();
  }
};

let draftContent = async (id) => {
  try {
    let token = localStorage.getItem("Authorization");
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/content/draft/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  } finally {
    fetchContents();
  }
};

let deleteContent = async (id) => {
  try {
    let token = localStorage.getItem("Authorization");
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/admin/content/delete/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  } finally {
    fetchContents();
  }
};

onMounted(() => {
  fetchContents();
});
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="h-fit top-0 sticky overflow-hidden bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="h-full p-6 overflow-y-scroll">
      <table class="border w-full">
        <thead class="border bg-gray-100">
          <tr>
            <th class="text-left px-4 py-2">title</th>
            <th class="text-left px-4 py-2">status</th>
            <th class="text-left px-4 py-2">slug</th>
            <th class="text-left px-4 py-2">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cont, index) in contents" :key="index">
            <td class="px-4 py-2">{{ cont.title }}</td>
            <td class="px-4 py-2">{{ cont.status }}</td>
            <td class="px-4 py-2">{{ cont.slug }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button
                v-if="cont.status !== 'PUBLISHED'"
                class="px-4 py-2 rounded-lg bg-green-500 text-white hover:cursor-pointer hover:bg-green-300"
                @click="publishContent(cont.id)"
              >
                Publish this content
              </button>
              <button
                v-else
                class="px-4 py-2 rounded-lg bg-yellow-500 hover:cursor-pointer hover:bg-yellow-300"
                @click="draftContent(cont.id)"
              >
                Draft this content
              </button>
              <button
                class="px-4 py-2 rounded-lg bg-red-500 hover:cursor-pointer hover:bg-red-300 text-white"
                @click="deleteContent(cont.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
