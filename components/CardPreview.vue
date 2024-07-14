<template>
    <div class="bg-white shadow-sm inline-block p-4 rounded-md border border-zinc-100">
        <p class="font-sans font-bold text-lg">{{ frontText }} Hello</p>
        <hr class="my-2">
        <p class="font-body text-zinc-500 text-base">{{ backText }} Back text</p>
    </div>
</template>

<script setup>
defineProps(["frontText", "backText"])
</script>