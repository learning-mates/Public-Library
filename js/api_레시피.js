window.addEventListener('DOMContentLoaded', () => {
  const API_KEY = `f40fc02dbebc40a3a6c4`

  const cook_form = document.querySelector('.cook_form');
  const cook_search = document.querySelector('.cook_search');
  const ingre_form = document.querySelector('.ingre_form');
  const ingre_search = document.querySelector('.ingre_search');

  cook_form.addEventListener('submit', (e)=>{
    e.preventDefault()
    async function getData(){
      let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/RCP_NM=${cook_search.value}/`
      let response = await fetch(url)
      let data = await response.json();
      let data2 = data.COOKRCP01.row
      data2.forEach((recipe_data)=>{

        if(recipe_data.RCP_NM == '해물김치찌개'){
          return
        }


        const recipe_list_wrap = document.querySelector('.recipe_list_wrap')
        const recipe_list_li = document.createElement('li');
        const rcp_img_wrap = document.createElement('div');
        const rcp_img = document.createElement('img');
        const rcp_nm = document.createElement('p');


        recipe_list_wrap.append(recipe_list_li);
        recipe_list_li.append(rcp_img, rcp_nm)

        recipe_list_li.setAttribute('data-RCP_NM', recipe_data.RCP_NM)


        rcp_img_wrap.classList.add('rcp_img_wrap');
        rcp_nm.classList.add('rcp_nm');


        rcp_img.src = recipe_data.ATT_FILE_NO_MAIN
        rcp_nm.innerText = recipe_data.RCP_NM

      })

      let recipe_list_li = document.querySelectorAll('.recipe_list_wrap > li')

      recipe_list_li.forEach((recipe_list_li_ele)=>{
        recipe_list_li_ele.addEventListener('click', ()=>{
          let li_RCP_NM = recipe_list_li_ele.getAttribute('data-RCP_NM').trim();
          location.href = `sub.html?${li_RCP_NM}`
        })
      })

    
    }
    getData();

  })






  ingre_form.addEventListener('submit', (e)=>{
    e.preventDefault();
    async function getData(){
      let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/RCP_PARTS_DTLS=${ingre_search.value}/`
      let response = await fetch(url)
      let data = await response.json();
      let data2 = data.COOKRCP01.row
      data2.forEach((recipe_data)=>{

        if(recipe_data.RCP_NM == '해물김치찌개'){
          return
        }


        const recipe_list_wrap = document.querySelector('.recipe_list_wrap')
        const recipe_list_li = document.createElement('li');
        const rcp_img_wrap = document.createElement('div');
        const rcp_img = document.createElement('img');
        const rcp_nm = document.createElement('p');


        recipe_list_wrap.append(recipe_list_li);
        recipe_list_li.append(rcp_img, rcp_nm)

        recipe_list_li.setAttribute('data-RCP_NM', recipe_data.RCP_NM)


        rcp_img_wrap.classList.add('rcp_img_wrap');
        rcp_nm.classList.add('rcp_nm');


        rcp_img.src = recipe_data.ATT_FILE_NO_MAIN
        rcp_nm.innerText = recipe_data.RCP_NM

      })

      let recipe_list_li = document.querySelectorAll('.recipe_list_wrap > li')

      recipe_list_li.forEach((recipe_list_li_ele)=>{
        recipe_list_li_ele.addEventListener('click', ()=>{
          let li_RCP_NM = recipe_list_li_ele.getAttribute('data-RCP_NM').trim();
          location.href = `sub.html?${li_RCP_NM}`
        })
      })

    
    }
    getData();

  })










});