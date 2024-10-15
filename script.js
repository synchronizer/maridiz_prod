
Array.from(document.querySelectorAll('.carousel')).forEach(carousel => {
    const wrapper = carousel.querySelector('.carousel__content'),
            left = carousel.querySelector('.carousel__left'),
            right = carousel.querySelector('.carousel__right'),
            content = carousel.querySelector('.carousel__content');

    const checkControls = () => {
        
    
        
        
        
        
        

        
        
        
        
        

    }

    window.addEventListener('load', checkControls)
    
    wrapper.addEventListener('scroll', checkControls)

    left.addEventListener('click', () => {
        wrapper.scrollTo({
            top: 0,
            left: wrapper.scrollLeft - carousel.offsetWidth * .99,
            behavior: "smooth",
          });
    })

    right.addEventListener('click', () => {
        wrapper.scrollTo({
            top: 0,
            left: wrapper.scrollLeft + carousel.offsetWidth / 1.2,
            behavior: "smooth",
          });
    })
})

Array.from(document.querySelectorAll('.overlay')).forEach(overlay => {
    const overlay__left = overlay.querySelector('.overlay__left'),
      overlay__right = overlay.querySelector('.overlay__right'),
      overlay__close = overlay.querySelector('.overlay__close'),
      overlay__content = overlay.querySelector('.overlay__content');

    const controlsHideCheck = () => {
        const {scrollLeft, scrollWidth} = overlay__content;
        console.log(scrollWidth)
        if (scrollLeft == 0) {
            overlay__left.setAttribute('data-hidden', '')
        } else {
            overlay__left.removeAttribute('data-hidden')
        }

        if (scrollLeft > scrollWidth - overlay.offsetWidth - 1) {
            overlay__right.setAttribute('data-hidden', '')
        } else {
            overlay__right.removeAttribute('data-hidden')
        }
    }
    controlsHideCheck();

    overlay__content.addEventListener('scroll', controlsHideCheck)
    
    overlay__left.addEventListener('click', () => {
      const { scrollLeft } = overlay__content,
        { innerWidth } = window;
      overlay__content.scrollTo({left: scrollLeft - innerWidth});
    
    })

    overlay__right.addEventListener('click', () => {
      const { scrollLeft } = overlay__content,
        { innerWidth } = window;
      overlay__content.scrollTo({left: scrollLeft + innerWidth});
    
    })

    overlay__close.addEventListener('click', () => {
      overlay.close();
    })
  })

  Array.from(document.querySelectorAll('[data-overlay]')).forEach(overlayTrigger => {
    overlayTrigger.addEventListener('click', () => {
      const overlay = document.querySelector(`#${overlayTrigger.getAttribute('data-overlay')}`),
            overlayItem = overlayTrigger.getAttribute('data-overlay-item');
      overlay.showModal();

      if (overlayItem) overlay.querySelector('.overlay__content').scrollTo({left: overlay.offsetWidth * overlayItem});
    })
  })


document.addEventListener('keypress', e => {
    if (e.code != 'Space' && e.code != 'Enter') return;
    document.activeElement.click();
})


Array.from(document.querySelectorAll('.slider')).forEach(slider => {
    const time = parseFloat(slider.getAttribute('data-time')),
            pause = parseFloat(slider.getAttribute('data-pause'));
    
    const items = Array.from(slider.querySelectorAll('.slider__content > *')),
            teasers = Array.from(slider.querySelectorAll('.slider__teaser'));
    
            teasers.forEach((teaser, key) => {
                teaser.querySelector('.slider__teaser-bar').style.animationDuration = `${time}s`;
        
            });

    let activeNumber = 0, timerPlay, timerPause;

    const sliderPlay = () => {
        items.forEach(item => item.classList.remove('slider__item_active'));
        teasers.forEach(teaser => teaser.classList.remove('slider__teaser_active'));
        teasers.forEach(teaser => teaser.querySelector('.slider__teaser-bg').classList.remove('rounded-s'));

        items[activeNumber].classList.add('slider__item_active');
        teasers[activeNumber] && teasers[activeNumber].classList.add('slider__teaser_active');
        teasers[activeNumber] && teasers[activeNumber].querySelector('.slider__teaser-bg').classList.add('rounded-s');

        timerPlay = setTimeout(() => {
            activeNumber = (activeNumber + 1) % items.length;
            sliderPlay();
        }, time * 1000)
    };

    const sliderPause = () => {
        slider.classList.add('slider_pause');
        clearTimeout(timerPlay);
        clearTimeout(timerPause);
        timerPause = setTimeout(() => {
            slider.classList.remove('slider_pause');
            sliderPlay();   
        }, pause * 1000);
    }

    slider.addEventListener('click', sliderPause);

    teasers.forEach((teaser, key) => teaser.addEventListener('click', () => {
        activeNumber = key;

        items.forEach(item => item.classList.remove('slider__item_active'));
        teasers.forEach(teaser => teaser.classList.remove('slider__teaser_active'));
        teasers.forEach(teaser => teaser.querySelector('.slider__teaser-bg').classList.remove('rounded-s'));

        items[activeNumber].classList.add('slider__item_active');
        teasers[activeNumber] && teasers[activeNumber].classList.add('slider__teaser_active');
        teasers[activeNumber] && teasers[activeNumber].querySelector('.slider__teaser-bg').classList.add('rounded-s');

        sliderPause();
    }))

    sliderPlay();

})