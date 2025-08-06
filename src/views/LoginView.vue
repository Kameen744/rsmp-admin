<template>
  <div class="flex items-center justify-center min-h-screen w-96">
    <div class="px-8 py-10 bg-white rounded-lg shadow-xl w-full max-w-sm">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-800">Login</h1>
        <!-- <p class="text-gray-500">Access your account</p> -->
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-700"
            >Email Address</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <div v-if="errorMessage" class="mb-4 text-sm text-center text-red-600">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {{ isLoading ? "Signing In..." : "Sign In" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PocketBase from "pocketbase";

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const pb = new PocketBase("https://pb-api.resourcetrackr.com");
const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(email.value, password.value);
    localStorage.setItem("userToken", authData.token);
    router.push({ name: "admin" });
  } catch (error) {
    console.error("Login Failed:", error.message);
    errorMessage.value = "Login failed. Please check your credentials.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    router.push({ name: "admin" });
  }
});
</script>
