let options = {
    selector: '.slider',
    thumbnails: true,
    items: 3,
    margin:10//w pixelach
  }
  
  let slider = document.querySelector(options.selector);
  //add wrapper
  let slidesHTML = slider.innerHTML;
  slider.innerHTML = '';
  let slidesWrapper = document.createElement('div');
  slidesWrapper.classList.add('slides-wrapper');
  slider.appendChild(slidesWrapper);
  //add slides
  slidesWrapper.innerHTML = slidesHTML;
  //select slides
  let slides = slidesWrapper.querySelectorAll('.about-section');
  let sliderHeight = slider.offsetWidth;
  let slideHeight = (sliderHeight / options.items) - (2 * options.margin);
  //console.log(slideWidth);
  //let slideWidth = `calc(${(100 / options.items)}% - ${2 * options.margin}px)`;
  let slidesCount = slides.length;
  
  slides = Array.from(slides);
  slides.forEach(slide => { 
    slide.style.height = `${slideHeight}px`;
    slide.style.margin = `${options.margin}px`;
    slide.classList.add('slide'); 
  });
  
  let wrapperHeight = (sliderHeight/options.items) * slidesCount;
  //console.log(wrapperWidth);
  slidesWrapper.style.height = `${wrapperHeight}px`;
  
  window.addEventListener('resize', () => {
     //let slides = slidesWrapper.querySelectorAll('div');
    sliderHeight= slider.clientWidth;
    slideHeight = /*Math.floor*/(sliderHeight / options.items) - (2 * options.margin);
    slides.forEach(slide => { 
    slide.style.height= `${slideHeight}px`;
    slide.style.margin = `${options.margin}px`;
    slide.classList.add('slide'); 
  });
    wrapperHeight = (sliderHeight/ options.items) * slidesCount;
    slidesWrapper.style.height = `${wrapperHeight}px`;
  });
  let currentPos = 0;
  
  if (options.thumbnails) {
    let sliderThumb = document.createElement('div');
    sliderThumb.classList.add('sliderThumb1')
    slider.appendChild(sliderThumb);
    let thumbnails = [];
    for (let i = 0; i < slidesCount; i++) {
      let thumb = document.createElement('button');
      thumb.classList.add('thumb');
      thumb.id = 'thumb' + i;
      
      sliderThumb.appendChild(thumb);
      thumb.addEventListener('click', () => {
        currentPos = (sliderHeight / options.items) * i;
        slidesWrapper.style.transform = `translateY(-${currentPos}px)`;
      });
      thumbnails.push(thumb);
      
    }
  }