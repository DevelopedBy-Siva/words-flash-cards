import { toast } from "react-toastify";

import axios from "./axios";

export async function searchDictionary(word) {
  toast.dismiss();
  return await axios
    .get(word)
    .then(({ data }) => {
      const meaning = data[0].meanings[0].definitions[0].definition;
      const name = data[0].word;
      const example = data[0].meanings[0].definitions[0].example;
      return { name, meaning, example };
    })
    .catch((err) => {
      const { response } = err;
      if (response && response.status === 404)
        toast.info("Sorry, word not found");
      else toast.error("Sorry, something went wrong. Please try again later");

      return null;
    });
}
