import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import StickyHeader from "./modules/StickyHeader";
import RevealOnScroll from "./modules/RevealOnScroll";

new MobileMenu();
new StickyHeader();

let modal;

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

document.querySelectorAll(".open-modal").forEach(element => {
    element.addEventListener("click", event => {
        event.preventDefault();
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal" */ "./modules/Modal").then(x => {
                modal = new x .default();
                setTimeout(() => modal.openTheModal(), 20);
            }).catch(() => console.log("There was a problem!"));
        } else {
            modal.openTheModal();
        }
    })
});

if (module.hot) {
    module.hot.accept();
}
