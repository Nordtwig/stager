import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header");
        this.pageSections = document.querySelectorAll(".page-section");
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.events();
    }

    events() {
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200));
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    runOnScroll() {
        this.determineScrollDirection();

        if (window.scrollY > 60) {
            this.siteHeader.classList.add("site-header--dark");
        } else {
            this.siteHeader.classList.remove("site-header--dark");

        }

        this.pageSections.forEach(element => this.calcSection(element));
    }

    calcSection(element) {
        if (window.scrollY + this.browserHeight > element.offsetTop && window.scrollY < element.offsetTop + element.offsetHeight) {
            let scrollPercent = element.getBoundingClientRect().y / this.browserHeight * 100;
            if (scrollPercent < 30 && scrollPercent > -0.1 && this.scrollDirection == "down" || scrollPercent < 3 &&  this.scrollDirection == "up") {
                let matchingLink = element.getAttribute("data-matching-link");
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(element => element.classList.remove("is-current-link"));
                document.querySelector(matchingLink).classList.add("is-current-link");
            }
        }
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = "down";
        } else {
            this.scrollDirection = "up";
        }

        this.previousScrollY = window.scrollY;
    }
}

export default StickyHeader;