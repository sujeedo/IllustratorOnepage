'use strict'

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
  scrollIntoView(link);
});

// handle click on "contact me" button on home
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click',function(){
  scrollIntoView('#contact');
});


// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__contents');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => { 
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

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
  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
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
