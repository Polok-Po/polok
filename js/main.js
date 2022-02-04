
/*----------------nav menu start-----------------*/
(() =>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScroolingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScroolingToggle();
    }

        function fadeOutEffect(){
            document.querySelector(".fade-out-effect").classList.add("active");
            setTimeout(() =>{
                document.querySelector(".fade-out-effect").classList.remove("active");
            },300)
        }

        //makeing nav usefull

        document.addEventListener("click", (event) =>{

        if(event.target.classList.contains('link-item')){

        if(event.target.hash !==""){
        hideNavMenu();
        }
    }
    })
})();
/*----------------nav menu end-----------------*/
/*-------------- about section start-------------*/
(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabscontainer = document.querySelector(".about-tabs");

    tabscontainer.addEventListener("click", (event) =>{

        if(event.target.classList.contains("tab-item") &&
        !event.target.classList.contains("active")){
        const target = event.target.getAttribute("data-target");

        tabscontainer.querySelector(".active").classList.remove("outer-shadow","active");
        event.target.classList.add("active","outer-shadow");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
        }
    })
})();



    function bodyScroolingToggle(){
        document.body.classList.toggle("hidden-scrooling");
    }

/*-------------- about section end-------------*/
/*---------------portfolio filter and popup---------------*/
(() =>{
        const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsbtn = popup.querySelector(".pp-project-details-btn");
        let itemIndex, SlideIndex, screenshots;

        filterContainer.addEventListener("click", (event)=>{
            if(event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")){
                
                filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
                event.target.classList.add("active","outer-shadow");
                const target = event.target.getAttribute("data-target");
                portfolioItems.forEach((item) =>{
                    if(target === item.getAttribute("data-category") || target === 'all'){
                        item.classList.remove("hide");
                        item.classList.add("show");
                    }
                    else{
                        item.classList.remove("show");
                        item.classList.add("hide");
                    }
                })

            }
        })

        portfolioItemsContainer.addEventListener("click", (event) =>{
            if(event.target.closest(".portfolio-item-inner")){
                const portfolioItem = event.target.closest(".portfolio-item-inner").
                    parentElement;
                console.log(portfolioItem);
                itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
               screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
                
               screenshots = screenshots.split(",");
               if(screenshots.length === 1){
                   prevBtn.style.display="none"
                   nextBtn.style.display="none"
               }
               else{
                prevBtn.style.display="block"
                nextBtn.style.display="block"
               }
               SlideIndex = 0;
               popupToogle();
               popupSlideshow();
                popupDetails();
            }
        })

        closeBtn.addEventListener("click", () =>{
            popupToogle();
            if(projectDetailsContainer.classList.contains("active")){
                popupDetailsToggle();
            }
        })

        function popupToogle() {
            popup.classList.toggle("open");
            bodyScroolingToggle();
        }

        function popupSlideshow(){
            const imgSrc = screenshots[SlideIndex];
            const popupImg = popup.querySelector(".pp-img");

            popup.querySelector(".pp-loader").classList.add("active");
            popupImg.src=imgSrc;
            popupImg.onload = () =>{
            
                popup.querySelector(".pp-loader").classList.remove("active");
            }
            popup.querySelector(".pp-counter").innerHTML = (SlideIndex+1) + "of" + screenshots.length;
        }


        nextBtn.addEventListener("click", () =>{
            if(SlideIndex === screenshots.length-1){
                SlideIndex = 0;
            }
            else{
                SlideIndex++;
            }
            popupSlideshow();
        })

        prevBtn.addEventListener("click", () =>{
            if(SlideIndex === 0){
                SlideIndex = screenshots.length-1
            }
            else{
                SlideIndex--;
            }
            popupSlideshow();
        })


            function popupDetails(){
                if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
                    projectDetailsBtn.style.display="none";
                    return;
                }
                projectDetailsbtn.style.display="block";

                const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
                popup.querySelector(".pp-project-details").innerHTML = details;
                const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
                popup.querySelector(".pp-title h2").innerHTML = title;
                const category = portfolioItems[itemIndex].getAttribute("data-category");
                popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
            }


        projectDetailsbtn.addEventListener("click",() =>{
            popupDetailsToggle();
        })
        
        
        function popupDetailsToggle(){
            if(projectDetailsContainer.classList.contains("active")){
                projectDetailsbtn.querySelector("i").classList.remove("fa-minus");
                projectDetailsbtn.querySelector("i").classList.add("fa-plus");
                projectDetailsContainer.classList.remove("active");
                projectDetailsContainer.style.maxHeight = 0 + "px"
            }
            else{
                projectDetailsbtn.querySelector("i").classList.remove("fa-plus");
                projectDetailsbtn.querySelector("i").classList.add("fa-minus");
                projectDetailsContainer.classList.add("active");
                projectDetailsContainer.style.maxHeight = projectDetailsContainer.
                scrollHeight + "px";
                    popup.scrollTo(0,projectDetailsContainer.offsetTop);
            }
        }
        

})();
/*---------------portfolio filter and popup end---------------*/
/*---------------testominial sectio start--------------------*/
(()=>{
    const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active")
    let SlideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    console.log(SlideIndex);

    slides.forEach((slide) =>{
        slide.style.width = slideWidth + "px";
    })

    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () =>{
        if(SlideIndex === slides.length-1){
            SlideIndex = 0;
        }
        else {
            SlideIndex++;
        }
        sliderContainer.style.marginLeft = - (slideWidth * SlideIndex) + "px";
    })

    prevBtn.addEventListener("click", () =>{
        if(SlideIndex === 0){
            SlideIndex = slides.length-1;
        }
        else{
            SlideIndex--;
        }
        sliderContainer.style.marginLeft = - (slideWidth * SlideIndex) + "px";
    })

})();
/*---------------testominial sectio end--------------------*/
/*--------------preloader start---------------------*/
window.addEventListener("load", () =>{
    
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".preloader").style.display="none";
    },600)

})
/*--------------preloader end---------------------*/