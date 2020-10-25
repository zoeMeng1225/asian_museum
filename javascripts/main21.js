

function scrollSlide(args) {
    //args.container, args.item, args.animType, args.duration, args.delay, args.uncutMove
    const scrollContainerEle = document.querySelector(args.container);
    const scrollItems = Array.from(document.querySelectorAll(`${args.container} ${args.item}`));
    const nav = document.querySelector('.nav-bar');
    
  
    let allowAnimation = true;
    let allowAnimationTimeout;
  
    // NOTE:
    // INNER FUNCTIONS DECLARATION
    function addAnimationClasses() {
      scrollItems.forEach((item) => {
        item.classList.add(args.animType);
      })
    }
  
    function addLoppAnimClasses () {
      let activeItem = scrollItems.find((item) => {
        return item.classList.contains('active'); 
      })
      
  
      let nextItem = scrollItems[scrollItems.indexOf(activeItem)+1];
      let prevItem = scrollItems[scrollItems.indexOf(activeItem)-1];
  
      if(!nextItem) {
        nextItem = scrollItems[0];
      }
     
      if(!prevItem) {
        prevItem = scrollItems[scrollItems.length - 1];
      };

      
      let itemsProceed = 0;
      scrollItems.forEach((item) => {
        itemsProceed++; 
  
        item.classList.remove('ss-move-prev') 
        item.classList.remove('ss-move-next') 
  
        if(itemsProceed === scrollItems.length){
          nextItem.classList.add('ss-move-next');
          prevItem.classList.add('ss-move-prev');
        }  
      })
    }
    
  
    function addAnimationDuration() {
      scrollItems.forEach((item) => {
        item.style.transitionDuration = `${args.duration}s`;
        addAnimationDelay(item)

      })
    }
  
    function addAnimationDelay(item) {
      item.style.transitionDelay = `${args.delay}s`; 
    }
   
    function stopScrollAnim() {
      if(allowAnimation){allowAnimation = false}
      allowAnimationTimeout = setTimeout( () => {
        allowAnimation = true;
  
        scrollItems.forEach((item) => {
          item.classList.remove('ss-moving');
        })
      }, (args.duration + args.delay) * 1000)
    }

    //ANIMATION
    

  
    // const appear = document.querySelector('.appear');
    
    function changeScrollSlide(moveDown) {
      let activeItem = scrollItems.find((item) => {
        return item.classList.contains('active');
      })
      let nextItem; 
       
      if(moveDown) {
        nextItem = scrollItems[scrollItems.indexOf(activeItem)+1];
        nav.style.background = 'transparent';
        

      } else {
        nextItem = scrollItems[scrollItems.indexOf(activeItem)-1];
        nav.style.background = 'rgba(0,0,0,0.7)';
        nav.style.transitionDuration = '1s';
        
      }
      
      if(nextItem){
        activeItem.classList.add('ss-moving');
        nextItem.classList.add('ss-moving');
        activeItem.classList.remove('active');
        nextItem.classList.add('active');
     
        
        
      
        if(args.uncutMove){ addLoppAnimClasses()}
      
      } else {
        activeItem.classList.remove('ss-moving');
    
        // activeItem.classList.remove('active');
        
        if(moveDown) {
          scrollItems[0].classList.add('ss-moving');
          scrollItems[0].classList.remove('active');
          
          if(args.uncutMove){addLoppAnimClasses();
          }
        } else {
          scrollItems[scrollItems.length - 1].classList.remove('ss-moving');
          scrollItems[scrollItems.length - 1].classList.remove('active');
         
          if(args.uncutMove){ addLoppAnimClasses()}
        }  
      }
    }
  
    // NOTE:
    // INNER FUNCTION CALLS
    addAnimationClasses()
    if(args.uncutMove){ addLoppAnimClasses()}
    addAnimationDuration()
  
    return (function () {
      let eventType;
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      let isIe = /MSIE|Trident/.test(window.navigator.userAgent);
      if (isFirefox) {
        eventType = 'DOMMouseScroll';
      } else if (isIe) {
        eventType = 'mousewheel';
      } else {
        eventType = 'wheel';
      }
      scrollContainerEle.addEventListener(eventType, function (event) {
        let scrollTop = scrollContainerEle.scrollTop,
            scrollHeight = scrollContainerEle.scrollHeight,
            height = scrollContainerEle.clientHeight;
            
        let delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0);
        // console.log(`scrollTop ${screenTop}  height ${height} scrollHeight ${scrollHeight}`)
        if ((delta > 0 && scrollTop - delta <= 0) || (delta < 0 && scrollTop + height > scrollHeight-1)) {
          if(delta > 0) {
            if(allowAnimation) {
              stopScrollAnim()
              changeScrollSlide(false)
            }  
          } else {
            if(allowAnimation){
              stopScrollAnim()
              changeScrollSlide(true);
            }         
          }      
          event.preventDefault();
        } else {
           if(delta < 0) {
            if(allowAnimation){  
              stopScrollAnim()
              changeScrollSlide(true);
            } 
           }
           event.preventDefault();
        }
      })
    }())
  }
  
  scrollSlide({
    container: ".ss-container",
    item: ".ss-item",
    animType: "ss-move-up",
    duration: 1,
    delay: 0,
    uncutMove: true,
  })






  //nav scroll animation
 
  