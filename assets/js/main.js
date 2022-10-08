/*=============== FAQ answer reveal and hide ===============*/
let question = document.querySelectorAll(".question");
let more = document.querySelector(".more");

question.forEach((question) => {
  question.addEventListener("click", (event) => {
    const active = document.querySelector(".question.active");
    if (active && active !== question) {
      active.classList.toggle("active");
      active.nextElementSibling.style.maxHeight = 0;
    }
    question.classList.toggle("active");
    const answer = question.nextElementSibling;
    if (question.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = 0;
    }
  });
});

/*=============== login MODAL ===============*/
// Get the modal
const loginModal = document.querySelector(".login__modal"),
  loginButton = document.querySelector(".login__button"),
  modalClose = document.querySelector(".login__modal-close");

loginButton.addEventListener("click", () => {
  loginModal.classList.add("active-modal");
});

modalClose.addEventListener("click", () => {
  loginModal.classList.remove("active-modal");
});

/*=============== expand collapse FAQs Section ===============*/
const hiddenQs = document.getElementById("hiddenQs"),
  menuButton = document.querySelector(".faq__expand"),
  moreButton = document.querySelector(".more"),
  lessButton = document.querySelector(".less");

menuButton.addEventListener("click", () => {
  hiddenQs.classList.toggle("hide");
  moreButton.classList.toggle("hide");
  lessButton.classList.toggle("hide");
});

/*=============== LOGIN for VALOSTUFFFFFFFFFFFFSSSSSSSS ===============*/

//funtion to get weapon data while sending username and password
async function getWeapons(url, data) {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  let loginData = await response;
  return loginData;
}

//function to get username and password from login form
// let form = document.getElementById("login");
// let username, password, region;

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   document.querySelector(".preloader").style.display = "flex";

//   username = document.getElementById("riotid").value;
//   password = document.getElementById("pswrd").value;
//   region = document.getElementById("region").value;

//   let url = "https://api.checkvalorant.com/login/login";
//   let data = {
//     RitoID: username,
//     RitoPass: password,
//     Region: region,
//   };

//   getWeapons(url, data)
//     .then((wep) => {
//       console.log(wep); //comment this line later
//       loginResponse(wep);
//     })
//     .catch((err) => {
//       console.log(err);
//       alert("Something Went Wrong 😥 , Plz Try Again 🤓");
//       document.querySelector(".preloader").style.display = "none";
//       loginModal.classList.remove("active-modal");
//     });
// });

if (localStorage.getItem("storedUsername") === null) {
  // console.log("no username");
  loginModal.classList.add("active-modal");

  let form = document.getElementById("login");
  let username, password, region;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelector(".preloader").style.display = "flex";

    username = document.getElementById("riotid").value;
    password = document.getElementById("pswrd").value;
    region = document.getElementById("region").value;

    let url = "https://api.checkvalorant.com/login/login";
    let data = {
      RitoID: username,
      RitoPass: password,
      Region: region,
    };

    getWeapons(url, data)
      .then((wep) => {
        console.log(wep);
        if (wep.status === 200) {
          //set items in localstorage
          localStorage.setItem("storedUsername", username);
          localStorage.setItem("storedPassword", password);
          localStorage.setItem("storedRegion", region);

          //goto services section
          document
            .getElementById("services")
            .scrollIntoView({ behavior: "smooth" });

          //display username in login section
          document.getElementById("loginUser").innerText =
            localStorage.getItem("storedUsername");

          //hide preloader
          document.querySelector(".preloader").style.display = "none";
          //hide login modal
          loginModal.classList.remove("active-modal");
        } else if (wep.status === 429) {
          alert("Rate Limit Exceeded, Plz Contact Us🙃");
          form.reset();
          document.querySelector(".preloader").style.display = "none";
          loginModal.classList.remove("active-modal");
        } else if (wep.status === 501) {
          alert(
            "You might have activated MFA on your Riot Account. We haven't added suppport for it yet due to limited funds😔. Consider Donating🙂"
          );
          form.reset();
          document.querySelector(".preloader").style.display = "none";
          loginModal.classList.remove("active-modal");
        } else if (wep.status === 401) {
          alert("Wrong Credentials 🥺 , Plz Try Again 🤓");
          form.reset();
          document.querySelector(".preloader").style.display = "none";
          loginModal.classList.remove("active-modal");
        } else {
          alert("its not u, it's ME🥺. Don't give up on ME Just Yet.💖");
          form.reset();
          document.querySelector(".preloader").style.display = "none";
          loginModal.classList.remove("active-modal");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something Went Wrong 😥 , Plz Try Again 🤓");
        document.querySelector(".preloader").style.display = "none";
        loginModal.classList.remove("active-modal");
      });

    // let dateNow = parseFloat(Math.floor(new Date().getTime() / 1000));
    // let expiresAt = localStorage.getItem("expiresAt");
    // let isExpired = dateNow > expiresAt;

    // if (username === localStorage.getItem("username") && !isExpired) {
    //   document.getElementById("services").scrollIntoView({ behavior: "smooth" });
    //   document.querySelector(".preloader").style.display = "none";
    //   loginModal.classList.remove("active-modal");
    // } else {
    //   getWeapons(url, data)
    //     .then((wep) => {
    //       // console.log(wep);
    //       loginResponse(wep);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       alert("Something Went Wrong 😥 , Plz Try Again 🤓");
    //       document.querySelector(".preloader").style.display = "none";
    //       loginModal.classList.remove("active-modal");
    //     });
    // }
  });
} else {
  console.log("username is: " + localStorage.getItem("storedUsername"));

  let storedUsername, storedPassword, storedRegion;
  storedUsername = localStorage.getItem("storedUsername");
  storedPassword = localStorage.getItem("storedPassword");
  storedRegion = localStorage.getItem("storedRegion");

  let url = "https://api.checkvalorant.com/login/login";
  let data = {
    RitoID: storedUsername,
    RitoPass: storedPassword,
    Region: storedRegion,
  };
  getWeapons(url, data)
    .then((wep) => {
      // console.log(wep);
      if (wep.status === 200) {
        //goto services section
        document
          .getElementById("services")
          .scrollIntoView({ behavior: "smooth" });

        //display username in login section
        document.getElementById("loginUser").innerText =
          localStorage.getItem("storedUsername");

        //hide preloader
        document.querySelector(".preloader").style.display = "none";
        //hide login modal
        loginModal.classList.remove("active-modal");
      } else if (wep.status === 429) {
        alert("Rate Limit Exceeded, Plz Contact Us🙃");
        form.reset();
        document.querySelector(".preloader").style.display = "none";
        loginModal.classList.remove("active-modal");
      } else if (wep.status === 501) {
        alert(
          "You might have activated MFA on your Riot Account. We haven't added suppport for it yet due to limited funds😔. Consider Donating🙂"
        );
        form.reset();
        document.querySelector(".preloader").style.display = "none";
        loginModal.classList.remove("active-modal");
      } else if (wep.status === 401) {
        alert("Wrong Credentials 🥺 , Plz Try Again 🤓");
        form.reset();
        document.querySelector(".preloader").style.display = "none";
        loginModal.classList.remove("active-modal");
      } else {
        alert("its not u, it's ME🥺. Don't give up on ME Just Yet.💖");
        form.reset();
        document.querySelector(".preloader").style.display = "none";
        loginModal.classList.remove("active-modal");
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
      alert("Something Went Wrong 😥 , Plz LOGOUT & Try Again 🤓");
      document.querySelector(".preloader").style.display = "none";
      loginModal.classList.remove("active-modal");
    });
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
/*=============== CHANGE BACKGROUND HEADER ===============*/
/*=============== CHANGE BACKGROUND HEADER ===============*/
/*=============== CHANGE BACKGROUND HEADER ===============*/
/*=============== CHANGE BACKGROUND HEADER ===============*/

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

/* Link active work */

/*=============== SWIPER TESTIMONIAL ===============*/

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

/*=============== LIGHT DARK THEME ===============*/

/*=============== SCROLL REVEAL ANIMATION ===============*/
