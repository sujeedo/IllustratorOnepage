'use strict'

// 로딩중 화면
function loading() {
  const loadingdiv = document.querySelector('#loading');
  loadingdiv.classList.add('load');
  setTimeout(function(){
    loadingdiv.style.display = 'none';  // 로딩이 완료되면 로딩박스 제거
  }, 1000);
  // document.all.style.display = 'block'; // 로딩이 완료되면 컨텐츠 표시
}
loading();
// window.addEventListener('load', () => {
//   setTimeout(loading, 3000); // 로드 후 로딩함수 3초 후 호출
// });
 
// Make navbar transparent when il is on the top
const navbar = document.querySelector('#navbar');
const navtoggle = document.querySelector('.navbar__toggle-btn');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => { 
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar__dark');
    navtoggle.classList.add('navbar__dark');
  } else {
    navbar.classList.remove('navbar__dark');
    navtoggle.classList.remove('navbar__dark');
  }
});

// handle scrolling when tapping on the navbar meun
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',function(event){
  const target = event.target;
  const link = target.dataset.link;
  if(link == null) {
    return;
  }
  navbar.classList.remove('autoh');
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('autoh')
  navbarMenu.classList.toggle('open');
});

// 360도 회전하는 프로필 이미지 클릭하여 이미지 변경하기
const homeProfileBox = document.querySelector('.home__profile__box');
const homeProfileImgs = document.querySelectorAll('.home__profile__box div');
let x = 0;
homeProfileBox.addEventListener('click', () => {
  //const x = [0,1,2];
  //let y = x[Math.floor(Math.random()*3)];
  x++;
  if(x > 2) {
    x = 0;
  }
  for(let homeProfileImg of homeProfileImgs) {
    homeProfileImg.style.backgroundImage = `url(images/profile${x}.png)`;
  }
});

// handle click on "contact me" button on home
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click',function(){
  scrollIntoView('#about');
});


// Make home slowly fade to transparent as the window scrolls down
// const homeContents = document.querySelector('.home__contents');
const homeHeight = home.getBoundingClientRect().height;
// const aboutContents = document.querySelector('.about_contants');
// const aboutTop =  about.getBoundingClientRect().top + window.pageYOffset;
// const aboutHeight = about.getBoundingClientRect().height;
// const skillContents = skills.querySelector('.section__container');
// const skillTop =  skills.getBoundingClientRect().top + window.pageYOffset;
// const skillHeight = skills.getBoundingClientRect().height;
// const workContents = work.querySelector('.work_contents');
// const workTop =  work.getBoundingClientRect().top + window.pageYOffset;
// const workHeight = work.getBoundingClientRect().height;
// const testimonialContents = testimonials.querySelector('.section__container');
// const testimonialTop =  testimonials.getBoundingClientRect().top + window.pageYOffset;
// const testimonialHeight = testimonials.getBoundingClientRect().height;
// const contactTop =  contact.getBoundingClientRect().top + window.pageYOffset;
// const contactHeight = contact.getBoundingClientRect().height;
// window.addEventListener('scroll', (event) => {
//   if(window.scrollY > homeHeight/2) {
//     homeContents.style.opacity = 1 - ((window.scrollY-(homeHeight/2))/(homeHeight/2));
//     //aboutContents.style.opacity = 0 + ((window.scrollY*2+(skillTop-(aboutTop+(aboutHeight/2)))-(aboutTop+(aboutHeight/2)))/(skillTop-(aboutTop+(aboutHeight/2))));
//   }
//   if(window.scrollY > aboutTop+(aboutHeight/2)) {
//     aboutContents.style.opacity = 1 - ((window.scrollY-(aboutTop+(aboutHeight/2)))/(skillTop-(aboutTop+(aboutHeight/2))));
//   }
//   if(window.scrollY > skillTop+(skillHeight/2)) {
//     skillContents.style.opacity = 1 - ((window.scrollY-(skillTop+(skillHeight/2)))/(workTop-(skillTop+(skillHeight/2))));
//   }
//   if(window.scrollY > workTop+(workHeight/2)) {
//     workContents.style.opacity = 1 - ((window.scrollY-(workTop+(workHeight/2)))/(testimonialTop-(workTop+(workHeight/2))));
//   }
// });

// console.log(homeHeight)
// console.log(aboutTop)
// console.log(skillTop)
// console.log(workTop)
// console.log(testimonialTop)
// console.log(contactTop)
// console.log(aboutHeight)
// console.log(skillHeight)
// console.log(workHeight)
// console.log(testimonialHeight)
// console.log(contactHeight)
// console.log('--')

// About섹션의 이미지를 클릭하면 뒷면을 보여줍니다.
const aboutImgs = document.querySelectorAll('.major__icon');
for(let aboutImg of aboutImgs) {
  aboutImg.addEventListener('click', () => {
    aboutImg.classList.toggle('clickfront') 
    aboutImg.classList.toggle('clickback')
  });
}

// Skill value Bar를 채우는 함수입니다.
const skillSection = document.querySelector('#skills');
const skillsetBoxs = document.querySelectorAll('[data-boxname]');
let skillValues = document.querySelectorAll('.skill__value');
function skillValueBarPainting() {
  for(let skillValue of skillValues) {
    let skillValuedatas = skillValue.dataset.value;
    skillValue.animate([
      { width: '0%' },
      { width: skillValuedatas }
    ], 1000);
    skillValue.style.width = skillValuedatas;
  }
}

// 페이지 로드시 Skill value Bar가 채워집니다.
setTimeout(() => {
  skillValueBarPainting();
}, 2700);

// Skill value Bar에 마우스커서가 오버되면 Skill value Bar가 다시 채워집니다.
for(let skillsetBox of skillsetBoxs) {
  skillsetBox.addEventListener('mouseenter', (event) => {
    let targetParents = event.target.childNodes
    for(let targetParent of targetParents) {
      let targets = targetParent.childNodes;
      for(let targetchides of targets) {
        let targetchide = targetchides.childNodes
        for(let targetel of targetchide) {
          if(targetel.nodeType === 1 && targetel.classList.value === 'skill__value') {
            let skillValuedatas = targetel.dataset.value;
            targetel.animate([
              { width: '0%' },
              { width: skillValuedatas }
            ], 1000);
          }
        }
      }
    }
  });
}

// Show "arrow up" button when scroll down
const topBtn = document.querySelector('.top');
document.addEventListener('scroll', function(){
  if(window.scrollY > homeHeight / 2) {
    topBtn.classList.add('visible');
  } else {
    topBtn.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button
topBtn.addEventListener('click',() => {
  scrollIntoView('#home');
});

// 부드러운 스크롤링 함수
function scrollIntoView(selecter) {
  const scrollTo = document.querySelector(selecter);
  scrollTo.scrollIntoView({behavior: 'smooth', block: 'center'});
}
