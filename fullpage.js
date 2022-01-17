const fullPageList = document.querySelectorAll('.content');
const contentNav = document.querySelector('#content_nav_wrap');
const contentSideNav = document.querySelector('#content_side_nav_wrap');
const sideMenuList = document.querySelectorAll('.side_menu_list');

const fullPageListNum = fullPageList.length - 1;
let fullPageCount = -1;
let clickedSideMenu = null;
let isWheelActive = false;
let isKeyActive = false;

window.addEventListener('wheel', wheelEventHadler, { passive: false });
window.addEventListener('keydown', keyEventHandler);
window.addEventListener(
  'drag',
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);

function wheelEventHadler(event) {
  event.preventDefault();
  if (isWheelActive) return;

  isWheelActive = true;

  if (event.wheelDelta < 0) {
    moveNext();
  }

  if (event.wheelDelta > 0) {
    movePrev();
  }

  checkCount();

  setTimeout(() => {
    isWheelActive = false;
  }, 1400);
}

function keyEventHandler(e) {
  if (
    e.keyCode === 9 ||
    e.keyCode === 38 ||
    e.keyCode === 40 ||
    e.keyCode === 37 ||
    e.keyCode === 39
  ) {
    e.preventDefault();
  }
  if (isKeyActive) return;

  isKeyActive = !isKeyActive;

  if (e.keyCode === 40) {
    moveNext();
  }

  if (e.keyCode === 38) {
    movePrev();
  }

  checkCount();

  setTimeout(() => {
    isKeyActive = false;
  }, 1500);
}

function checkCount() {
  if (fullPageCount >= 0) {
    console.log(fullPageCount, fullPageList.length);
    showNav();
    showBottomMenu();

    setTimeout(showSideNav, 500);
  }

  if (fullPageCount === fullPageList.length) {
    hideBottomMenu();
  }

  if (fullPageCount === -1) {
    hideNav();
    hideSideNav();
    hideBottomMenu();
  }
}

function moveNext() {
  if (fullPageCount >= fullPageListNum) {
    scrollEnd();
    fullPageCount = fullPageList.length;
    return;
  }

  fullPageCount += 1;
  ChangeSideMenu();
  fullPageList[fullPageCount].classList.add('active');

  if (fullPageCount > 0) {
    setTimeout(() => {
      fullPageList[fullPageCount - 1].classList.remove('active');
    }, 1000);
  }
}

function movePrev() {
  if (fullPageCount < 0) return;

  if (fullPageCount === 0) {
    fullPageList[0].classList.remove('active');
    fullPageCount -= 1;
  }

  if (fullPageCount === fullPageList.length) {
    scrollStart();
    fullPageCount = fullPageListNum;
    return;
  }

  if (fullPageCount > 0) {
    fullPageCount -= 1;
    ChangeSideMenu();
    fullPageList[fullPageCount].style.transition = 'none';
    fullPageList[fullPageCount].classList.add('active');

    setTimeout(() => {
      fullPageList[fullPageCount + 1].classList.remove('active');
      fullPageList[fullPageCount].style.transition = 'all 1000ms ease-in';
    }, 0);
  }
}

function showNav() {
  contentNav.classList.add('show');
}

function hideNav() {
  contentNav.classList.remove('show');
}

function showSideNav() {
  contentSideNav.classList.add('show_side_nav');
}

function hideSideNav() {
  contentSideNav.classList.remove('show_side_nav');
}

function ChangeSideMenu() {
  clickedSideMenu = sideMenuList[fullPageCount];
  ChangeSideMenuColor();

  sideMenuList.forEach((v) => {
    v.classList.remove('active');
  });

  clickedSideMenu.classList.add('active');
}

function ChangeSideMenuColor() {
  console.log(fullPageCount);
  if (fullPageCount !== 0) {
    sideMenuList.forEach((v) => {
      v.classList.add('white');
    });
  } else {
    sideMenuList.forEach((v) => {
      v.classList.remove('white');
    });
  }
}

function scrollEnd() {
  console.log(fullPageList);
  fullPageList.forEach((v) => {
    v.setAttribute('style', 'transition: none');
    v.classList.add('active');
  });
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function scrollStart() {
  console.log('check');
  fullPageList.forEach((v, i) => {
    if (i !== fullPageListNum) {
      v.removeAttribute('style');
    }
    v.removeAttribute('style');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showBottomMenu() {
  bottomMenu.style.transform = 'translateY(-10%)';
}

function hideBottomMenu() {
  bottomMenu.style.transform = 'translateY(100%)';
}

// sidemenu

// onclick 으로 사용됨
function selectContent(num) {
  if (fullPageCount === num) return;

  if (fullPageCount < num) {
    fullPageList[num].classList.add('active');
    fullPageCount = num;
    ChangeSideMenu();

    setTimeout(() => {
      fullPageList.forEach((v, i) => {
        if (i !== num) {
          v.classList.remove('active');
        }
      });
    }, 700);
  }

  if (fullPageCount > num) {
    fullPageList[num].classList.add('active');
    fullPageList[num].setAttribute('style', 'z-index:19');
    fullPageCount = num;
    ChangeSideMenu();
    setTimeout(() => {
      fullPageList[num].removeAttribute('style');
      fullPageList.forEach((v, i) => {
        if (i !== num) {
          v.classList.remove('active');
        }
      });
    }, 700);
  }
}

// bottommenu

const bottomMenu = document.querySelector('#bottom_menu');
const bottomMenuBtn = document.querySelector('#popup_menu_btn');
const popupMenuList = document.querySelector('#popup_menu_list');
const topBtn = document.querySelector('#top_btn');

let isPopupMenuListActive = false;

bottomMenuBtn.addEventListener('click', bottomMenuBtnHandler);
topBtn.addEventListener('click', topBtnHandler);

function bottomMenuBtnHandler() {
  isPopupMenuListActive = !isPopupMenuListActive;
  if (isPopupMenuListActive) {
    popupMenuList.classList.add('active');
    bottomMenuBtn.classList.add('active');
  } else {
    popupMenuList.classList.remove('active');
    bottomMenuBtn.classList.remove('active');
  }
}

function topBtnHandler() {
  if (isPopupMenuListActive) return;
  fullPageList.forEach((v) => {
    v.classList.remove('active');
  });
  hideSideNav();
  hideNav();
  hideBottomMenu();
  fullPageCount = -1;
}

//
