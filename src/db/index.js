import { Dexie } from "dexie";

const db = new Dexie("WordsFlashCards");
db.version(1).stores({
  words: "name,meaning,example,createdAt",
});

export const addWordToDb = async (word) => {
  return await db.words.put(word);
};
