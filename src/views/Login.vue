<script setup>
import axios from "axios";
import { ref } from "vue";
import router from "../router";

let email = ref("");
let password = ref("");
let isLoading = ref(false);

let submitForm = async () => {
  isLoading.value = true;
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/admin/login`,
      {
        email: email.value,
        password: password.value,
      }
    );

    let token = response.data.token;
    localStorage.setItem("Authorization", `Bearer ${token}`);
    router.push("/home");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error occured", error.message);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-2 h-screen">
    <div class="col-span-5 h-full flex items-center justify-center">
      <form @submit.prevent="submitForm">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col justify-between gap-2">
            <label for="email" class="text-slate-500">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              class="p-2 border rounded-lg border-slate-300"
              v-model="email"
            />
          </div>
          <div class="flex flex-col justify-between gap-2">
            <label for="password" class="text-slate-500">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              class="p-2 border rounded-lg border-slate-300"
              v-model="password"
            />
          </div>

          <button
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-300 to-green-300 text-white hover:scale-105 hover:cursor-pointer animate-bounce"
            type="submit"
            v-if="isLoading"
            disabled
          >
            Logging in...
          </button>

          <button
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-300 to-green-300 text-white hover:scale-105 hover:cursor-pointer"
            type="submit"
            v-else="isLoading"
          >
            Login
          </button>
        </div>
      </form>
    </div>
    <div
      class="col-span-7 bg-gradient-to-r from-blue-300 to-green-300 flex items-center justify-center rounded-l-3xl"
    >
      <h3 class="text-white text-8xl">Login</h3>
    </div>
  </div>
</template>
