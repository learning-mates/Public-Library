window.addEventListener("DOMContentLoaded", async () => {
  const API_KEY = `f40fc02dbebc40a3a6c4`;

  const menual_reg = /MANUAL[1-20]/;
  
  const cook_form = document.querySelector(".cook_form");
  const cook_search = document.querySelector(".cook_search");
  const ingre_form = document.querySelector(".ingre_form");
  const ingre_search = document.querySelector(".ingre_search");
  const rcp_list_wrap = document.querySelector(".rcp_list_wrap");

  const now = new Date();
  const day = now.getDate()
  
  let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/${day}/${day+5}`;
  let response = await fetch(url);
  let data = await response.json();
  let data2 = data.COOKRCP01.row;
  
  
  // 오늘의 추천 메뉴
  const rcp_recommand_list_wrap = document.querySelector(".rcp_recommand_list_wrap");
  
  data2.forEach((recipe_data)=>{
    
    const rcp_recommand_li = document.createElement('li');
    const rcp_img = document.createElement("img");
    const rcp_nm = document.createElement("p");
    
    rcp_recommand_list_wrap.append(rcp_recommand_li);
    rcp_recommand_li.append(rcp_img, rcp_nm);
    
    rcp_recommand_li.setAttribute("data-RCP_NM", recipe_data.RCP_NM);
    
    rcp_img.src = recipe_data.ATT_FILE_NO_MAIN;
    rcp_nm.innerText = recipe_data.RCP_NM;
    
  })

  
  // 여러개의 요소 선택하기
  let rcp_reommand_list_li = document.querySelectorAll(".rcp_recommand_list_wrap > li");
  
  // 요소가 여러개니 forEach를 사용하여 요소 하나하나씩 선택할 수 있도록 하였다.
  rcp_reommand_list_li.forEach((rcp_reommand_list_li_ele) => {
    // 검색결과로 나온 음식을 클릭 시
    rcp_reommand_list_li_ele.addEventListener("click", () => {
      // 위에서 내가 만든 속성의 속성값을(레시피 이름)
      let li_RCP_NM = rcp_reommand_list_li_ele.getAttribute("data-RCP_NM").trim();
      
      // location.href를 사용하여 sub페이지로 이동할 수 있게 하였다.
      // location.href = '이동할 주소'는 현재 주소를 이동할 주소로 바꾼다는 의미이다.
      location.href = `sub.html?${li_RCP_NM}`;
    });
  });
  
  function displayData(e, var_name, search_value){
    // submit이 되면 전송되는 기본으로 새로고침되는 현상 없애주기
    e.preventDefault();
    
    // 새로운 리스트 나오게 rcp_list_wrap 밑에 있는 코드들 다 지우기
    rcp_list_wrap.innerHTML = "";
    
    async function getData() {
      // cook_search.value에는 input에 입력한 음식명이 들어있다.
      let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/${var_name}${search_value}/`;
      let response = await fetch(url);
      let data = await response.json();
      let data2 = data.COOKRCP01.row;
      
      // forEach를 사용하여 여러개의 데이터를 하나씩 선택할 수 있다.
      // data2의 개수만큼 반복한다
      data2.forEach((recipe_data) => {
          
        // 빈 배열을 만든다.
        let menual_arr = [];
      
        // recipe_data의 key값 개수만큼 반복한다.
        for (key in recipe_data) {
      
          // 만약 recipe_data가 빈 값이 아니고
          if (recipe_data[key] != "") {
      
            // 정규식 조건에도 맞으면
            if (menual_reg.test(key)) {
      
              // 배열에 넣어준다.
              menual_arr.push(recipe_data[key]);
            }
          }
        }
      
        // 배열 정렬
        menual_arr = menual_arr.sort();
    
        // 배열 안의 요소 개수만큼 반복한다.
        for (let i = 0; i < menual_arr.length; i++) {
          
          // 만약 메뉴얼 첫번째 글자가 1, 2, 3... 순서대로 나오지 않으면 그 레시피는 나오지 않게 하였다.
          if (menual_arr[i].charAt(0) != i + 1) {
            return
          }
        }

        // 해물김치찌개 사진이 이상하여 if문을 사용해 검색결과로 해물김치찌개가 나오면 코드 실행이 되지 않게 하였다.
        if (recipe_data.RCP_NM == "해물김치찌개") {
          return;
        }
        // 요소 만들기
        const rcp_list_li = document.createElement("li");
        const rcp_img_wrap = document.createElement("div");
        const rcp_img = document.createElement("img");
        const rcp_nm = document.createElement("p");
        // 요소를 부모 요소 맨 뒤에 추가하기(연결)
        rcp_list_wrap.append(rcp_list_li);
        rcp_list_li.append(rcp_img_wrap, rcp_nm);
        rcp_img_wrap.append(rcp_img);
  
        // 요소의 속성을 만들고(data-내가 정한 이름) 레시피 이름을 속성값으로 넣어주었다.
        // 검색 결과로 나온 음식을 클릭할 때 이 레시피 이름(속성값)을 받아와 sub페이지에 해당 레시피 데이터를 나오게 할 수 있다.
        rcp_list_li.setAttribute("data-RCP_NM", recipe_data.RCP_NM);
  
        // css를 쉽게 사용할 수 있도록 class를 부여하였다.
        rcp_img_wrap.classList.add("rcp_img_wrap");
        rcp_nm.classList.add("rcp_nm");
  
        // 데이터에서 음식사진 경로를 받아와 rcp_img의 src에 넣어주어 사진이 나오도록 하였다.
        rcp_img.src = recipe_data.ATT_FILE_NO_MAIN;
  
        if (recipe_data.ATT_FILE_NO_MAIN == "") {
          rcp_img.src = recipe_data.ATT_FILE_NO_MK;
        }
  
        rcp_nm.innerText = recipe_data.RCP_NM;
      });
  
      // 여러개의 요소 선택하기
      let rcp_list_li = document.querySelectorAll(".rcp_list_wrap > li");
  
      // 요소가 여러개니 forEach를 사용하여 요소 하나하나씩 선택할 수 있도록 하였다.
      rcp_list_li.forEach((rcp_list_li_ele) => {
        // 검색결과로 나온 음식을 클릭 시
        rcp_list_li_ele.addEventListener("click", () => {
          // 위에서 내가 만든 속성의 속성값을(레시피 이름)
          let li_RCP_NM = rcp_list_li_ele.getAttribute("data-RCP_NM").trim();
  
          // location.href를 사용하여 sub페이지로 이동할 수 있게 하였다.
          // location.href = '이동할 주소'는 현재 주소를 이동할 주소로 바꾼다는 의미이다.
          location.href = `sub.html?${li_RCP_NM}`;
        });
      });
    }
    getData();

  }

  //////////////// 음식명 검색 시 실행될 코드 /////////////////////
  cook_form.addEventListener("submit", (e) => {

    displayData(e, 'RCP_NM=', cook_search.value)

  });

  //////////////// 재료명 검색 시 실행될 코드 /////////////////////
  ingre_form.addEventListener("submit", (e) => {

    displayData(e, 'RCP_PARTS_DTLS=', ingre_search.value)

  });
});
