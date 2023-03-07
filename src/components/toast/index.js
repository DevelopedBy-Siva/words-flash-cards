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
    width: 90%;
    min-height: 48px !important;
    font-size: ${FontSize.TOAST.MAIN_FONT};
    font-family: "Roboto", sans-serif;
    border-radius: 14px;
    margin: auto;
    margin-top: 1.4rem;
    text-align: left;
    justify-content: center !important;
    letter-spacing: 1px;
    font-size: 0.68rem;
    line-height: 16px;
    font-weight: 300;
  }

  .Toastify__toast--success {
    background-color: #2d9d41;
  }
  .Toastify__toast--warning {
    background-color: #c5a421;
  }
  .Toastify__toast-body {
    div:last-child {
      margin-left: 6px;
    }
  }
`;
