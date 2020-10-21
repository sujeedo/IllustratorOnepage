'use strict'

// 로딩중 화면
function loading() {
  const loadingdiv = document.querySelector('#loading');
  loadingdiv.style.display = 'none'; // 로딩이 완료되면 로딩박스 제거
  // document.all.style.display = 'block'; // 로딩이 완료되면 컨텐츠 표시
}
window.addEventListener('load', () => {
  setTimeout(loading, 3000); // 로드 후 로딩함수 3초 후 호출
});
 
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
  navbar.classList.remove('autoh')
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('autoh')
  navbarMenu.classList.toggle('open');
});


// handle click on "contact me" button on home
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click',function(){
  scrollIntoView('#about');
});


// Make home slowly fade to transparent as the window scrolls down
const homeContents = document.querySelector('.home__contents');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => { 
  homeContents.style.opacity = 1 - window.scrollY / (homeHeight);
});

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

// poject
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  // 선택된 이전 아이템에서  선택된 것을 없애주고, 새로 클릭된 아이템을 선택합니다.
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if(filter === '*' || filter === project.dataset.type){
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

function scrollIntoView(selecter) {
  const scrollTo = document.querySelector(selecter);
  scrollTo.scrollIntoView({behavior: 'smooth', block: 'center'});
}
