// 프로젝트 요소들을 필터링하거나 썸네일을 클릭하여 모달창을 팝업합니다.
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projectPreviews = document.querySelectorAll('.project_preview');
const projectsModal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal_close_btn');
const projects = document.querySelectorAll('.slide_box');
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');
// 필터링 버튼을 클릭하면 data값이 일치하는 요소만 표시됩니다.
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
    projectPreviews.forEach((projectPreview) => {
      if(filter === '*' || filter === projectPreview.dataset.type){
        projectPreview.classList.remove('invisible');
      } else {
        projectPreview.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
  projects.forEach((project) => {
    if(filter === '*' || filter === project.dataset.type){
      project.classList.remove('invisible');
    }
    else {
      project.classList.add('invisible');
    }
  });
});
// 썸네일 이미지를 클릭하여 모달창이 열리면 필터링된 요소들만 슬라이드할 수 있습니다.
let slideIndex = 1; // 초기화
showSlide(slideIndex); // 인자를 넘겨 호출합니다.

function showSlide(n) {
  // 필터링 버튼을 클릭하여 필터링 된 요소만 가져옵니다.
  const filterSlides = document.querySelectorAll('.slide_box:not(.invisible)');
  // 필터링 된 요소만 표시될 경우 data-index값이 3이상이므로 홀짝을 구분지어 인덱스 번호를 다시 할당합니다.
  if (filterSlides.length == 2) {
    if(slideIndex % 2 == 0) {
      slideIndex = 2;
    }else {
      slideIndex = 1;
    }
  }
  if (slideIndex > filterSlides.length) {
    slideIndex = 1;
  }
  if (slideIndex < 1) {
    slideIndex = filterSlides.length;
  }
  for (let i = 0; i < filterSlides.length; i++) {
    filterSlides[i].style.display = "none";
  }
  filterSlides[slideIndex - 1].style.display = 'block';
}
projectContainer.addEventListener('click', (e) => {
  slideIndex = e.target.dataset.index;
  showSlide(slideIndex);
  projectsModal.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
  projectsModal.style.display = 'none';
});
prevBtn.addEventListener('click', () => {
  slideIndex += -1;
  showSlide(slideIndex);
});
nextBtn.addEventListener('click', () => {
  slideIndex += 1;
  showSlide(slideIndex);
});