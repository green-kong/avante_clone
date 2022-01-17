function ContentSlide(imgView, labelClass, img) {
  this.designImgView = document.querySelector(imgView);
  this.labelList = document.querySelectorAll(labelClass);
  this.designImg = document.querySelector(img);

  this.labelIndex = null;
  this.designSlideWidth = this.designImg.offsetWidth;

  this.contentSlideInit = () => {
    window.addEventListener('resize', () => {
      this.designSlideWidth = this.designImg.offsetWidth;
      this.designImgView.style.transform = 'translateX(0)';
    });

    this.labelList.forEach((v) => {
      v.addEventListener('click', this.ImgSlide);
    });
  };

  this.ImgSlide = (event) => {
    this.labelIndex = [...this.labelList].indexOf(event.target);
    this.designImgView.style.transform = `translateX(-${
      this.designSlideWidth * this.labelIndex
    }px)`;
  };
}

const designSlide = new ContentSlide(
  '.design_img_view',
  '.design_label',
  '.content_bg_img'
);
designSlide.contentSlideInit();

const spaceSlide = new ContentSlide(
  '.space_img_view',
  '.space_label',
  '.space_bg_img'
);
spaceSlide.contentSlideInit();

const convenienceSlide = new ContentSlide(
  '.convenience_img_wrap',
  '.convenience_label',
  '.convenience_img'
);
convenienceSlide.contentSlideInit();

const drivingSlide = new ContentSlide(
  '.driving_img_wrap',
  '.driving_label',
  '.driving_img'
);
drivingSlide.contentSlideInit();
