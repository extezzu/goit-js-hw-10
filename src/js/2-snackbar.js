import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
e.preventDefault();

const delay = Number(form.elements.delay.value);
const state = form.elements.state.value;

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
    if (state === "fulfilled") {
        resolve(`Fulfilled after ${delay}ms`);
    } else {
        reject(`Rejected after ${delay}ms`);
    }
    }, delay);
});

promise.then((value) => {
    iziToast.success({
    title: "Success",
    message: value,
    position: "topRight",
    });
}).catch((error) => {
    iziToast.error({
    title: "Error",
    message: error,
    position: "topRight",
    });
});
form.reset();
});