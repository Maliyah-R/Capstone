import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
// import { capitalize } from "lodash";
// import axios from "axios";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer()}
  `;
  router.updatePageLinks();
  afterRender();
}

function afterRender() {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

// document.addEventListener("DOMContentLoaded", event => {
//   console.log("DOM fully loaded");
//   const image = document.getElementById("temporaryImage");

//   if (image) {
//     console.log("Image found, adding visible class");
//     image.classList.add("visible");

//     setTimeout(() => {
//       console.log("Starting fade out");
//       image.style.opacity = "0";
//     }, 5000);

//     setTimeout(() => {
//       console.log("Hiding image");
//       image.style.display = "none";
//     }, 7000);
//   } else {
//     console.error("Image element not found");
//   }
// });
