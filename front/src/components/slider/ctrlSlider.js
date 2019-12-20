export default class Carousel {
  constructor(param) {
    this.wraper = param.wraper;
    this.dotsWraper = this.wraper.querySelector('.wraper-dots');
    this.carousel = this.wraper.querySelector('.carousel');
    this.stateTimeOut = true;
    this.autoSideTimeOut = param.autoSideTimeOut;
    this.displaySlide = param.displaySlide;
    this.autoTime = null;
    this.autoStart = param.autoSide ? this.autoSlide() : false;
    this.setSlideOrder();
    this.autoStop();
    this.createDots();
    this.events();
  }

  setSlideOrder() {
    for (let i = 0; i < this.carousel.children.length; i += 1) {
      this.carousel.children[i].setAttribute('slide-order', i);
    }
  }

  createDots() {
    const rest =
      this.carousel.children.length % this.displaySlide === 0 ? 0 : 1;
    const calcDots =
      Math.floor(this.carousel.children.length / this.displaySlide) + rest;
    let index = 0;
    while (index < calcDots) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.setAttribute('order-dot', index);
      dot.addEventListener(
        'click',
        e => {
          this.dotClick(e.target.getAttribute('order-dot'));
        },
        this
      );
      this.dotsWraper.appendChild(dot);
      index += 1;
    }
    this.dotsState();
  }

  dotsState() {
    const dods = [...this.dotsWraper.children];
    dods.forEach(node => {
      node.classList.remove('dotActive');
    });
    const slideOder = parseInt(
      this.carousel.children[0].getAttribute('slide-order'),
      10
    );
    let n = 0;
    let dotActive = 0;
    while (n < this.dotsWraper.children.length) {
      if (
        slideOder <= this.displaySlide * n + slideOder &&
        slideOder >= n * this.displaySlide
      ) {
        dotActive = n;
      }
      n += 1;
    }
    dods[dotActive].classList.add('dotActive');
  }

  dotClick(data) {
    clearTimeout(this.autoTime);
    const slides = [...this.carousel.children];
    const curPosition = slides.findIndex(item => {
      return (
        item.getAttribute('slide-order') ===
        (data * this.displaySlide).toString()
      );
    });
    const endList = slides.splice(0, curPosition);
    const newList = [...slides, ...endList];
    this.carousel.innerHTML = '';
    newList.forEach(item => {
      this.carousel.appendChild(item);
    });
    let index = 0;
    while (index < this.displaySlide) {
      const slideImg = this.carousel.children[index].querySelector('img');
      this.setLazyUrl(slideImg);
      index += 1;
    }
    this.dotsState();
    this.autoSlide();
  }

  moveRight() {
    clearTimeout(this.autoTime);
    this.carousel.appendChild(this.carousel.children[0]);
    const slideImg = this.carousel.children[2].querySelector('img');
    this.setLazyUrl(slideImg);
    this.dotsState();
    this.autoSlide();
  }

  moveLeft() {
    clearTimeout(this.autoTime);
    this.carousel.prepend(
      this.carousel.children[this.carousel.children.length - 1]
    );
    const slideImg = this.carousel.children[0].querySelector('img');
    this.setLazyUrl(slideImg);
    this.dotsState();
    this.autoSlide();
  }

  autoStop() {
    const carouselRct = this.carousel.getBoundingClientRect();
    if (
      (carouselRct.height + carouselRct.top < 0 && this.stateTimeOut) ||
      carouselRct.top > window.innerHeight
    ) {
      clearTimeout(this.autoTime);
      this.stateTimeOut = false;
    }
    if (
      carouselRct.height + carouselRct.top > 0 &&
      !this.stateTimeOut &&
      carouselRct.top < window.innerHeight
    ) {
      this.autoSlide();
      this.stateTimeOut = true;
    }
  }

  setLazyUrl(img) {
    if (img.getAttribute('src') === null) {
      const srcSlide = img.getAttribute('data-src');
      img.setAttribute('src', srcSlide);
    }
  }

  autoSlide() {
    const then = this;
    function auto() {
      then.autoTime = setTimeout(() => {
        if (then.stateTimeOut) {
          then.moveRight();
          auto();
        }
      }, then.autoSideTimeOut);
    }
    auto();
  }

  events() {
    let touchstart;
    let touchCurent;
    this.wraper.querySelector('.slide-next').addEventListener(
      'click',
      () => {
        this.moveRight();
      },
      this
    );
    this.wraper.querySelector('.slide-prev').addEventListener(
      'click',
      () => {
        this.moveLeft();
      },
      this
    );
    this.carousel.addEventListener(
      'touchstart',
      e => {
        touchstart = e.touches[0].pageX;
      },
      this
    );

    this.carousel.addEventListener(
      'touchend',
      () => {
        if (touchCurent > touchstart) {
          this.moveLeft();
        } else if (touchCurent < touchstart) {
          this.moveRight();
        }
      },
      this
    );

    this.carousel.addEventListener(
      'touchmove',
      e => {
        touchCurent = e.touches[0].pageX;
      },
      this
    );

    window.addEventListener(
      'scroll',
      () => {
        this.autoStop();
      },
      this
    );
  }
}
