import _ from "lodash";
import CryptoJS from "crypto-js";
import { saveAs } from "file-saver";
import { IoFilterSharp } from "react-icons/io5";
import { BiSort } from "react-icons/bi";

import { addAllWordsToDb, getWordsFromDb } from "../db";
import { toast } from "react-toastify";

export const SORT_FILTER_NAV = [
  {
    title: "filter",
    icons: <IoFilterSharp />,
    defaultParam: "ALL",
    items: [
      {
        item: "all",
        param: "ALL",
        link: "/",
      },
      {
        item: "local storage",
        param: "LOCAL",
        link: "/",
      },
    ],
  },
  {
    title: "sort",
    icons: <BiSort />,
    defaultParam: "A_Z",
    items: [
      {
        item: "By Word (A-Z)",
        param: "A_Z",
        link: "/",
      },
      {
        item: "By Word (Z-A)",
        param: "Z_A",
        link: "/",
      },
      {
        item: "By Date (Oldest - Newest)",
        param: "DATE_ASC",
        link: "/",
      },
      {
        item: "By Date (Newest - Oldest)",
        param: "DATE_DESC",
        link: "/",
      },
    ],
  },
];

export const getSortFilterType = (type, inputParam) => {
  const index = SORT_FILTER_NAV.findIndex((item) => item.title === type);
  if (!inputParam) return SORT_FILTER_NAV[index].defaultParam;
  const params = SORT_FILTER_NAV[index].items.map((item) => item.param);
  return params.includes(inputParam.toUpperCase())
    ? inputParam.toUpperCase()
    : SORT_FILTER_NAV[index].defaultParam;
};

export function filterWords(type, words) {
  switch (type) {
    case "LOCAL":
      return words.filter((wd) => wd.indexedDB);
    default:
      return words;
  }
}

export function sortWord(type, words) {
  switch (type) {
    case "Z_A":
      return sortByDesc(words);
    case "DATE_ASC":
      return sortByDateAsc(words);
    case "DATE_DESC":
      return sortByDateDesc(words);
    default:
      return sortByAsc(words);
  }
}

const sortByAsc = (data) =>
  _.orderBy(data, [(val) => val.name.toLowerCase()], ["asc"]);

const sortByDesc = (data) =>
  _.orderBy(data, [(val) => val.name.toLowerCase()], ["desc"]);

const sortByDateAsc = (data) =>
  _.orderBy(data, [(val) => val.createdAt], ["asc"]);

const sortByDateDesc = (data) =>
  _.orderBy(data, [(val) => val.createdAt], ["desc"]);

export const searchFilter = (data, search) => {
  if (!search || search.length === 0) return data;
  const words = data.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase())
  );
  return words;
};

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export async function encryptAndDownload() {
  try {
    const data = await getWordsFromDb();
    if (!data || data.length === 0) {
      toast.info("No words found in the browser storage");
      return false;
    }
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      SECRET_KEY
    ).toString();

    const backupFile = new File([ciphertext], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(backupFile, "flashcards__backup.bytes");
  } catch (ex) {
    toast.error("Something went wrong. Failed to generate backup file");
  }
}

export async function decryptAndAddToDb(data) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    await addAllWordsToDb(decryptedData);
    return decryptedData;
  } catch (ex) {
    toast.error("Malformed data. Failed to import file.");
    return false;
  }
}
