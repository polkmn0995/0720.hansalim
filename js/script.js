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
      // 비주얼 화면에 배치한다
      showVisual();
      //오늘의 상품을 화면에 배치
      showTodayGood();
      //할인 상품을 화면에 배치
      showSaleGood();
      //신상품을 화면에 배치
      showNewGood();
      //추천상품을 화면에 배치
      showRecommendGood();
      // 인기물품 아이콘을 화면에 배치
      showPopularIconGood();
      // 인기물품
      showPopularGood();
      // 브랜드관
      showBrandArr();
      // 배너
      showBannerArr();
    }
  };
  // 자료를 호출한다.
  console.log("자료를 가져온다. XMLHT.....");
  xhttp.open("GET", "data.json");
  // 웹브라우저 기능을 실행 할수 있도록 요청
  xhttp.send();
  // ============================================
  //비주얼
  let VISUAL_ARR;
  let visualTag = document.getElementById("data-visual");
  //오늘 상품
  let TODAY_GOOD;
  let todayTag = document.getElementById("data-today");
  let todayTag2 = document.getElementById("data-today2");
  //할인 상품
  let SALE_GOOD;
  let saleTag = document.getElementById("data-sale");
  //신상품
  let NEW_GOOD;
  let newTag = document.getElementById("data-new");
  let newListTag = document.getElementById("data-new-list");
  // 추천 상품
  let RECOMMEND_GOOD;
  let recommendTag = document.getElementById("data-recommend");
  // 인기물품 아이콘
  let POPULAR_ICON;
  let popularIconTag = document.getElementById("data-popular-icon");
  // 인기물품
  let POPULAR_GOOD;
  let popularshow = 1; // 목록중에 0번을 보여준다
  let popularTag = document.getElementById("data-popular");
  // 브랜드관
  let BRAND_ARR;
  let brandTag = document.getElementById("data-brand");
  // 배너
  let BANNER_ARR;
  let bannerTag = document.getElementById("data-banner");

  // --------------------------------------------------
  //  비주얼 화면 출력 기능
  function showVisual() {
    let html = "";
    VISUAL_ARR.forEach(function (item) {
      const tag = `
    <div class="swiper-slide">
    <div class="visual-slide-page">
    <a href = "${item.link}">
    <img src="../images/${item.pic}" alt="${item.name}"/>
    </a>
    </div>
    </div>
    `;
      html += tag;
    });
    visualTag.innerHTML = html;
    //비주얼 슬라이드 기능
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
    //비주얼 슬라이드 멈춤 기능
    const swVisualPlay = document.querySelector(".visual-play");
    swVisualPlay.addEventListener("click", function () {
      //현재 active클래스 있는지를 확인하고
      //기능을 설정한다.
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
      if (index < 4) {
        return item;
      }
    });
    topArr.forEach(function (item) {
      let tag = `
     <div class="good-box">
     <!-- 제품이미지 -->
     <a href="${item.link}" class="good-img">
         <img src="../images/${item.pic}" alt="${item.name}"/>
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
    //배열의 밑부분 인덱스 4~7 까지 배열 만들기
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
       <img src="../images/${item.pic}" alt="${item.name}"/>
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
  //할인상품 화면 출력 기능
  function showSaleGood() {
    let html = `
     <div class = "swiper sw-sale">
     <div class = "swiper-wrapper">
     `;
    SALE_GOOD.forEach(function (item) {
      let tag = `
       <div class= "swiper-slide">
       <div class="good-box">
     <!-- 제품이미지 -->
     <a href="${item.link}" class="good-img">
         <img src="../images/${item.pic}" alt="${item.name}"/>
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
  //신상품 화면 출력 기능
  function showNewGood() {
    //첫번째 화면 출력
    let obj = NEW_GOOD[0];
    let newGoodFirst = `
     <a href = "${obj.link}" class= "new-img">
     <img src="../images/${obj.pic}" alt="${obj.title}"/>
     </a>
     <a href = "${obj.link}" class= "new-title">
     ${obj.title}
     </a>
     <a href = "${obj.link}" class= "new-txt">
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
        <a href = "${item.link}" class= "new-box-img">
     <img src="../images/${item.pic}" alt="${item.title}"/>
     </a>
     <a href = "${item.link}" class= "new-box-title">
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
    RECOMMEND_GOOD.forEach(function (item) {
      let tag = `
        <div class= "swiper-slide">
        <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
          <img src="../images/${item.pic}" alt="${item.name}"/>
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
    const showRecommendGood = new Swiper(".sw-recommend", {
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
  // 인기물품 아이콘 출력
  function showPopularIconGood() {
    let html = `
    <div class="swiper sw-icon">
    <div class="swiper-wrapper">
    `;
    // 데이터처리
    POPULAR_ICON.forEach(function (item) {
      const tag = `
      <div class="swiper-slide">
        <a href="${item.link}">
          <span class="popular-cate-icon"
          style="
          background:url('../images/${item.icon}') no-repeat; background-position: 0px 0px;
          "></span>
          <span class="popular-cate-name">${item.txt}</span>
        </a>
      </div>`;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    //
    popularIconTag.innerHTML = html;
    const swIcon = new Swiper(".sw-icon", {
      slidesPerGroup: 7,
      slidesPerView: 7,
      spaceBetween: 10,
      navigation: {
        prevEl: ".popular-slide-prev",
        nextEl: ".popular-slide-next",
      },
    });
    const tag = document.querySelectorAll(".popular-slide a");
    tag.forEach(function (item, index) {
      item.addEventListener("mouseover", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "-64px";
      });
      item.addEventListener("mouseout", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "0";
      });
      // 타이틀 클릭을 하면 버튼 (.popular-more) 의 글자가
      // 클릭된 타이틀의 글자로 변경
      item.addEventListener("click", function (event) {
        // 웹브라우저 갱신이 되므로 UI를 위해 스크롤업을 막음
        event.preventDefault();
        const bt = document.querySelector(".popular-more");
        const title = this.querySelector(".popular-cate-name");
        bt.innerHTML = `${title.innerHTML} 물품 더보기`;
        // 하단의 목록을 갱신
        // 현재 클릭된 번호를 popularshow 에 담김
        popularshow = index;
        showPopularGood();
      });
    });
  }
  // 인기상품
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
      </div>`;
      html += tag;
    });
    popularTag.innerHTML = html;
  }
  // 브랜드관
  function showBrandArr() {
    let html = `
  <div class="swiper sw-brand">
  <div class="swiper-wrapper">
    `;
    BRAND_ARR.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
      <div class="brand-box">
      <a href="${item.link}">
        <img src="../images/${item.pic}" alt = " ${item.name}"/>
          <p> ${item.name} </p>
            <ul class="brand-info clearfix">
              <li>
                <span class="brand-info-title"> ${item.title1} </span>
                <span class="brand-info-value"> ${item.value1} </span>
              </li>
              <li>
                <span class="brand-info-title"> ${item.title2} </span>
                <span class="brand-info-value"> ${item.value2} </span>
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
  // 배너
  function showBannerArr() {
    let html = `
    <div class="swiper sw-banner">
    <div class="swiper-wrapper">
    `;
    BANNER_ARR.forEach(function (item) {
      let tag = `
      <div class="swiper-slide">
        <a href="${item.link}">
          <img src="../images/${item.image}" alt="${item.title}"/>
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

  //--------------------------------------------------
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
        if (id !== nowListId) {
          return this;
        }
      });
      // 그리고 새로 저장된 배열의 목록들은
      // console.log(hideArr);
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

  //전체 메뉴 펼침 기능
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
  //서브 카테고리 보여주기
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
      // console.log(index);
    });
  });
};
