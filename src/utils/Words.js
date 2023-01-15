import { IoFilterSharp } from "react-icons/io5";
import { BiSort } from "react-icons/bi";

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

export function sortByAsc(data) {
  const words = [...data].sort((a, b) => {
    const first = a.name.toLowerCase();
    const second = b.name.toLowerCase();
    return first > second ? 1 : -1;
  });
  return words;
}

export function sortByDesc(data) {
  const words = [...data].sort((a, b) => {
    const first = a.name.toLowerCase();
    const second = b.name.toLowerCase();
    return first > second ? -1 : 1;
  });
  return words;
}

export function sortByDateAsc(data) {
  const words = [...data].sort((a, b) => {
    const first = a.createdBy ? a.createdBy : 0;
    const last = b.createdBy ? b.createdBy : 0;
    return first - last;
  });
  return words;
}

export function sortByDateDesc(data) {
  const words = [...data].sort((a, b) => {
    const first = a.createdBy ? a.createdBy : 0;
    const last = b.createdBy ? b.createdBy : 0;
    return last - first;
  });
  return words;
}
