<template>
  <RouterView />
</template>

<script setup>
import { RouterView, useRouter } from "vue-router";

const router = useRouter();
router.push("/page-game");
</script>
