const axios = require("axios")
const cheerio = require("cheerio")

async function fetchHTML(url) {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

//Karar

fetchHTML("https://www.karar.com/yazarlar/").then(async ($) => {
  const $aItems = $("a");

  aItems = []
  await $aItems.map(async (index,item) => {
    await aItems.push(item);
  });

  author_article = {}; 
  for(let i in aItems) {
    item = aItems[i]
    if(item.attribs) {
      let href = item.attribs.href
      if(href.includes("yazarlar/") && href.split("/").length == 4) {
        let res = await fetchHTML('https://www.karar.com'+ href)
        author_article[href.split("/")[2]] = res(".text-content").text().trim()
      }
    }

  }

  return author_article

}).then(res => {
  console.log(res);
})


// Yeni çağ
fetchHTML("https://www.yenicaggazetesi.com.tr/yazarlar/").then(async ($) => {
  const $aItems = $("a");
  aItems = []
  await $aItems.map(async (index,item) => {
    await aItems.push(item);
  });

  author_article = {}; 
  for(let i in aItems) {
    item = aItems[i]
    if(item.attribs) {
      let href = item.attribs.href
      if(href && href.includes("https://www.yenicaggazetesi.com.tr/") && !href.includes("https://www.yenicaggazetesi.com.tr/rss/")) {
        let res = await fetchHTML(href)
        author_article[res(".author-info-box").text().trim().split("\n")[0]] = res(".content").text().trim().split("\n")[1]
      }
    }

  }
  console.log(author_article)

})

// Sözcü
fetchHTML("https://www.sozcu.com.tr/kategori/yazarlar/").then(async ($) => {
  const $aItems = $("a");
  aItems = []
  await $aItems.map(async (index,item) => {
    await aItems.push(item);
  });

  author_article = {}; 
  for(let i in aItems) {
    item = aItems[i]
    if(item && item.attribs) {
      let href = item.attribs.href
      if(href && href.includes("https://www.sozcu.com.tr/2023/")) {
        let res = await fetchHTML(href)
        let author_info =  res("a").children().text().trim().split(" ");
        author_article[author_info[0] + " " + author_info[1]] = res("article").find("p").text()
      }
      
    }

  }
  console.log(author_article)

})

// Yeni şafak

fetchHTML("https://www.yenisafak.com/yazarlar").then(async ($) => {
  const $aItems = $("a");
  aItems = []
  await $aItems.map(async (index,item) => {
    await aItems.push(item);
  });

  author_article = {}; 
  href_lst = []

  for(let i in aItems) {
    item = aItems[i]
    if(item.attribs) {
      let href = item.attribs.href
      if(href && href.includes("/yazarlar") && href.split("/").length == 4) {
        href_lst.push(href);
      }
    }

  }
  href_set = href_lst.filter(function(item, pos) {
      return href_lst.indexOf(item) == pos;
  })

  for(let i in href_set) {
    href = href_set[i];
    let res = await fetchHTML("https://www.yenisafak.com/" + href)
    author_article[res(".author-about-card-info__name").text()] = res(".content").find(".ys-paragraph-node").text().trim()
  }

  console.log(author_article)

})




