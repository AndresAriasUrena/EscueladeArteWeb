let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Selec some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-right");
    const img = slide.querySelector("img");
    console.log(img);
    const revealText = slide.querySelector(".reveal-left");
    //GSAP
    // gsap.to(revealImg, 1, { x: "100%" });
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 1.8 }, { scale: 1.1 }, "-=1");
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" }, "-=0.75");
    // slideTl.fromTo(nav, { y: "-100%" }, { y: "0" }, "-=0.5");
    //Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
    })
      .setTween(slideTl)
      /* .addIndicators({
        colorStart: "white",
        colorTrigger: "black",
        name: "slide",
        // reverse: false
      }) */
      .addTo(controller);
    //New animation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.3");

    //Create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%", //The duration is going to be the whole slide
      triggerHook: 0,
    })
      /*       .addIndicators({
        colorStart: "purple",
        colorTrigger: "green",
        name: "page",
        indent: 200,
      }) */
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
  const item = e.target;
  //   console.log(item);
  if (item.classList.contains("logo") | item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("donar")) {
    mouse.classList.add("donar-active");
    mouseTxt.innerText = "Click!";
    // gsap.to(".title-swipe", 1, { y: "0%" });

    gsap.to(".title", 1, { color: "#ffb800" });
  } else {
    mouse.classList.remove("donar-active");
    mouseTxt.innerText = "";
    //   gsap.to(".title-swipe", 1, { y: "100%" });
    gsap.to(".title", 2, { color: "#FFFF" });
  }
}

function navToggle(e) {
  //   console.log(`${e.target} click!`);
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, {
      rotate: "45",
      y: 5,
    });
    gsap.to(".line2", 0.5, {
      rotate: "-45",
      y: -5,
    });
    gsap.to(".nav-header", 1, {
      background:
        "linear-gradient(135deg,rgba(3, 60, 94, 1) 0%, rgba(59, 29, 87, 1) 100%)",
    });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    gsap.to(".cursor", 1, { border: "2px solid black" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0 });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0 });
    gsap.to(".nav-header", 1, { background: "rgba(0,0,0,0.7)" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    gsap.to(".cursor", 1, { border: "2px solid white" });
    document.body.classList.remove("hide");
  }
}

// function donarAnimation() {
//   controller = new ScrollMagic.Controller();
//   const slides = document.querySelectorAll(".detail-slide");
//   slides.forEach((slide, index, slides) => {
//     const slideTl = gsap.timeline({ defaults: { duration: 1 } });
//     let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
//     const nextImg = nextSlide.querySelector("img");
//     sliderTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
//     //Scene
//     detailScene = new ScrollMagic.Scene({
//       triggerElement: slide,
//       duration: "100%",
//       triggerHook: 0,
//     })
//       .setPin(slide, { pushFollowers: false })
//       .setTween(slideTl)
//       .addIndicators({
//         colorStart: "white",
//         colorTrigger: "yellow",
//         name: "slide",
//       })
//       .addTo(controller);
//   });
// }
function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextTimg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextTimg, { x: "50%" }, { x: "0%" });
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      .addTo(controller);
  });
}

//Barba PAge Transitions
const logo = document.querySelector("#logo1");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "donacion",
      beforeEnter() {
        logo.href = "../index.html";
        console.log("logo activado");
        // donarAnimation();
        detailAnimation();
        console.log("Donar animacion ");
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //scroll to the top
        window.scrollTo(0, 0);
        //an animation
        const tl = gsap.timeline({ defaults: { ease: "power2inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        //an animation
        const tl = gsap.timeline({ defaults: { ease: "power2inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },
          { x: "100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
      },
    },
  ],
});

//Event listeners
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
burger.addEventListener("click", navToggle);

animateSlides();
