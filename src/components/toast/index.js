import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

import FontSize from "../../assets/styles/FontSizes.json";

export default function Toast() {
  return (
    <CustomToast
      position="bottom-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      draggable
      theme="colored"
      limit={1}
      pauseOnFocusLoss={false}
      closeButton={false}
      bodyClassName="toastBody"
      progressClassName="toastProgress"
    />
  );
}

const CustomToast = styled(ToastContainer)`
  .Toastify__toast {
    width: 90%;
    min-height: 48px !important;
    font-size: ${FontSize.TOAST.MAIN_FONT};
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    border-radius: 8px;
    margin: auto;
    margin-bottom: 10px;
  }
`;
