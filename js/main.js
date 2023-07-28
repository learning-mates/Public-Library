window.addEventListener("DOMContentLoaded", async () => {
  const API_KEY = `f40fc02dbebc40a3a6c4`;
  // const API_KEY2 = `125a942cee624a03b4a3`;

  const now = new Date();
  const day = now.getDate();
  console.log(day);

  let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/40`;
  let response = await fetch(url);
  let data = await response.json();
  let data2 = data.COOKRCP01.row;

  if (data2.RCP_NM == "해물김치찌개") {
    return;
  }
  //console.log("data2", data2[0]);

  // 오늘의 추천 메뉴
  const recipe_recommand = document.querySelector(".recipe_recommand");
  const recipe_recommand_li = document.createElement("li");
  const recipe_recommand_li2 = document.createElement("li");
  const recipe_recommand_li3 = document.createElement("li");
  const recipe_recommand_li4 = document.createElement("li");
  const recipe_recommand_li5 = document.createElement("li");
  const recipe_recommand_li6 = document.createElement("li");
  const recipe_recommand_li7 = document.createElement("li");
  const rcp_img2_recommand = document.createElement("div");

  const rcp_img2 = document.createElement("img");
  const rcp_nm2 = document.createElement("p");
  const rcp_img3 = document.createElement("img");
  const rcp_nm3 = document.createElement("p");
  const rcp_img4 = document.createElement("img");
  const rcp_nm4 = document.createElement("p");
  const rcp_img5 = document.createElement("img");
  const rcp_nm5 = document.createElement("p");
  const rcp_img6 = document.createElement("img");
  const rcp_nm6 = document.createElement("p");
  const rcp_img7 = document.createElement("img");
  const rcp_nm7 = document.createElement("p");

  // 오늘의 추천 메뉴 보여줘!!
  recipe_recommand.append(recipe_recommand_li);
  recipe_recommand.append(recipe_recommand_li2);
  recipe_recommand.append(recipe_recommand_li3);
  recipe_recommand.append(recipe_recommand_li4);
  recipe_recommand.append(recipe_recommand_li5);
  recipe_recommand.append(recipe_recommand_li6);
  recipe_recommand.append(recipe_recommand_li7);
  recipe_recommand_li.append(rcp_img2, rcp_nm2);
  recipe_recommand_li2.append(rcp_img3, rcp_nm3);
  recipe_recommand_li3.append(rcp_img4, rcp_nm4);
  recipe_recommand_li4.append(rcp_img5, rcp_nm5);
  recipe_recommand_li5.append(rcp_img6, rcp_nm6);
  recipe_recommand_li6.append(rcp_img7, rcp_nm7);

  // 속성
  recipe_recommand_li.setAttribute("data-RCP_NM", data2.RCP_NM);
  rcp_img2_recommand.classList.add("rcp_img_recommand");
  recipe_recommand_li.classList.add("rcp_recommand_img");
  recipe_recommand_li2.classList.add("rcp_recommand_img2");
  recipe_recommand_li3.classList.add("rcp_recommand_img3");
  recipe_recommand_li4.classList.add("rcp_recommand_img4");
  recipe_recommand_li5.classList.add("rcp_recommand_img5");
  recipe_recommand_li6.classList.add("rcp_recommand_img6");

  rcp_nm2.classList.add("rcp_nm2");
  rcp_img2.src = data2[day].ATT_FILE_NO_MAIN;
  rcp_nm2.innerText = data2[day].RCP_NM;
  rcp_img3.src = data2[day + 1].ATT_FILE_NO_MAIN;
  rcp_nm3.innerText = data2[day + 1].RCP_NM;
  rcp_img4.src = data2[day + 2].ATT_FILE_NO_MAIN;
  rcp_nm4.innerText = data2[day + 2].RCP_NM;
  rcp_img5.src = data2[day + 3].ATT_FILE_NO_MAIN;
  rcp_nm5.innerText = data2[day + 3].RCP_NM;
  rcp_img6.src = data2[day + 4].ATT_FILE_NO_MAIN;
  rcp_nm6.innerText = data2[day + 4].RCP_NM;
  rcp_img7.src = data2[day + 5].ATT_FILE_NO_MAIN;
  rcp_nm7.innerText = data2[day + 5].RCP_NM;
  const cook_form = document.querySelector(".cook_form");
  const cook_search = document.querySelector(".cook_search");
  const ingre_form = document.querySelector(".ingre_form");
  const ingre_search = document.querySelector(".ingre_search");

  cook_form.addEventListener("submit", (e) => {
    e.preventDefault();
    async function getData() {
      let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/RCP_NM=${cook_search.value}/`;
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
        rcp_img.setAttribute("onerror", "this.src='/img/따봉.png';");
        rcp_nm.innerText = recipe_data.RCP_NM;
      });

      let recipe_list_li = document.querySelectorAll(".recipe_list_wrap > li");

      recipe_list_li.forEach((recipe_list_li_ele) => {
        recipe_list_li_ele.addEventListener("click", () => {
          let li_RCP_NM = recipe_list_li_ele.getAttribute("data-RCP_NM").trim();
          location.href = `sub.html?${li_RCP_NM}`;
        });
      });
    }
    getData();
  });

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

      let recipe_list_li = document.querySelectorAll(".recipe_list_wrap > li");

      recipe_list_li.forEach((recipe_list_li_ele) => {
        recipe_list_li_ele.addEventListener("click", () => {
          let li_RCP_NM = recipe_list_li_ele.getAttribute("data-RCP_NM").trim();
          location.href = `sub.html?${li_RCP_NM}`;
        });
      });
    }
    getData();
  });
});
