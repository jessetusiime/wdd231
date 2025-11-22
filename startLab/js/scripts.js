const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBox.innerHTML = `One apple contains 95 calories`
});

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBox.innerHTML = `One apple contains 45 calories`
});

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBox.innerHTML = `One apple contains 105 calories`
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});