import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

import FontSize from "../../assets/styles/FontSizes.json";

export default function Toast() {
  return (
    <CustomToast
      position="top-center"
      autoClose={6000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      draggable
      theme="colored"
      limit={1}
      pauseOnFocusLoss={false}
      closeButton={false}
    />
  );
}

const CustomToast = styled(ToastContainer)`
  .Toastify__toast {
    width: fit-content;
    max-width: 280px;
    min-width: 0;
    min-height: 48px !important;
    font-family: "Roboto", sans-serif;
    border-radius: 5px;
    margin: 1.4rem auto 0 auto;
    text-align: left;
    justify-content: center !important;
    letter-spacing: 1px;
    font-size: 0.68rem;
    font-weight: 300;
    padding: 6px 8px;
  }

  .Toastify__toast--success {
    background-color: #2d9d41;
  }
  .Toastify__toast--warning {
    background-color: #c5a421;
  }
  .Toastify__toast-body {
    div:last-child {
      font-size: ${FontSize.TOAST.MAIN_FONT};
      line-height: 18px;
      padding: 0 8px 0 4px;
    }
  }
`;
