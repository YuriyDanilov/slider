class Slider {
    constructor(selector) {
        this.selector = selector;
        document.addEventListener('DOMContentLoaded', () => this.init())
    }

    init() {
        this.slider = document.querySelector(this.selector);
        this.wrapper = this.slider.querySelector('.wrapper');
        this.leftArrow = this.slider.querySelector('.arrow-left');
        this.rightArrow = this.slider.querySelector('.arrow-right');
        this.autoMove = true;
        setInterval(() => { if (this.autoMove) this.nextSlide() }, 3000);
        this.events();
    }

    events() {
        this.leftArrow.addEventListener('click', () => this.previouseSlide());
        this.rightArrow.addEventListener('click', () => this.nextSlide());
        this.slider.addEventListener('mousemove', () => this.autoMove = false);
        this.slider.addEventListener('mouseleave', () => this.autoMove = true);
    }

    animate(duration, draw, timing, end) {
        let startTime;
        let proc = (time) => {
            if (!startTime) startTime = time;
            let timeFraction = (time - startTime) / duration;
            if (timeFraction >= 1) timeFraction = 1;

            let progress = timing(timeFraction);

            draw(progress);

            if (timeFraction < 1)
                requestAnimationFrame(proc);
            else if (end) end();

        }
        requestAnimationFrame(proc);
    }

    previouseSlide() {
        if (this.animationActive) return;
        this.animationActive = true;

        let curPos = -100;
        this.wrapper.prepend(this.wrapper.lastElementChild);

        this.animate(Slider.ANIMATION_DURATION,
            (progress) => {
                this.wrapper.style.marginLeft = curPos + progress * 100 + '%';
            },
            (timeFraction) => {
                return timeFraction;
            },
            () => {
                this.wrapper.style.marginLeft = '';
                this.animationActive = false;
            });
    }

    nextSlide() {
        if (this.animationActive) return;
        this.animationActive = true;

        this.animate(Slider.ANIMATION_DURATION,
            (progress) => {
                this.wrapper.style.marginLeft = -progress * 100 + '%';
            },
            (timeFraction) => {
                return timeFraction;
            },
            () => {
                this.wrapper.style.marginLeft = '';
                this.wrapper.append(this.wrapper.firstElementChild);
                this.animationActive = false;
            })
    }

}

Slider.ANIMATION_DURATION = 2000;

let slider = new Slider('.slider');