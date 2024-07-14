<template>
    <div
        class=" bg-white first:ring-2 first:ring-sky-600 first:bg-sky-50 p-4 rounded-lg shadow-sm border-zinc-100 border">
        <div class="flex justify-between items-center">
            <div class="">
                <h2 class="text-lg font-sans font-bold pr-6">{{ deckName }}</h2>
                <div class="flex gap-1 font-body items-center text-gray-400">
                    <Icon name="tabler:cards"></Icon>
                    <p class="text-sm">{{ cardCount }} cards</p>
                </div>

                <hr class="my-3">

                <div class="flex gap-4 font-body text-sm text-gray-400">
                    <div class="flex items-center gap-1">
                        <Icon name="tabler:stack-3" class="text-sky-700"></Icon>
                        {{ remaining }} left
                    </div>
                    <div class="flex items-center gap-1">
                        <Icon name="tabler:checks" class="text-green-600"></Icon>
                        {{ accuracy }}%
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['deckName', 'cardCount', "remaining", "accuracy"])

</script>