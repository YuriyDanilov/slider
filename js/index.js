class Slider {
    constructor(selector) {
        this.selector = selector;
        this.timer = null;
        document.addEventListener('DOMContentLoaded', () => this.init())
    }

    init() {
        this.slider = document.querySelector(this.selector);
        this.wrapper = this.slider.querySelector('.wrapper');
        this.leftArrow = this.slider.querySelector('.arrow-left');
        this.rightArrow = this.slider.querySelector('.arrow-right');
        this.autoMove = true;
        setInterval(() => { if (this.autoMove) this.nextSlide(Slider.SLIDE_TIME) }, 3000);
        this.events();
    }

    events() {
        this.leftArrow.addEventListener('click', () => this.previouseSlide(Slider.SLIDE_TIME));
        this.rightArrow.addEventListener('click', () => this.nextSlide(Slider.SLIDE_TIME));
        this.slider.addEventListener('mousemove', () => this.autoMove = false);
        this.slider.addEventListener('mouseleave', () => this.autoMove = true);
    }

    previouseSlide(time) {
        if (this.timer !== null) return;

        let frameCount = time / Slider.FRAME_TIME;
        let step = 100 / frameCount;
        let currentPosition = -100;

        this.wrapper.prepend(this.wrapper.lastElementChild);
        this.wrapper.style.marginLeft = '';

        this.timer = setInterval(() => {

            if (currentPosition >= 0) {
                clearInterval(this.timer);
                this.timer = null;
                return
            }
            currentPosition += step;
            this.wrapper.style.marginLeft = currentPosition + '%';
        }, Slider.FRAME_TIME)
    }

    nextSlide(time) {
        if (this.timer !== null) return;

        let frameCount = time / Slider.FRAME_TIME;
        let step = 100 / frameCount;
        let currentPosition = 0;

        this.timer = setInterval(() => {
            if (currentPosition <= -100) {
                clearInterval(this.timer);
                this.timer = null;
                this.wrapper.append(this.wrapper.firstElementChild);
                this.wrapper.style.marginLeft = '';
                return
            }
            currentPosition -= step;
            this.wrapper.style.marginLeft = currentPosition + '%';
        }, Slider.FRAME_TIME)
    }
}

Slider.FRAME_TIME = 10;
Slider.SLIDE_TIME = 2000;

let slider = new Slider('.slider');