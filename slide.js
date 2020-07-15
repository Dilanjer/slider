class Slide {
  constructor({
    sliderClassName = "AH-slider",
    nextbtnClassName = "AH-next-btn",
    prevbtnClassName = "AH-prev-btn",
    dotsContClassName = "AH-dots-cont",
    dotClassName = "AH-dot",
    fadeClassName = "AH-fade-out",
    dots = true,
    autoMode = false,
    fade = false,
    autoModeSpeed = 4000,
    fadeSpeed = 500,
    imageSrc = [],
  }) {
    this.slider = document.querySelector(`.${sliderClassName}`);
    this.nextBtn = document.querySelector(`.${nextbtnClassName}`);
    this.prevBtn = document.querySelector(`.${prevbtnClassName}`);
    this.dotsContainer = document.querySelector(`.${dotsContClassName}`);

    this.dotClassName = dotClassName;
    this.fadeClassName = fadeClassName;

    this.imgSrc = imageSrc;
    this.dots = dots;
    this.fade = fade;
    this.autoMode = autoMode;
    this.autoModeSpeed = autoModeSpeed;
    this.fadeSpeed = fadeSpeed;
    this.imgIndex = 0;
  }

  sliderInit() {
    console.log("Slider is initialized");
    const _this = this;

    if (this.imgSrc !== 0) {
      if (this.imgSrc.length != 0) this.slider.style.backgroundImage = `url(${this.imgSrc[0]})`;

      // auto mode init
      if (!this.autoMode) {
        if (this.nextBtn == null && this.prevBtn == null) {
          console.log("left and right buttons not an found, please check your class name");
        } else {
          this.nextBtn.addEventListener("click", this.nextImg.bind(_this));
          this.prevBtn.addEventListener("click", this.prevImg.bind(_this));
        }
      } else {
        if (this.slider != null) {
          this.prevBtn.style.display = "none";
          this.nextBtn.style.display = "none";
          setInterval(this.autoSlide.bind(_this), this.autoModeSpeed);
        }
      }

      // dot init
      if (this.dots) {
        if (this.dotsContainer == null) {
          console.log("dots container not an found, please check your class name");
        } else {
          if (this.imgSrc.length == 0) {
            // console.log("dot class name not an found, please check your class name");
            console.log("images src not an found, please check your image src");
          } else {
            this.dotCreator();
            this.setDotActive();
          }
        }
      }
      // allowed settings
      if ((this.fadeSpeed < 10) || this.fadeSpeed > 1000) {
        console.log("min and max value for fadeSpeed 350 and 1000");
        this.fadeSpeed = 350;
      }
      if (this.autoModeSpeed < 2500) {
        console.log("min value for autoModeSpeed 2500");
      }

      if (this.fade) {
        if (this.slider != null) {
          this.fadeOutCreator();
          this.fadeName = document.querySelector(`.${this.fadeClassName}`);
        } else {
          console.log("slider not an found, please check your class name");
        }
      }
    } else {
      console.log("imageSrc is empty, please add image");
    }

  }

  async nextImg() {
    this.imgIndex++;
    if (this.imgIndex === this.imgSrc.length) this.imgIndex = 0;
    if (this.dots) this.setDotActive();
    if (this.fade) this.fadeOut();
    await this.wait(this.fadeSpeed / 2);
    this.slider.style.backgroundImage = `url(${this.imgSrc[this.imgIndex]})`;
  }

  async prevImg() {
    this.imgIndex--;
    if (this.imgIndex < 0) this.imgIndex = this.imgSrc.length - 1;
    if (this.dots) this.setDotActive();
    if (this.fade) this.fadeOut();
    await this.wait(this.fadeSpeed / 2);
    this.slider.style.backgroundImage = `url(${this.imgSrc[this.imgIndex]})`;
  }

  async autoSlide() {
    this.imgIndex++;
    if (this.imgIndex === this.imgSrc.length) this.imgIndex = 0;
    if (this.dots) this.setDotActive();
    if (this.fade) this.fadeOut();
    await this.wait(this.fadeSpeed / 2);
    this.slider.style.backgroundImage = `url(${this.imgSrc[this.imgIndex]})`;
  }

  async fadeOut() {
    this.fadeName.classList.add("fade");
    this.fadeName.style.transitionDuration = `${this.fadeSpeed / 2}ms`;
    await this.wait(this.fadeSpeed * 2);
    this.fadeName.classList.remove("fade");
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  fadeOutCreator() {
    const fadeBox = document.createElement("div");
    fadeBox.className = this.fadeClassName;
    this.slider.appendChild(fadeBox);
  }

  dotCreator() {
    for (let i = 0; i < this.imgSrc.length; i++) {
      const dot = document.createElement("div");
      dot.classList.add(this.dotClassName);
      this.dotsContainer.appendChild(dot);
    }
  }

  setDotActive() {
    this.allDots = document.querySelectorAll(`.${this.dotClassName}`);
    this.allDots.forEach((dot) => dot.classList.remove("active"));
    this.allDots[this.imgIndex].classList.add("active");
  }
}
