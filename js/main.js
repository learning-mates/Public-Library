window.addEventListener('DOMContentLoaded', () => {
  const API_KEY = `f40fc02dbebc40a3a6c4`

  const menual_reg = /MANUAL[1-20]/
  
  //////////////// 음식명 검색 시 실행될 코드 /////////////////////
  const cook_form = document.querySelector('.cook_form');
  const cook_search = document.querySelector('.cook_search');
  const recipe_list_wrap = document.querySelector('.recipe_list_wrap');

  
  cook_form.addEventListener('submit', (e)=>{
    
    // submit이 되면 전송되는 기본으로 새로고침되는 현상 없애주기
    e.preventDefault()

    // 새로운 리스트 나오게 recipe_list_wrap 밑에 있는 코드들 다 지우기
    recipe_list_wrap.innerHTML = ''

    async function getData(){

      // cook_search.value에는 input에 입력한 음식명이 들어있다.
      let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/RCP_NM=${cook_search.value}/`
      let response = await fetch(url)
      let data = await response.json();
      let data2 = data.COOKRCP01.row
      console.log(data2)

      // forEach를 사용하여 여러개의 데이터를 하나씩 선택할 수 있다.
      // data2의 개수만큼 반복한다.
      data2.forEach((recipe_data)=>{
        let menual_arr = []
        for(key in recipe_data){
          if(recipe_data[key]!=''){
            if(menual_reg.test(key)){
              menual_arr.push(recipe_data[key])
            }
          }
        }

        menual_arr = menual_arr.sort()

        for(let i = 0; i < menual_arr.length; i++){
          if(menual_arr[i].charAt(0) != i+1){
            return
          }
        }
        
        // 해물김치찌개 사진이 이상하여 if문을 사용해 검색결과로 해물김치찌개가 나오면 코드 실행이 되지 않게 하였다.
        if(recipe_data.RCP_NM == '해물김치찌개'){
          return
        }
        

        // 요소 만들기
        const recipe_list_li = document.createElement('li');
        const rcp_img_wrap = document.createElement('div');
        const rcp_img = document.createElement('img');
        const rcp_nm = document.createElement('p');
        
        // 요소를 부모 요소 맨 뒤에 추가하기(연결)
        recipe_list_wrap.append(recipe_list_li);
        recipe_list_li.append(rcp_img_wrap, rcp_nm);
        rcp_img_wrap.append(rcp_img);
        
        // 요소의 속성을 만들고(data-내가 정한 이름) 레시피 이름을 속성값으로 넣어주었다.
        // 검색 결과로 나온 음식을 클릭할 때 이 레시피 이름(속성값)을 받아와 sub페이지에 해당 레시피 데이터를 나오게 할 수 있다.
        recipe_list_li.setAttribute('data-RCP_NM', recipe_data.RCP_NM);
        
        // css를 쉽게 사용할 수 있도록 class를 부여하였다.
        rcp_img_wrap.classList.add('rcp_img_wrap');
        rcp_nm.classList.add('rcp_nm');
        
        // 데이터에서 음식사진 경로를 받아와 rcp_img의 src에 넣어주어 사진이 나오도록 하였다.
        rcp_img.src = recipe_data.ATT_FILE_NO_MAIN

        if(recipe_data.ATT_FILE_NO_MAIN == ''){
          rcp_img.src = recipe_data.ATT_FILE_NO_MK
        }

        rcp_nm.innerText = recipe_data.RCP_NM
        
      })
      
      // 여러개의 요소 선택하기
      let recipe_list_li = document.querySelectorAll('.recipe_list_wrap > li')
      
      // 요소가 여러개니 forEach를 사용하여 요소 하나하나씩 선택할 수 있도록 하였다.
      recipe_list_li.forEach((recipe_list_li_ele)=>{

        // 검색결과로 나온 음식을 클릭 시
        recipe_list_li_ele.addEventListener('click', ()=>{
          
          // 위에서 내가 만든 속성의 속성값을(레시피 이름)
          let li_RCP_NM = recipe_list_li_ele.getAttribute('data-RCP_NM').trim();

          // location.href를 사용하여 sub페이지로 이동할 수 있게 하였다.
          // location.href = '이동할 주소'는 현재 주소를 이동할 주소로 바꾼다는 의미이다.
          location.href = `sub.html?${li_RCP_NM}`
        })
      })
      
      
    }
    getData();
  });


  //////////////// 재료명 검색 시 실행될 코드 /////////////////////
  const ingre_form = document.querySelector(".ingre_form");
  const ingre_search = document.querySelector(".ingre_search");

  ingre_form.addEventListener("submit", (e) => {
    e.preventDefault();
    async function getData() {
      let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/RCP_PARTS_DTLS=${ingre_search.value}/`;
      let response = await fetch(url);
      let data = await response.json();
      let data2 = data.COOKRCP01.row;
      data2.forEach((recipe_data) => {
        if (recipe_data.RCP_NM == "해물김치찌개") {
          return;
        }

        const recipe_list_wrap = document.querySelector(".recipe_list_wrap");
        const recipe_list_li = document.createElement("li");
        const rcp_img_wrap = document.createElement("div");
        const rcp_img = document.createElement("img");
        const rcp_nm = document.createElement("p");

        recipe_list_wrap.append(recipe_list_li);
        recipe_list_li.append(rcp_img, rcp_nm);

        recipe_list_li.setAttribute("data-RCP_NM", recipe_data.RCP_NM);

        rcp_img_wrap.classList.add("rcp_img_wrap");
        rcp_nm.classList.add("rcp_nm");

        rcp_img.src = recipe_data.ATT_FILE_NO_MAIN;
        rcp_nm.innerText = recipe_data.RCP_NM;
      });

      let recipe_list_li = document.querySelectorAll('.recipe_list_wrap > li')

      recipe_list_li.forEach((recipe_list_li_ele)=>{
        recipe_list_li_ele.addEventListener('click', ()=>{
          let li_RCP_NM = recipe_list_li_ele.getAttribute('data-RCP_NM').trim();
          location.href = `sub.html?${li_RCP_NM}`
        })
      })

    
    }
    getData();
  });

});
