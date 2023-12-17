// For TemporaryImage //

// document.addEventListener("DOMContentLoaded", event => {
//   const image = document.getElementById("temporaryImage");

//   image.classList.add("visible");
//   setTimeout(() => {
//     image.style.opacity = "0";
//   }, 5000);

//   setTimeout(() => {
//     image.style.display = "none";
//   }, 7000);
// });

document.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded");
  const image = document.getElementById("temporaryImage");

  if (image) {
    console.log("Image found, adding visible class");
    image.classList.add("visible");

    setTimeout(() => {
      console.log("Starting fade out");
      image.style.opacity = "0";
    }, 5000);

    setTimeout(() => {
      console.log("Hiding image");
      image.style.display = "none";
    }, 7000);
  } else {
    console.error("Image element not found");
  }
});
