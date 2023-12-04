<template>
    <ul class="border-2 w-full h-full">
        <li class="border-2 w-full flex items-center" :class="[`h-[${100/rows}%]`]" v-for="user in userList" :key="user.id"
        >{{ user.name }}</li>
    </ul>
</template>

<script setup lang="ts">
import { User } from "@/types/user"
defineProps<{
    rows:number,
    userList:User[]
}>()
</script>