<template>
    <div class=" bg-white p-8 rounded-lg shadow-sm border-zinc-100 border text-center">
        <div class="flex flex-col items-center my-8">
            <div class="flex items-center text-gray-300 gap-2">
                <Icon name="tabler:sparkles"></Icon>
                <h3 class="uppercase  font-semibold" v-if="aiGenerated">AI generated</h3>
            </div>

            <h1 class="text-2xl font-semibold mt-2">What is an Arrhenius base?</h1>
        </div>
        <div class="border-2 border-zinc-100 p-2 rounded-md inline-block">
            <p class="text-sm text-gray-400">
                <span
                    class="inline-block bg-sky-100 text-sky-700 uppercase font-bold px-1.5 py-1 rounded-md mr-2">Space</span>
                Reveal
            </p>
        </div>

    </div>
</template>

<script setup>
defineProps(["aiGenerated"])
</script>