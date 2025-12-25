let isloading = false;
scrolled = false;
let apiKey = "dne8AmdjtNxxLeAo5jktCHHV5ptptRqProDlRPqtpkk";
let count = 10;
async function getPhotos() {
  if (isloading) {
    return;
  }
  isloading = true;
  document.querySelector(".loader").classList.remove("hide");
  try {
    let response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
    );
    if (!response.ok) throw new Error(response.status);
    let newPhotos = await response.json();
    displyPhotos(newPhotos);
  } catch (error) {
    console.log(error);
  } finally {
    isloading = false;
    document.querySelector(".loader").classList.add("hide");
  }
}

function displyPhotos(photosArray) {
  console.log(photosArray);
  photosArray.forEach((elmn) => {
    let imageLInk = elmn.urls.small;
    let imageUrl = elmn.links.html;
    let element = document.createElement("a");
    element.setAttribute("href", imageUrl);
    let img = document.createElement("img");
    img.setAttribute("src", imageLInk);
    img.setAttribute("alt", elmn.alt_description);
    element.append(img);
    document.getElementById("image-section").append(element);
  });
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    console.log("scroled");

    getPhotos();
  } else {
  }
});

window.addEventListener("load", () => {
  getPhotos();
});
