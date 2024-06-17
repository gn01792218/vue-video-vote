
<template>
    <section class="w-[88%] relative mx-auto">
        <button class="block border-2 p-5" @click="reset">重置</button>
    </section>
</template>

<script setup lang="ts">
import { reset } from "../api"
</script>