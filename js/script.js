window.onload = function () {
  // 상단
  const wrap = document.querySelector(".wrap");
  const header = document.querySelector(".header");
  let scy = 0;
  window.addEventListener("scroll", function () {
    scy = this.document.documentElement.scrollTop;
    if (scy > 0) {
      wrap.classList.add("active");
      header.classList.add("active");
    } else {
      wrap.classList.remove("active");
      header.classList.remove("active");
    }
  });
  // 콤마 기능
  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 안내창 스크립트
  let body = document.querySelector("body");
  let modal = document.querySelector(".modal-wrap");
  modal.addEventListener("click", function () {
    modal.classList.add("fadeOut");
    modal.addEventListener("animationed", function () {
      modal.style.display = "none";
    });
  });
  // 안내창 닫기 애니메이션 추가

  // 하단 패밀리 펼침 기능
  // 목록 열기 버튼
  const openBt = document.querySelector(".footer-link");
  // 목록 닫기 버튼
  const closeBt = document.querySelector(".family-close");
  // 보여질 패밀리 목록
  const family = document.querySelector(".family");
  // 기능 처리
  openBt.addEventListener("click", function () {
    family.classList.add("active");
    this.classList.add("active");
  });
  closeBt.addEventListener("click", function () {
    family.classList.remove("active");
    openBt.classList.remove("active");
  });

  // gotop
  var fixTopBt = document.querySelector(".fix-top");
  fixTopBt.addEventListener("click", function () {
    // window.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===============================================================
  // data.json을 로딩
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response;
      // 글자로 온 테이터를 객체로 변환
      // 글자가 json 규칙대로 만들어지 문자열이다.
      // 그러므로 json글자를 객체로 변환해서 활용한다.
      let obj = JSON.parse(str);

      //
      VISUAL_ARR = obj.visual;
      TODAY_GOOD = obj.todaygood;
      SALE_GOOD = obj.salegood;
      NEW_GOOD = obj.newgood;
      RECOMMEND_GOOD = obj.recommendgood;
      POPULAR_ICON = obj.popularicon;
      POPULAR_GOOD = obj.populargood;
      BRAND_ARR = obj.brandarr;
      BANNER_ARR = obj.bannerarr;
      SEASON_ARR = obj.season;
      REVIEW_ARR = obj.review;
      NOTICE_ARR = obj.notice;
      GOODNEWS_ARR = obj.goodnews;

      // 비주얼 화면에 배치한다
      showVisual();
      // 오늘의 상품을 화면에 배치
      showTodayGood();
      // 할인 상품을 화면에 배치
      showSaleGood();
      // 신상품을 화면에 배치
      showNewGood();
      // 추천 상품을 화면에 배치
      showRecommendGood();
      //인기 물품 아이콘을 화면에 배치
      showPopularIconGood();
      //인기 물품 화면에 배치
      showPopularGood();
      //브랜드 목록을 화면에 배치
      showBrandArr();
      //배너 화면 배치
      showBannerArr();
      //시즌 목록을 화면에 배치
      showSeason();
      // 비류목록
      showReview();
      // 공지사항
      showNotice();
      // 물품소개
      showGoodnews();
    }
  };
  // 자료를 호출한다.
  console.log("자료를 가져온다. XMLHT.....");
  xhttp.open("GET", "data.json");
  // 웹브라우저 기능을 실행 할수 있도록 요청
  xhttp.send();
  // =======================================================
  // 비주얼
  let VISUAL_ARR;
  let visualTag = document.getElementById("data-visual");
  // 오늘상품
  let TODAY_GOOD;
  let todayTag = document.getElementById("data-today");
  let todayTag2 = document.getElementById("data-today2");
  // 할인 상품
  let SALE_GOOD;
  let saleTag = document.getElementById("data-sale");
  // 신상품
  let NEW_GOOD;
  let newTag = document.getElementById("data-new");
  let newListTag = document.getElementById("data-new-list");
  // 추천 상품 화면 출력 기능
  let RECOMMEND_GOOD;
  let recommendTag = document.getElementById("data-recommend");
  //인기 물품 아이콘 화면 출력 기능
  let POPULAR_ICON;
  let popularIconTag = document.getElementById("data-popular-icon");
  //인기 물품 화면 출력 기능
  let POPULAR_GOOD;
  let popularshow = 1; //jason의 populargood-1(목록중 0번)을 보여준다.
  let popularTag = document.getElementById("data-popular");
  //브랜드 목록 화면 출력
  let BRAND_ARR;
  let brandTag = document.getElementById("data-brand");
  //배너 화면 출력
  let BANNER_ARR;
  let bannerTag = document.getElementById("data-banner");
  //시즌목록 화면 출력
  let SEASON_ARR;
  let seasonTag = document.getElementById("data-season");
  // 리뷰
  let REVIEW_ARR;
  let reviewTag = document.getElementById("data-review");
  // 공지사항
  let NOTICE_ARR;
  let noticeTag = document.getElementById("data-notice");
  // 물품소식
  let GOODNEWS_ARR;
  let goodnewsTag = document.getElementById("data-goodnews");
  //============================================
  // 비주얼 화면 출력 기능
  function showVisual() {
    let html = "";
    VISUAL_ARR.forEach(function (item) {
      const tag = `
      <div class="swiper-slide">
        <div class="visual-slide-page">
          <a href = "${item.link}">
          <img src="../images/${item.pic}"  alt="${item.name}"/>
          </a>
        </div>
      </div>
      `;
      html += tag;
    });
    visualTag.innerHTML = html;
    // 비주얼 슬라이드 기능
    const swVisual = new Swiper(".sw-visual", {
      loop: true,
      navigation: {
        prevEl: ".visual-prev",
        nextEl: ".visual-next",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".visual-pg",
        type: "fraction",
      },
    });
    // 비주얼 슬라이드 멈춤 기능
    const swVisualPlay = document.querySelector(".visual-play");
    swVisualPlay.addEventListener("click", function () {
      // 현재 active클래스 있는지를 확인하고
      // 기능을 설정한다.
      if (swVisualPlay.classList.contains("active")) {
        swVisual.autoplay.start();
        swVisualPlay.classList.remove("active");
      } else {
        swVisual.autoplay.stop();
        swVisualPlay.classList.add("active");
      }
    });
  }

  // 오늘의 상품 화면 출력 기능
  function showTodayGood() {
    let htmlTop = "";
    let htmlBottom = "";
    const topArr = TODAY_GOOD.filter(function (item, index) {
      // 인덱스 0~3
      if (index < 4) {
        return item;
      }
    });
    topArr.forEach(function (item) {
      let tag = `
      <div class="good-box">
                        <!-- 제품이미지 -->
                        <a href="${item.link}" class="good-img">
                            <img src="../images/${item.pic}" alt="${
        item.name
      }" />
                            <span class="good-type">${item.tag}</span>

                        </a>
                        <!-- 제품정보 -->
                        <a href="${item.link}" class="good-info">
                            <em>${item.name}</em>(<em>${item.unit}</em>)
                        </a>
                        <!-- 제품가격 -->
                        <a href="${item.link}" class="good-info-price">
                            ${priceToString(item.price)} <em>원</em>
                        </a>
                        <!-- 장바구니 이미지 -->
                        <button class="good-add-cart"></button>

                    </div>
      `;
      htmlTop += tag;
    });
    // 배열의 밑부분 인덱스 4~7 까지 배열만들기
    const botArr = TODAY_GOOD.filter(function (item, index) {
      if (index > 3) {
        return item;
      }
    });
    botArr.forEach(function (item) {
      let tag = `
    <div class="good-box">
                      <!-- 제품이미지 -->
                      <a href="${item.link}" class="good-img">
                          <img src="../images/${item.pic}" alt="${item.name}" />
                          <span class="good-type">${item.tag}</span>

                      </a>
                      <!-- 제품정보 -->
                      <a href="${item.link}" class="good-info">
                          <em>${item.name}</em>(<em>${item.unit}</em>)
                      </a>
                      <!-- 제품가격 -->
                      <a href="${item.link}" class="good-info-price">
                          ${priceToString(item.price)} <em>원</em>
                      </a>
                      <!-- 장바구니 이미지 -->
                      <button class="good-add-cart"></button>

                  </div>
    `;
      htmlBottom += tag;
    });

    todayTag.innerHTML = htmlTop;
    todayTag2.innerHTML = htmlBottom;
  }
  // 할인상품 화면 출력 기능
  function showSaleGood() {
    let html = `
    <div class = "swiper sw-sale">
    <div class = "swiper-wrapper">

    `;
    SALE_GOOD.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
          <img src="../images/${item.pic}" alt="${item.name}" />
          <span class="good-type">${item.tag}</span>

      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
          <em>${item.name}</em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">
          ${priceToString(item.price)} <em>원</em>
      </a>
      <!-- 장바구니 이미지 -->
      <button class="good-add-cart"></button>

    </div>
      
      
      </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    saleTag.innerHTML = html;
    const swSale = new Swiper(".sw-sale", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".sale .slide-prev",
        nextEl: ".sale .slide-next",
      },
      pagination: {
        el: ".sale .slide-pg",
        type: "fraction",
      },
    });
  }
  // 신상품 화면 출력 기능
  function showNewGood() {
    // 첫번째 화면 출력
    let obj = NEW_GOOD[0];
    let newGoodFirst = `
    <a href="${obj.link}" class="new-img">
    <img src="../images/${obj.pic}" alt="${obj.title}" />
    </a>
    <a href="${obj.link}" class="new-title">
    ${obj.title}
    </a>
    <a href="${obj.link}" class="new-txt">
    ${obj.txt}
    </a>
    `;
    newTag.innerHTML = newGoodFirst;
    // 나머지 출력 1~4번
    let html = "";
    NEW_GOOD.forEach(function (item, index) {
      let tag = "";
      // 0번은 출력했으므로
      if (index !== 0) {
        tag = `
        <div class="new-box">
        <a href="${item.link}" class="new-box-img">
    <img src="../images/${item.pic}" alt="${item.title}" />
    </a>
    <a href="${item.link}" class="new-box-title">
    ${item.title}
    </a>

        </div>
        `;
      }
      html += tag;
    });
    newListTag.innerHTML = html;
  }
  // 추천상품 화면 출력 기능
  function showRecommendGood() {
    let html = `
    <div class = "swiper sw-recommend">
    <div class = "swiper-wrapper">

    `;
    SALE_GOOD.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
          <img src="../images/${item.pic}" alt="${item.name}" />
          <span class="good-type">${item.tag}</span>

      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
          <em>${item.name}</em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">
          ${priceToString(item.price)} <em>원</em>
      </a>
      <!-- 장바구니 이미지 -->
      <button class="good-add-cart"></button>

      </div>
      
      
      </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    recommendTag.innerHTML = html;
    const swRecommend = new Swiper(".sw-recommend", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".recommend .slide-prev",
        nextEl: ".recommend .slide-next",
      },
      pagination: {
        el: ".recommend .slide-pg",
        type: "fraction",
      },
    });
  }
  // 인기상품 아이콘 화면 출력 가능
  function showPopularIconGood() {
    let html = `
    <div class= "swiper sw-icon">
    <div class= "swiper-wrapper">
    `;
    //데이터처리
    POPULAR_ICON.forEach(function (item) {
      const tag = `
      <div class="swiper-slide">
      <a href = "${item.link}">
      <span class="popular-cate-icon"
      style="
      background:url('../images/${item.icon}')no-repeat;
      background-position: 0px 0px;
      "
      ></span>
      <span class="popular-cate-name">${item.txt}</span>
      </a>
      </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    //
    popularIconTag.innerHTML = html;
    const swIcon = new Swiper(".sw-icon", {
      slidesPerView: 7,
      slidesPerGroup: 7,
      spaceBetween: 10,
      navigation: {
        nextEl: ".popular-slide-next",
        prevEl: ".popular-slide-prev",
      },
    });
    //.popular-cate-icon에 호버했을때 이미지 변경 코드
    const tag = document.querySelectorAll(".popular-slide a");
    tag.forEach(function (item, index) {
      //호버했을때 이미지가 변경
      item.addEventListener("mouseover", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "-64px";
      });
      //
      //호버안했을때(마우스가 아웃됐을때)
      item.addEventListener("mouseout", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "0px";
      });
      //클릭을 하면 버튼 (.popular-more)의 글자를
      //클릭된 타이틀의 글자로 변경한다.
      item.addEventListener("click", function (event) {
        //a태그이므로 href 적용된다.
        //웹브라우저 갱신이 되므로 UI을 위해 막아야한다.
        event.preventDefault();
        // event.preventDefault(); 다른거 눌렀을때 올라가는걸 막아줌
        const bt = document.querySelector(".popular-more");
        const title = this.querySelector(".popular-cate-name");
        bt.innerHTML = `${title.innerHTML} 물품 더보기`;
        //하단의 목록을 갱신한다.
        //현재 클릭된 번호를 popularshow 에 담는다.
        popularshow = index;
        showPopularGood();
      });
      //
    });
  }
  //인기 상품 화면 출력기능
  function showPopularGood() {
    let html = "";
    let popCate = "populargood-" + (popularshow + 1);
    console.log(POPULAR_GOOD[popCate]);
    POPULAR_GOOD[popCate].forEach(function (item) {
      let tag = `
         <div class="good-box">
         <!-- 제품이미지 -->
         <a href="${item.link}" class="good-img">
           <img src="images/${item.pic}" alt="${item.name}" />
           <span class="good-type">${item.tag}</span>
         </a>
         <!-- 제품정보 -->
         <a href="${item.link}" class="good-info">
           <em>${item.name}</em>(<em>${item.unit}</em>)
         </a>
         <!-- 제품가격 -->
         <a href="${item.link}" class="good-info-price">${priceToString(
        item.price
      )}<em>원</em></a>
         <!-- 장바구니 -->
         <button class="good-add-cart"></button>
       </div>
         `;
      html += tag;
    });
    popularTag.innerHTML = html;
  }
  //브랜드 목록 화면 출력 기능
  function showBrandArr() {
    let html = `
    <div class = "swiper sw-brand">
    <div class = "swiper-wrapper">
    `;
    BRAND_ARR.forEach(function (item) {
      let tag = `
      <div class = "swiper-slide">
      <div class = "brand-box">
      <a href= "${item.link}">
      <img src="../images/${item.pic}" alt = "${item.name}"/>
      <p>${item.name}</p>
      <ul class= "brand-info clearfix">
      <li>
       <span class="brand-info-title">${item.title1}</span>
       <span class="brand-info-value">${item.value1}</span>
      </li>
      <li>
       <span class="brand-info-title">${item.title2}</span>
       <span class="brand-info-value">${item.value2}</span>
      </li>
      </ul>
      
      </a>
      </div>
      </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    brandTag.innerHTML = html;
    const swBrand = new Swiper(".sw-brand", {
      slidesPerView: 3,
      spaceBetween: 16,
      navigation: {
        prevEl: ".brand .slide-prev",
        nextEl: ".brand .slide-next",
      },
      pagination: {
        el: ".brand .slide-pg",
        type: "fraction",
      },
    });
  }
  //배너 화면 출력 기능
  function showBannerArr() {
    let html = `
    <div class = "swiper sw-banner">
    <div class = "swiper-wrapper">
    `;
    BANNER_ARR.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
        <a href="${item.link}">
         <img src = "../images/${item.image}" alt ="${item.title}"/>
        
        </a>
      </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    bannerTag.innerHTML = html;
    const swBanner = new Swiper(".sw-banner", {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      spaceBetween: 0,
      navigation: {
        prevEl: ".banner .banner-slide-prev",
        nextEl: ".banner .banner-slide-next",
      },
    });
  }
  //시즌목록 화면 출력기능
  const buyTotal = document.getElementById("buy-total");
  const buyTotalMoney = document.getElementById("buy-total-money");
  let buyTotalCount = 0;
  let buyTotalMoneyPrice = 0;
  function showSeason() {
    let html = "";
    SEASON_ARR.forEach(function (item, index) {
      const tag = `
      <li >
       <div class="season-good clearfix">
        <input 
          type="checkbox"
          id="ch${index}"
          class="season-good-check season-item"
          checked
          value= ${item.price}
          />
        <label for="ch${index}" class="season-label"> ${item.title}</label>  
        <a href="${item.link}" class="season-good-img">
         <img src = "../images/${item.pic}" alt ="${item.title}"/>
        </a>
        <p class = "season-good-info">
        <a href="${item.link}" class="season-good-title">${item.title}</a>
            <a href="${
              item.link
            }" class="season-good-price"><em>${priceToString(
        item.price
      )}</em>원</a>
        </p>
       </div>
      </li>
      `;
      html += tag;
    });
    seasonTag.innerHTML = html;
    //Smooth scroll 적용
    Scrollbar.initAll();
    //체크박스 각각의 기능
    checkBoxFn();
    //계산 출력
    showBuyGood();
  }
  //전체 체크박스 기능
  const chkAll = document.getElementById("chall");
  chkAll.addEventListener("change", function () {
    const chkArr = document.querySelectorAll(".season-item");
    if (chkAll.checked) {
      chkArr.forEach(function (item) {
        item.checked = true;
      });
    } else {
      //전체 체크롤 해제 해야 하는 경우
      chkArr.forEach(function (item) {
        item.checked = false;
      });
    }
    //계산 출력
    showBuyGood();
  });
  //체크박스 각각의 기능
  function checkBoxFn() {
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function (item) {
      item.addEventListener("change", function () {
        //가격을 다시 계산한다.
        //계산 출력
        showBuyGood();
      });
    });
  }
  //계산 출력 기능
  function showBuyGood() {
    //체크가 된 카운팅을 한다 그리고 더한다.
    let count = 0;
    let priceTotal = 0;
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function (item) {
      const state = item.checked;
      if (state) {
        count += 1;
        //count++
        //글자를 정수 숫자로 변경함
        const price = parseInt(item.value);
        priceTotal += price;
      }
    });
    buyTotalCount = count;
    buyTotalMoneyPrice = priceTotal;
    buyTotal.innerHTML = buyTotalCount;
    buyTotalMoney.innerHTML = priceToString(buyTotalMoneyPrice);
    //전체 선택 버튼 해제
    if (buyTotalCount === chkArr.length) {
      //전체 체크 버튼 checked되어야 함
      chkAll.checked = true;
    } else {
      //전체 체크 버튼 checked가 해제 되어야 함
      chkAll.checked = false;
    }
  }
  // 리뷰목록
  function showReview() {
    let html = `
    <div class="swiper sw-review">
    <div class="swiper-wrapper">
    `;
    // 데이터처리
    REVIEW_ARR.forEach(function (item) {
      const tag = `
      <div class="swiper-slide">
        <div class="review-box">
          <a href="${item.link}">
            <div class="review-box-desc">
              <span class="review-box-title">
              ${item.title}
              </span>
              <span class="review-box-star"> ${item.star} </span>
              <span class="review-box-img">
                <img src="../images/${item.pic}" alt="${item.title}" />
              </span>
            </div>
            <p class="review-box-txt">
            ${item.txt}
            </p>
            <span class="review-box-user"> ${item.user}${item.shop} </span>
          </a>
        </div>
      </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    reviewTag.innerHTML = html;
    const swReview = new Swiper(".sw-review", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".review .slide-prev",
        nextEl: ".review .slide-next",
      },
      pagination: {
        el: ".review .slide-pg",
        type: "fraction",
      },
    });
  }
  // 공지사항
  function showNotice() {
    let html = "";
    // 데이터갱신
    NOTICE_ARR.forEach(function (item) {
      const tag = `
      <li>
        <a href="${item.link}">
          <span>
            ${item.title}
          </span>
          <em>
            ${item.date}
          </em>
        </a>
      </li>
      `;
      html += tag;
    });
    noticeTag.innerHTML = html;
  }
  // 물품소식
  function showGoodnews() {
    let html = "";
    // 데이터갱신
    GOODNEWS_ARR.forEach(function (item) {
      const tag = `
      <li>
        <a href="${item.link}">
          <span>
            ${item.title}
          </span>
          <em>
            ${item.date}
          </em>
        </a>
      </li>
      `;
      html += tag;
    });
    goodnewsTag.innerHTML = html;
  }
  // 커뮤니티 탭 메뉴
  // 탭 버튼
  const tabBtArr = document.querySelectorAll(".community-bt");
  // 탭 내용
  const tabConArr = document.querySelectorAll(".community-notice dd");
  // 탭 포커스
  let tabFocusIndex = 0;
  // 탭 버튼 클릭 처리
  tabBtArr.forEach(function (item, index) {
    item.addEventListener("click", function () {
      tabFocusIndex = index;
      tabFocusFn();
    });
  });
  // 탭 포커스 함수를 생성
  function tabFocusFn() {
    // 포커스 css를 적용 및 제거
    // 일단 모두 제거하고 시작
    tabBtArr.forEach(function (item) {
      item.classList.remove("community-bt-active");
    });
    // 인덱스에 해달하는 것만 적용
    tabBtArr[tabFocusIndex].classList.add("community-bt-active");
    // 내용에서 일단 모두 제거하고 시작
    tabConArr.forEach(function (item) {
      item.classList.remove("community-visible-active");
    });
    tabConArr[tabFocusIndex].classList.add("community-visible-active");
  }

  // ========================================
  // 펼침 목록들 보기 기능
  // 더보기 목록기능
  const menuBt = document.getElementById("menu-bt");
  const menuList = document.getElementById("menu-list");
  // 참여 목록기능
  const joinBt = document.getElementById("join-bt");
  const joinList = document.getElementById("join-list");
  //  조합원센터 목록기능
  const centerBt = document.getElementById("center-bt");
  const centerList = document.getElementById("center-list");
  //  배열 순서번호가 주어진다.
  // 배열순서번호 index라고 한다
  const toggleListArr = [menuList, joinList, centerList];
  const toggleBtArr = [menuBt, joinBt, centerBt];
  // 펼침 목록 모두!!!!!! 닫기
  document.addEventListener("click", function () {
    toggleListArr.forEach(function (item) {
      item.style.display = "none";
    });
    // 버튼 초기화
    toggleBtArr.forEach(function (item) {
      item.classList.remove("active");
    });
  });
  //목록 전체를 클릭해도 이벤트 전달을 막는다.
  toggleListArr.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });
  // 코드 블럭이 같은 기능이 반복된다
  // 기능을 만들어서 써야겠다
  function listToggle(버튼, 목록) {
    // 처음에는 목록을 보여주지 않는다.
    목록.style.display = "none";
    // click이벤트가 발생하면 함수를 실행한다
    버튼.addEventListener("click", function (event) {
      // 클릭이 되었다면 이벤트는 아래 전달된다.
      // 클릭된 이벤트를 아래로 전달하지 못하도록 막아준다
      event.stopPropagation();
      toggleBtArr.forEach(function (item) {
        item.classList.remove("active");
      });
      // console.log(목록);
      const nowListId = 목록.getAttribute("id");
      const hideArr = toggleListArr.filter(function (item) {
        // console.log(item);
        let id = item.getAttribute("id");
        // console.log(id);
        if (id !== nowListId) {
          return this;
        }
      });
      // 그리고 새로 저장된 배열의 목록들은
      console.log(hideArr);
      hideArr.forEach(function (item) {
        item.style.display = "none";
      });
      const css = getComputedStyle(목록).display;
      // display값 비교한다.
      if (css === "none") {
        목록.style.display = "block";
        // 클래스를 강제로 추가한다
        버튼.classList.add("active");
      } else {
        목록.style.display = "none";
        // 클래스 강제로 추가한다.
        버튼.classList.remove("active");
      }
    });
    //
  }
  listToggle(menuBt, menuList);
  // toggleListArr[0] = menuList
  listToggle(joinBt, joinList);
  // toggleListArr[1] = joinList
  listToggle(centerBt, centerList);
  // toggleListArr[2] = centerList

  // 전체 메뉴 펼침 기능
  const allMenuArea = document.querySelector(".all-menu-area");
  const allMenu = document.querySelector(".all-menu");
  const cateList = document.querySelector(".cate-list");
  const themeList = document.querySelector(".theme-list");

  allMenuArea.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active");
  });
  cateList.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  themeList.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active");
  });
  themeList.addEventListener("mouseenter", function () {
    allMenu.classList.remove("active");
  });
  // 서브 카테고리 보여주기
  const cateLists = document.querySelectorAll(".cate-list > li");
  const cateDepth2 = document.querySelectorAll(".cate-depth2-list");
  cateLists.forEach(function (item, index) {
    item.addEventListener("mouseenter", function () {
      cateDepth2.forEach(function (itemSub, indexSub) {
        itemSub.style.display = "none";
        if (indexSub === index) {
          itemSub.style.display = "block";
        }
      });
      console.log(index);
    });
  });
};
