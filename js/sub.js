window.addEventListener('DOMContentLoaded', () => {
  const API_KEY = `f40fc02dbebc40a3a6c4`
  let recipe_name = decodeURI(location.href)
  recipe_name = recipe_name.split('?')[1];

  const menual_reg = /MANUAL[1-20]{1,2}/
  const menual_img_reg = /MANUAL_IMG/
  let menual_arr = []
  let menual_img_arr = []


  async function getData(){

    let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/RCP_NM=${recipe_name}/`
    const response = await fetch(url)
    const data = await response.json();
    console.log('data', data);
    let recipe_data = data.COOKRCP01.row[0]

    
    const container = document.querySelector('.container');
    const menu_img_wrap = document.createElement('div')
    const menu_img = document.createElement('img')
    const rcp_nm = document.createElement('p')
    const rcp_pat = document.createElement('p')
    const rcp_dtls = document.createElement('p')
    const menual_wrap = document.createElement('ul')
    
    container.append(menu_img_wrap, rcp_nm, rcp_pat, rcp_dtls, menual_wrap)
    menu_img_wrap.append(menu_img)

    menu_img.src = recipe_data.ATT_FILE_NO_MK
    rcp_nm.innerText = recipe_data.RCP_NM
    rcp_pat.innerText = recipe_data.RCP_PAT2
    rcp_dtls.innerText = recipe_data.RCP_PARTS_DTLS


    menu_img_wrap.classList.add('menu_img_wrap')
    rcp_nm.classList.add('rcp_nm');
    rcp_pat.classList.add('rcp_pat');
    rcp_dtls.classList.add('rcp_dtls');
    menual_wrap.classList.add('menual_wrap');


    
    for(key in recipe_data){
      if(recipe_data[key]!=''){
        if(menual_reg.test(key)){
          menual_arr.push(recipe_data[key])
        }
        if(menual_img_reg.test(key)){
          menual_img_arr.push(recipe_data[key])
        }
      }
    }
    menual_arr = menual_arr.sort()
    menual_img_arr = menual_img_arr.sort()
    

    menual_arr.forEach((ele, index)=>{
      const menual_li = document.createElement('li')
      const menual_li_txt = document.createElement('p')
      const menual_li_img_wrap = document.createElement('div')
      const menual_li_img = document.createElement('img')

      menual_li_img_wrap.classList.add('menual_li_img_wrap')

      menual_li_img.src = menual_img_arr[index]
      menual_li_txt.innerText = ele

      menual_wrap.append(menual_li)
      menual_li.append(menual_li_img_wrap, menual_li_txt)
      menual_li_img_wrap.append(menual_li_img)
    })








  }


  getData();
});