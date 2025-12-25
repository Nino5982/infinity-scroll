let search = document.getElementById("search");
let loader = document.querySelector(".loader");
let apiKey = "ckg3cML_GmettB1lKVZzluiCTzN1304pq7LUIt1eybU";
let count = 5;

let initialLoad = true;
let isloading = false;
let imagesLoaded = 0;
let totalImages = 0;
let url = `https://api.unsplash.com`;
let query = "";

search.addEventListener("change", () => {
  document.getElementById("image-section").innerHTML = "";
  console.log(search.value);
  query = search.value;
  isloading = false;
  getPhotos();
});

function getUnsplashUrl(count, query) {
  console.log(query);

  let endpoint = query
    ? `search/photos?query=${query}&per_page=${count}`
    : `photos/random?count=${count}`;
  return `${url}/${endpoint}&client_id=${apiKey}`;
}

async function getPhotos() {
  if (isloading) {
    return;
  }
  isloading = true;
  loader.classList.remove("hide");
  let fetchCount = initialLoad ? 5 : 10;
  try {
    let response = await fetch(getUnsplashUrl(fetchCount, query));
    console.log(response);
    
    if (!response.ok) throw new Error(response.status);
    let data = await response.json();
    let newPhotos = query ? data.results : data;

    displyPhotos(newPhotos);
  } catch (error) {
    console.log(error);
    isloading = false;
  } finally {
    // isloading = false;
  }
}

getPhotos();

function imageLoaded() {
  imagesLoaded++;
  console.log(totalImages);
  if (imagesLoaded === totalImages) {
    isloading = false;
    console.log(totalImages);
    loader.classList.add("hide");
    initialLoad = false;
    // count = 30;
  }
}

function displyPhotos(photos) {
  imagesLoaded = 0;
  totalImages = photos.length;

  photos.forEach((element) => {
    let imgSrc = element.urls.small;
    let imgHref = element.links.html;
    let imagelink = document.createElement("a");
    imagelink.setAttribute("href", imgHref);
    let img = document.createElement("img");
    img.setAttribute("src", imgSrc);
    img.setAttribute("alt", element.alt_description);

    img.addEventListener("load", imageLoaded);
    img.addEventListener("error", imageLoaded);
    imagelink.append(img);
    document.getElementById("image-section").append(imagelink);
  });
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    // console.log(isloading);
    getPhotos();
  }
});
