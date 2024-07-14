<script setup>
import DeckCard from './components/DeckCard.vue';
import axios from "axios";

import { ref } from "vue";

let res = await axios.get("http://127.0.0.1:3391/decks")
let decks = ref(res.data)

function setCurrentDeck(d) {
  // remove deck from array and put it at front
  decks.value = decks.value.filter((x) => x.deckName !== d.deckName)
  decks.value.unshift(d)
}

let creatingNewCard = ref(false)

function updateCardCreate() {
  creatingNewCard.value = !creatingNewCard.value

  axios.get("http://127.0.0.1:3991/decks").then((res) => {
    decks = ref(res.data)
    console.log(decks.value)
  })
}

function nextCard(correct) {
  // remove first card
  let currentCardId = decks.value[0].cards[0].id

  axios.put(`http://127.0.0.1:3991/update/${decks.value[0].id}/${currentCardId}`, {
    correct: correct
  }).then(
    console.log("Done")
  )

  decks.value[0].cards.shift()
}

</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link crossorigin="anonymous"
    href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:wght@100..900&display=swap"
    rel="stylesheet">

  <div class="bg-zinc-50 h-screen flex flex-col">
    <Navbar></Navbar>
    <div id="main" class="h-full flex flex-col items-center justify-center p-16 pt-0 overflow-scroll no-scrollbar">
      <div class="w-1/2 flex flex-col items-center gap-6">
        <div v-if="decks[0].cards.length == 0 && !creatingNewCard"
          class=" bg-zinc-100 p-4 rounded-lg shadow-sm border-zinc-200 border text-center w-full">
          <div class="flex flex-col items-center my-8 text-zinc-400 gap-2">
            <Icon name="tabler:mood-confuzed" class="text-6xl"></Icon>
            <h1 class="text-2xl font-semibold mt-2">No cards</h1>
          </div>
        </div>
        <Flashcard aiGenerated=true v-if="!creatingNewCard && decks[0].cards.length != 0" class="w-full"
          :front="decks[0].cards[0].front" :back="decks[0].cards[0].back" :timesCorrect="decks[0].cards[0].timesCorrect"
          :timesViewed="decks[0].cards[0].timesViewed" @correct="() => nextCard(true)"
          @incorrect="() => nextCard(false)"></Flashcard>
        <NewCard :deck="decks[0]" :active="creatingNewCard" @clicked="updateCardCreate" class="w-full"
          @closeNewCard="updateCardCreate">
        </NewCard>
      </div>
    </div>
    <div class="bg-white border-t-2 flex justify-between border-zinc-200 p-6 pt-4 items-center gap-16">
      <div class="w-2/3">
        <div class="flex items-center gap-2 mb-2 text-gray-400">
          <Icon name="tabler:cards"></Icon>
          <h3 class="text-sm uppercase">My Decks</h3>
        </div>

        <div class="flex gap-x-4 ">
          <DeckCard v-for="deck in decks" :deckName="deck.deckName" :cardCount="deck.cards.length" :key="deck.deckName"
            :remaining="deck.cards.length - deck.cardsComplete"
            :accuracy="Math.round(100 * (deck.cardsCorrect / deck.cardsComplete))" @click="setCurrentDeck(deck)">
          </DeckCard>
        </div>
      </div>
      <div class="w-1/3">
        <div class="flex items-center gap-2 mb-2 text-gray-400">
          <Icon name="tabler:chart-dots"></Icon>
          <h3 class="text-sm uppercase">My statistics</h3>
        </div>
        <div class="text-xs flex items-center gap-4 uppercase text-zinc-400 font-body font-medium mr-6">
          <div class="bg-white border-zinc-100 border p-4 rounded-md shadow-sm">
            <div class="flex items-center gap-1">
              <Icon name="tabler:checks" class="text-green-600 text-base"></Icon>
              <h3>Correct</h3>
            </div>

            <h1 class="mt-2 font-bold font-sans text-3xl text-green-700">{{ decks[0].cardsCorrect }}</h1>
          </div>
          <div class="bg-white border-zinc-100 border p-4 rounded-md shadow-sm">
            <div class="flex items-center gap-1">
              <Icon name="tabler:stack-3" class="text-purple-600 text-base"></Icon>
              <h3>Remaining</h3>
            </div>
            <h1 class="mt-2 font-bold font-sans text-3xl text-purple-700">{{ decks[0].cards.length -
              decks[0].cardsComplete
              }}
            </h1>
          </div>
          <div class="bg-white border-zinc-100 border p-4 rounded-md shadow-sm">
            <div class="flex items-center gap-1">
              <Icon name="tabler:target" class="text-rose-600 text-base"></Icon>
              <h3>Accuracy</h3>
            </div>
            <h1 class="mt-2 font-bold font-sans text-3xl text-rose700">{{ decks[0].cardsCorrect /
              decks[0].cardsComplete
              *
              100 }}%</h1>

          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<style>
#main {
  background-color: #fafafa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23e4e4e7' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
