import { Dexie } from "dexie";

const db = new Dexie("WordsFlashCards");
db.version(1).stores({
  words: "name,meaning,example,indexedDB,createdAt",
});

export const addWordToDb = async (word) => {
  delete word["id"];
  return await db.words.put(word);
};

export const addAllWordsToDb = async (word) => {
  return await db.words.bulkPut(word);
};

export const getWordsFromDb = async () => {
  return await db.words.toArray();
};
