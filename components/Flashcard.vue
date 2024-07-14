<template>
    <div class=" bg-white p-8 rounded-lg shadow-sm border-zinc-100 border text-center">
        <div class="flex flex-col items-center mt-4 mb-6 gap-2">
            <div class="flex items-center text-gray-300 gap-2" v-if="onFront">
                <Icon name="tabler:sparkles"></Icon>
                <h3 class="uppercase  font-semibold" v-if="aiGenerated">AI generated</h3>
            </div>

            <h1 class="text-2xl font-semibold border-y border-zinc-200 py-4" v-if="onFront">{{ front }}</h1>
            <p v-if="!onFront" class="text-lg font-body text-gray-600">
                {{ back }}
            </p>
            <div class="flex gap-4 text-sm mt-2" v-if="onFront">
                <div class="flex items-center text-gray-300 gap-2">
                    <Icon name="tabler:checks"></Icon>
                    <h3 class="font-body font-medium">{{ timesCorrect }} correct</h3>
                </div>
                <div class="flex items-center text-gray-300 gap-2">
                    <Icon name="tabler:eye"></Icon>
                    <h3 class="font-body font-medium">{{ timesViewed }} viewed</h3>
                </div>
            </div>

        </div>
        <div class="border-2 border-zinc-100 p-2 rounded-md inline-block hover:bg-zinc-50" v-if="onFront">
            <button class="text-sm text-gray-400 " @click="reveal">
                <span
                    class="inline-block bg-sky-100 text-sky-700 uppercase font-bold px-1.5 py-1 rounded-md mr-2">Space</span>
                Reveal
            </button>

        </div>
        <div class="flex gap-4 justify-center" v-if="!onFront">
            <div class="flex border-2 border-zinc-100 p-2 rounded-md hover:bg-zinc-50">
                <button class="text-sm text-gray-400 " @click="() => nextCard(false)">
                    <span
                        class="inline-block bg-green-100 text-green-700 uppercase font-bold px-1.5 py-1 rounded-md mr-2">R</span>
                    Continue
                </button>

            </div>
            <div class="flex border-2 hover:bg-zinc-50 border-zinc-100 p-2 rounded-md"> <button
                    class="text-sm text-gray-400" @click="() => nextCard(false)">
                    <span
                        class="inline-block bg-red-100 text-red-700 uppercase font-bold px-1.5 py-1 rounded-md mr-2">F</span>
                    Forgot
                </button></div>
        </div>


    </div>
</template>

<script setup>
import axios from "axios"

defineProps(["aiGenerated", "front", "back", "timesCorrect", "timesViewed"])
const emit = defineEmits(['correct', 'incorrect'])

let onFront = ref(true)

function reveal() {
    onFront.value = false
}

function nextCard(correct) {
    if (correct) {
        emit('correct')
    } else {
        emit('incorrect')
    }
    onFront.value = true
}
</script>