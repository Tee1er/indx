<script setup lang="ts">
import DeckCard from './components/DeckCard.vue';
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link crossorigin="anonymous"
    href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:wght@100..900&display=swap"
    rel="stylesheet">

  <div class="bg-zinc-50 h-screen flex flex-col">
    <Navbar></Navbar>
    <div class="h-full flex flex-col items-center justify-center p-16">
      <div class="w-1/2 flex flex-col gap-6">
        <Flashcard aiGenerated=true></Flashcard>
        <div
          class=" bg-zinc-50 p-8 rounded-lg shadow-sm border-zinc-200 border text-center flex gap-2 justify-center items-center text-gray-400">
          <Icon name="tabler:plus" class="text-2xl"></Icon>
          <h1 class="inline-block font-semibold text-xl">New card</h1>
        </div>
      </div>
    </div>
    <div class="bg-white border-t-2 border-zinc-200 flex p-6 gap-x-4">
      <DeckCard deckName="SAT Vocabulary" cardCount=140 remaining=25 accuracy=72></DeckCard>
      <DeckCard deckName="Chemistry" cardCount=35 remaining=14 accuracy=89></DeckCard>
      <DeckCard deckName="Plant Biology" cardCount=323 remaining=178 accuracy=66></DeckCard>
      <DeckCard deckName="Geology" cardCount=487 remaining=101 accuracy=97></DeckCard>
    </div>
  </div>
</template>
