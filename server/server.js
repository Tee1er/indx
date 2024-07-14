import Koa from "koa";
import { koaBody } from "koa-body";
import cors from "@koa/cors";
import Router from "@koa/router";
import OpenAI from "openai";
import { API_KEY } from "../secrets.env.js";

// Make a test call
const openai = new OpenAI({
	apiKey: API_KEY,
	dangerouslyAllowBrowser: true,
});

const app = new Koa();
const router = new Router();

let decks = [
	{
		deckName: "SAT Vocabulary",
		cardsCorrect: 1,
		cardsComplete: 1,
		cards: [],
		id: crypto.randomUUID(),
	},
	{
		deckName: "Chemistry",
		cardsCorrect: 1,
		cardsComplete: 1,
		cards: [
			{
				front: "What is an Arrhenius base?",
				back: "A substance that increases the concentration of hydroxide ions in an aqueous solution.",
				timesCorrect: 1,
				timesViewed: 2,
				id: crypto.randomUUID(),
			},
		],
		id: crypto.randomUUID(),
	},
	{
		deckName: "Plant Biology",
		cardsCorrect: 1,
		cardsComplete: 1,
		cards: [],
		id: crypto.randomUUID(),
	},
	{
		deckName: "Geology",
		cardsCorrect: 1,
		cardsComplete: 1,
		cards: [],
		id: crypto.randomUUID(),
	},
];

const systemPrompt = `You are generating spaced repetition flashcards from the following text. Please make sure your flashcards are succint, simple, and cover only one concept each.
Please generate no more than 15 flashcards for each text. Output them in JSON format as an array of objects with a "front" and "back" key. For example:
{
    "flashcards": [  
        {
            "front": "What is the capital of France?",
            "back": "Paris"
        },
        {
            "front": "What is the capital of Spain?",
            "back": "Madrid"
        }
    ]
}
Follow the principles of effective spaced repetition flashcards. Write atomic flashcards that can objectively graded. They should refer to as little information as possible. Please also write a variety of flashcards in both direction (e.g. term/definition as well as definition/term).
Make sure you write flashcards in a way that is easy to remember. For example, use mnemonics, make connections to other concepts, or use other memory techniques. Please also make sure the flashcards are general & not specific to this text.
`;

router.post("/decks/generate/:deckId", koaBody(), async (ctx) => {
	console.log(
		`Request received to generate flashcards for deck ${ctx.params.deckId}`
	);
	console.log(decks[0]);
	console.log(ctx.params.deckId);
	const completion = await openai.chat.completions.create({
		messages: [
			{ role: "system", content: systemPrompt },
			{ role: "user", content: ctx.request.body.data },
		],
		model: "gpt-4o",
		response_format: { type: "json_object" },
	});
	let cards = JSON.parse(completion.choices[0].message.content).flashcards;

	cards = cards.map((card) => {
		card.timesCorrect = 0;
		card.timesViewed = 1;
		card.id = crypto.randomUUID();
		return card;
	});

	let idx = decks.findIndex((deck) => deck.id === ctx.params.deckId);
	decks[idx].cards.push(...cards);
	ctx.body = cards.length;
	console.log(
		`Generated ${cards.length} flashcards for deck ${ctx.params.deckId}`
	);
	console.log(decks);
});

// Get all decks
router.get("/decks", koaBody(), async (ctx) => {
	ctx.body = decks;
});

// Add a new deck
router.post("/decks", koaBody(), async (ctx) => {
	newDeck = {
		deckName: ctx.request.body.deckName,
		cardsCorrect: 0,
		cardsComplete: 0,
		cards: [],
		totalCards: 0,
		id: crypto.randomUUID(),
	};
	ctx.body = decks;
});

// Get a specific deck
router.get("/decks/:deckId", async (ctx) => {
	ctx.body = decks.find((deck) => deck.id === ctx.params.deckId);
});

// Add a card to a deck
router.post("/decks/:deckId", koaBody(), async (ctx) => {
	let deck = decks.find((deck) => deck.id === ctx.params.deckId);
	let newCard = ctx.request.body.card;
	newCard.id = crypto.randomUUID();
	deck.cards.push(newCard);
	ctx.body = deck;
});

// Update a card in a deck (for review)
router.put("/update/:deckId/:cardId", koaBody(), async (ctx) => {
	console.log("HI");
	let deck = decks.find((deck) => deck.id === ctx.params.deckId);
	let card = deck.cards.find((card) => card.id === ctx.request.params.cardId);
	let correct = ctx.request.body.correct;
	if (correct) card.timesCorrect++;
	console.log(ctx.request.body.correct);
	card.timesViewed++;
	ctx.body = deck;
});

app.use(
	cors({
		origin: "*",
	})
);

app.use(router.routes()).use(router.allowedMethods()).listen(3391);
