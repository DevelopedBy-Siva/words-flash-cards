import { Dexie } from "dexie";

const db = new Dexie("WordsFlashCards");
db.version(2).stores({
  words: "name,meaning,example,indexedDB,createdAt",
  history: "timestamp,score,wrongWords",
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

export const deleteWordFromDb = async (key) => {
  key = key.toLowerCase();
  return await db.words.delete(key);
};

export const addToHistory = async (data) => {
  const { wrongWords, total, score } = data;
  const result = {
    timestamp: Date.now(),
    score: `${score}:${total}`,
    wrongWords,
  };
  return await db.history.put(result);
};

export const getHistory = async () => {
  return await db.history.orderBy("timestamp").reverse().toArray();
};
