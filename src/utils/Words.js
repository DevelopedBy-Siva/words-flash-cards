import { IoFilterSharp } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import {
  FILTER_ALL,
  FILTER_LOCAL,
  SORT_A_Z,
  SORT_DATE_ASC,
  SORT_DATE_DESC,
  SORT_Z_A,
} from "../redux/actions/Words_ActionTypes";

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

export const getQueryParamType = (filterParam = "", sortParam = "") => {
  const actionType = {
    filterType: null,
    sortType: null,
  };

  switch (filterParam.toLowerCase()) {
    case "all":
      actionType.filterType = FILTER_ALL;
      break;
    case "local":
      actionType.filterType = FILTER_LOCAL;
      break;
    default:
      actionType.filterType = FILTER_ALL;
  }

  switch (sortParam.toLowerCase()) {
    case "a_z":
      actionType.sortType = SORT_A_Z;
      break;
    case "z_a":
      actionType.sortType = SORT_Z_A;
      break;
    case "date_asc":
      actionType.sortType = SORT_DATE_ASC;
      break;
    case "date_desc":
      actionType.sortType = SORT_DATE_DESC;
      break;
    default:
      actionType.sortType = SORT_A_Z;
  }

  return actionType;
};
