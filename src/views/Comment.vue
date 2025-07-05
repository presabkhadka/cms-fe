<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import axios from "axios";

let comments = ref([]);

let fetchComments = async () => {
  try {
    let token = localStorage.getItem("Authorization");
    let response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/comments`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    comments.value = response.data.comments;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error", error.message);
    }
  }
};

let approveComment = async (id) => {
  try {
    let token = localStorage.getItem("Authorization");
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/comment/approve/${id}`,
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
    fetchComments();
  }
};

let rejectComment = async (id) => {
  try {
    let token = localStorage.getItem("Authorization");
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/admin/comment/reject/${id}`,
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
    fetchComments();
  }
};

let deleteComment = async (id) => {
  try {
    let token = localStorage.getItem("Authorization");
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/admin/comment/delete/${id}`,
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
    fetchComments();
  }
};

onMounted(() => {
  fetchComments();
});
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="h-fit top-0 sticky overflow-hidden bg-white shadow-lg">
      <Navbar />
    </div>
    <div class="h-full p-6 overflow-y-scroll">
      <table class="border w-full">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">comment</th>
            <th class="px-4 py-2 text-left">status</th>
            <th class="px-4 py-2 text-left">content id</th>
            <th class="px-4 py-2 text-left">user id</th>
            <th class="px-4 py-2 text-left">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(comment, index) in comments" :key="index">
            <td class="px-4 py-2">{{ comment.comment }}</td>
            <td class="px-4 py-2">{{ comment.status }}</td>
            <td class="px-4 py-2">{{ comment.content_id }}</td>
            <td class="px-4 py-2">{{ comment.user_id }}</td>
            <td class="flex gap-2 px-4 py-2">
              <button
                class="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-300 hover:cursor-pointer"
                v-if="
                  comment.status === 'PENDING' || comment.status === 'REJECTED'
                "
                @click="approveComment(comment.id)"
              >
                Approve
              </button>
              <button
                class="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-300 hover:cursor-pointer"
                v-else
                @click="rejectComment(comment.id)"
              >
                Reject
              </button>
              <button
                class="px-4 py-2 rounded-lg bg-red-500 hover:cursor-pointer hover:bg-red-300 text-white"
                @click="deleteComment(comment.id)"
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
