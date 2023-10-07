const observerSlide = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.forEach((item) => {
        if (item.includes("slide") && !item.includes("animation")) {
          entry.target.classList.add(`${item}-animation`);
        }
      });
    }
  });
});

const slideLeftToRight = document.querySelectorAll(".slideLeftToRight");
slideLeftToRight.forEach((element) => observerSlide.observe(element));

const slideRightToLeft = document.querySelectorAll(".slideRightToLeft");
slideRightToLeft.forEach((element) => observerSlide.observe(element));
