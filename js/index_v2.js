document.addEventListener('DOMContentLoaded', () => {

  // =======================
  // 전역 변수
  // =======================
  const pages = document.querySelectorAll('.page-content');
  const likedProductsList = document.getElementById('liked_products_list');
  const likedStylesList = document.getElementById('liked_styles_list');
  let likedProductsSwiper = null;
  let likedStylesSwiper = null;

  const allProducts_skincare = [
    { id: 'new1', type: 'product', name: '플레이 컬러 아이즈 오브제', img: 'images/products/new_product1.jpg' },
    { id: 'new2', type: 'product', name: '플레이 컬러 아이즈 오브제', img: 'images/products/new_product2.jpg' },
    { id: 'best1', type: 'product', name: '순정 약산성 5.5 진정 토너', img: 'images/products/best_product1.jpg' },
  ];
  const allProducts_basemakeup = [
    { id: 'base1', type: 'product', name: '더블 래스팅 파운데이션', img: 'images/products/basemakeup1.jpg' },
  ];
  const allStyles = [
    { id: 'style1', type: 'style', name: '데일리 청순 메이크업', img: 'images/styles/style1.jpg' },
  ];
  const recommendedKeywords = ['마스카라', '아이라이너', '립스틱', '파운데이션', '토너'];

  // =======================
  // 페이지 전환
  // =======================
  function hideAllPages() {
    pages.forEach(p => p.classList.remove('active'));
  }

  function showPage(pageId) {
    hideAllPages();
    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');
    updateActiveNav(pageId);
    window.scrollTo(0, 0);
  }

  function updateActiveNav(pageId) {
    document.querySelectorAll('#bottom_nav .nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });
  }

  // =======================
  // 좋아요 기능
  // =======================
  function toggleLike(id, type) {
    let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    const index = likedItems.findIndex(item => item.id === id && item.type === type);
    if (index > -1) likedItems.splice(index, 1);
    else {
      const allItems = allProducts_skincare.concat(allProducts_basemakeup, allStyles);
      const itemData = allItems.find(i => i.id === id && i.type === type);
      if (itemData) likedItems.push(itemData);
    }
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    updateWishlistButtonStateAll();
    renderLikedItems();
  }

  function updateWishlistButtonStateAll() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
      btn.classList.toggle('liked', likedItems.some(i => i.id === btn.dataset.id && i.type === btn.dataset.type));
    });
  }

  function renderLikedItems() {
    if (!likedProductsList || !likedStylesList) return;
    likedProductsList.innerHTML = '';
    likedStylesList.innerHTML = '';
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    if (!likedItems.length) {
      likedProductsList.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#999;">아직 찜한 상품이 없어요.</p>`;
      likedStylesList.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#999;">아직 찜한 스타일이 없어요.</p>`;
    } else {
      likedItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card swiper-slide';
        card.innerHTML = `
          <div class="image-container">
            <img src="${item.img}" alt="${item.name}">
            <button class="wishlist-btn" data-id="${item.id}" data-type="${item.type}">
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <div class="info"><span class="product-name">${item.name}</span></div>
        `;
        if (item.type === 'product') likedProductsList.appendChild(card);
        else likedStylesList.appendChild(card);
      });
    }

    updateWishlistButtonStateAll();

    if (likedProductsSwiper) likedProductsSwiper.update();
    else likedProductsSwiper = new Swiper('.liked-products-swiper', { slidesPerView: 2, spaceBetween: 10 });

    if (likedStylesSwiper) likedStylesSwiper.update();
    else likedStylesSwiper = new Swiper('.liked-styles-swiper', { slidesPerView: 2, spaceBetween: 10 });
  }

  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;
    const wasLiked = btn.classList.contains('liked');
    toggleLike(btn.dataset.id, btn.dataset.type);
    if (!wasLiked && confirm('좋아요 목록에서 한번에 확인해보시겠어요?')) showPage('liked_page');
  });

  // =======================
  // 검색창 토글
  // =======================
  const searchBtn = document.getElementById('search_toggle');
  const mobileSearch = document.querySelector('.mobile-search-bar');
  const searchInput = mobileSearch?.querySelector('input[type="text"]');
  const recommendedList = mobileSearch?.querySelector('.recommended-keywords');

  function renderRecommendedKeywords() {
    if (!recommendedList) return;
    recommendedList.innerHTML = '';
    recommendedKeywords.forEach(keyword => {
      const li = document.createElement('li');
      li.textContent = keyword;
      li.addEventListener('click', () => { if (searchInput) searchInput.value = keyword; });
      recommendedList.appendChild(li);
    });
  }

  function toggleSearch() {
    if (!mobileSearch) return;
    mobileSearch.classList.toggle('active');
    if (mobileSearch.classList.contains('active')) {
      renderRecommendedKeywords();
      searchInput?.focus();
    }
  }

  searchBtn?.addEventListener('click', e => { e.preventDefault(); toggleSearch(); });

  document.addEventListener('click', e => {
    if (mobileSearch && !mobileSearch.contains(e.target) && !searchBtn.contains(e.target)) {
      mobileSearch.classList.remove('active');
    }
  });

  // =======================
  // 햄버거 메뉴
  // =======================
  const menuBtn = document.getElementById('menu_toggle');
  const sideMenu = document.getElementById('side_menu');
  const sideMenuClose = sideMenu?.querySelector('.close_btn');

  menuBtn?.addEventListener('click', e => { e.preventDefault(); sideMenu?.classList.add('active'); });
  sideMenuClose?.addEventListener('click', e => { e.preventDefault(); sideMenu?.classList.remove('active'); });

  sideMenu?.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      showPage(btn.dataset.page);
      const titleEl = document.getElementById('product_category_title');
      if (btn.dataset.category && titleEl) titleEl.textContent = btn.dataset.category;
      sideMenu.classList.remove('active');
    });
  });

  // =======================
  // Swiper 초기화
  // =======================
  new Swiper(".mySwiper", { loop: true, pagination: { el: ".swiper-pagination", clickable: true, type: 'fraction' }, autoplay: { delay: 3000, disableOnInteraction: false } });
  new Swiper(".mySwiper_related", { slidesPerView: "auto", spaceBetween: 15 });
  new Swiper(".mySwiper_new", { slidesPerView: "auto", spaceBetween: 15 });
  new Swiper(".mySwiper_best", { slidesPerView: "auto", spaceBetween: 20, freeMode: true, mousewheel: true });
  new Swiper(".mySwiper_style", { slidesPerView: "auto", spaceBetween: 20, centeredSlides: true, loop: true });

  // =======================
  // 하단바 클릭
  // =======================
  document.querySelectorAll('#bottom_nav a').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (btn.classList.contains('nav-btn')) {
        if (btn.dataset.page === 'home') location.href = 'index_v2.html';
        else showPage(btn.dataset.page);
      }
      if (btn.classList.contains('cart-trigger') || btn.classList.contains('login-trigger')) {
        document.getElementById('login_modal_overlay').style.display = 'flex';
      }
    });
  });

  // =======================
  // 로그인 모달
  // =======================
  const loginModal = document.getElementById('login_modal_overlay');
  const loginCloseBtn = loginModal?.querySelector('.close_modal_btn');

  loginCloseBtn?.addEventListener('click', () => { loginModal.style.display = 'none'; });

  document.querySelectorAll('.login-trigger, #login_text_btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (loginModal) loginModal.style.display = 'flex';
    });
  });

  // =======================
  // Top 버튼
  // =======================
  const topBtn = document.querySelector('.top_btn');

  function toggleTopBtn() {
    if (!topBtn) return;
    // 페이지 맨 아래에서 100px 이내일 때만 표시
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  }

  if (topBtn) {
    topBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =======================
  // 하단바 숨김/보이기 및 Top 버튼
  // =======================
  const bottomNav = document.getElementById('bottom_nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (bottomNav) {
      if (currentScrollY > lastScrollY && currentScrollY > 50) bottomNav.classList.add('hidden');
      else bottomNav.classList.remove('hidden');
    }

    toggleTopBtn();
    lastScrollY = currentScrollY;
  });

  // =======================
  // 언어 전환
  // =======================
  const langKoBtn = document.getElementById('lang-ko');
  const langEnBtn = document.getElementById('lang-en');

  const footerTextElements = {
    info: document.querySelector('.info-group'),
    contact: document.querySelector('.contact-group'),
    legal: document.querySelector('.legal-group')
  };

  function switchLanguage(lang) {
    if (!footerTextElements.info || !footerTextElements.contact || !footerTextElements.legal) return;

    if (lang === 'ko') {
      langKoBtn?.classList.add('active');
      langEnBtn?.classList.remove('active');

      footerTextElements.info.innerHTML = `
        <p class="font-bold">에뛰드하우스</p>
        <p><strong>씨제이올리브영 주식회사</strong> | <strong>대표이사:</strong> 이선정</p>
        <p><strong>주소:</strong> 서울특별시 중구 한강대로 372, 24층</p>
        <p><strong>사업자등록번호:</strong> 809-81-01574</p>
        <p><strong>통신판매업신고:</strong> 2019-서울용산-1628</p>
      `;
      footerTextElements.contact.innerHTML = `
        <p class="font-bold">고객센터 <a href="tel:1588-1234" class="tel-link">1588-1234</a></p>
        <p>운영시간: 평일 09:00 ~ 18:00 (유료)</p>
      `;
      footerTextElements.legal.innerHTML = `
        <a href="#" class="font-bold" style="color:#fff;">이용약관</a>
        <span class="divider">|</span>
        <a href="#" class="font-bold" style="color:#fff;">개인정보처리방침</a>
        <span class="divider">|</span>
        <a href="#" class="font-bold" style="color:#fff;">사업자정보 확인</a>
      `;
    } else {
      langKoBtn?.classList.remove('active');
      langEnBtn?.classList.add('active');

      footerTextElements.info.innerHTML = `
        <p class="font-bold">Etude House</p>
        <p><strong>CJ Olive Young Co., Ltd.</strong> | <strong>CEO:</strong> Lee Sunjung</p>
        <p><strong>Address:</strong> 24F, 372 Hangang-daero, Jung-gu, Seoul</p>
        <p><strong>Business Reg. No.:</strong> 809-81-01574</p>
        <p><strong>E-Commerce Reg.:</strong> 2019-Seoul-Yongsan-1628</p>
      `;
      footerTextElements.contact.innerHTML = `
        <p class="font-bold">Customer Center <a href="tel:1588-1234" class="tel-link">1588-1234</a></p>
        <p>Hours: Mon-Fri 09:00 ~ 18:00</p>
      `;
      footerTextElements.legal.innerHTML = `
        <a href="#" class="font-bold" style="color:#fff;">Terms of Use</a>
        <span class="divider">|</span>
        <a href="#" class="font-bold" style="color:#fff;">Privacy Policy</a>
        <span class="divider">|</span>
        <a href="#" class="font-bold" style="color:#fff;">Business Info</a>
      `;
    }
  }

  langKoBtn?.addEventListener('click', () => switchLanguage('ko'));
  langEnBtn?.addEventListener('click', () => switchLanguage('en'));

  // =======================
  // 뒤로가기 버튼
  // =======================
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      history.back();
    });
  });

  // 초기 상태
  updateWishlistButtonStateAll();
  renderLikedItems();
  switchLanguage('ko'); // 초기 언어 설정
  toggleTopBtn();
});
