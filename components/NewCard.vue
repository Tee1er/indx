<script setup>
import axios from "axios"

let props = defineProps(["active", "deck"])
const emit = defineEmits(['closeNewCard', 'clicked'])


let generating = ref(false)

let text = ""

function updateTextArea(t) {
    text = t
}

async function generateCards(deckId) {
    generating.value = true
    console.log(props.deck)
    // make request to OpenAI api to generate cards
    let res = await axios.post(`http://127.0.0.1:3391/decks/generate/${props.deck.id}`, {
        data: text,
    })

    generating.value = false
    emit('closeNewCard')
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div @click="$emit('clicked')" v-if="!active"
            class=" bg-zinc-50 p-8 rounded-lg shadow-sm border-zinc-200 border text-center flex gap-2 justify-center items-center text-gray-400 hover:bg-zinc-100">
            <Icon name="tabler:plus" class="text-2xl" v-if="!active"></Icon>
            <h1 class="inline-block font-semibold text-xl" v-if="!active">New card</h1>
        </div>
        <div v-if="active"
            class=" bg-white p-8 rounded-lg shadow-sm border-zinc-200 border text-center flex gap-2 justify-center items-center text-gray-400">
            <div v-if="active" class="text-left w-full text-zinc-600 flex-col flex gap-4">
                <div class="flex items-center gap-2">
                    <Icon name="tabler:sparkles" class="text-2xl"></Icon>
                    <h1 class="font-semibold text-2xl">Generate cards</h1>
                </div>
                <div>
                    <label for="content" class="block mb-2  font-body font-medium uppercase text-gray-400 text-xs">Text
                        to
                        generate from</label>
                    <textarea id="content" @input="updateTextArea($event.target.value)"
                        class="w-full rounded-lg border border-zinc-200 p-4 font-body bg-zinc-50 h-56"></textarea>
                </div>

                <button @click="() => generateCards(deck.deckId)"
                    class="bg-sky-600 text-white p-2 rounded-md text-lg font-semibold flex justify-center items-center gap-4">
                    <Icon name="tabler:loader" v-if="generating" class="animate-spin"></Icon>Generate
                </button>
            </div>
        </div>
    </div>
</template>