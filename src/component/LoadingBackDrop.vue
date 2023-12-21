<template>
    <div class="w-full h-full flex justify-center items-center flex-col bg-slate-700" data-te-loading-management-init data-te-parent-selector="#loading-growing-spinner">
        <div data-te-loading-icon-ref
            class="inline-block h-[200px] w-[200px] animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"></div>
        <span data-te-loading-text-ref class="text-3xl mt-[50px]">努力搜尋中...</span>
    </div>
</template>

<script setup lang="ts">

</script>