let _ritoUsername_ = localStorage.getItem("storedUsername");

newPageTitle = _ritoUsername_;
document.title = `${newPageTitle}'s Store`;

//funtion to get store data
async function getWeapons(url) {
  var response = await fetch(url);
  var weapons = await response.json();
  return weapons;
}

///?EdgyBypassCode=5807
let url = `https://api.checkvalorant.com/store/store/${_ritoUsername_}`;
// let url = `https://api.checkvalorant.com/store/store/AryanBa3a`

getWeapons(url)
  .then((weapons) => {
    // console.log(weapons);
    let dateNow = parseFloat(Math.floor(new Date().getTime() / 1000));
    let expiresAt = parseFloat(Math.floor(weapons["expires"]));
    let isExpired = dateNow > expiresAt;

    // let nmexpiresAt = parseFloat(Math.floor(weapons["expires"]));
    // console.log(expiresAt)
    // let myDate1 = new Date( expiresAt * 1000);
    // console.log("expires at " + myDate1.toLocaleString()); //to local time

    // console.log(dateNow)
    // let myDate2 = new Date( dateNow * 1000);
    // console.log("time now " +myDate2.toLocaleString());

    // console.log(isExpired)

    if (isExpired) {
      alert("Stored Expired Due to Inactivity.😥 Go back & Login Again! 🙃 ");
      localStorage.clear();
    } else {
      let dateNow = parseFloat(Math.floor(new Date().getTime() / 1000));
      let lastUpdt = parseFloat(Math.floor(weapons["last_updated"]));
      let relative = dateNow - lastUpdt;

      let days = Math.floor(relative / (3600 * 24));
      relative -= days * 3600 * 24;

      let hrs = Math.floor(relative / 3600);
      relative -= hrs * 3600;

      let mnts = Math.floor(relative / 60);
      relative -= mnts * 60;

      document.getElementById("lastUdateTimer").innerText =
        "Last Updated :  ⏱️ " + days + "D : " + hrs + "H : " + mnts + "M Ago.";

      // let myDate = new Date( weapons['last_updated'] * 1000);
      // console.log(myDate.toGMTString());
      // console.log(myDate.toLocaleString()); //to local time

      localStorage.setItem("expiresAt", expiresAt);

      document.getElementById("uname").innerText =
        localStorage.getItem("storedUsername") + "'s Store";

      for (let wp_no = 1; wp_no < 5; wp_no++) {
        document.getElementById(`weapon${wp_no}`).src =
          weapons["weaponskins"][wp_no].image;
        document.getElementById(`name${wp_no}`).innerText =
          weapons["weaponskins"][wp_no].name;
      }

      //   for (let wp_no = 1; wp_no < 7; wp_no++) {
      //     document.getElementById(`nmweapon${wp_no}`).src =
      //       weapons["nightmarket"][wp_no].image;
      //     document.getElementById(`nmname${wp_no}`).innerText =
      //       weapons["nightmarket"][wp_no].name;
      //     document.getElementById(
      //       `nmdiscnt${wp_no}`
      //     ).innerText = `-${weapons["nightmarket"][wp_no].discount}%`;
      //   }

      document.querySelectorAll(".finisher").forEach(function (vidbutton) {
        vidbutton.addEventListener("click", function () {
          let vidUrl = weapons["weaponskins"][parseInt(this.id[3])].video;
          if (vidUrl === null) {
            alert("Video Not Available 😥");
            finisherClose();
            document.querySelector(".finisher_vid").style.display = "none";
          } else {
            document.getElementById("fvid").src = vidUrl;
          }
        });
      });
    }
  })
  .catch((err) => {
    alert("Something Went Wrong 😥, Go Back & Plz Try Again 🤓");
    console.log(err);
    localStorage.clear();
  });

function finisherPlay() {
  document.querySelector(".finisher_vid").style.display = "flex";
}

function finisherClose() {
  let x = document.querySelector(".finisher_vid");
  let finisherVideo = document.getElementById("fvid");
  x.onclick = function (div) {
    if (div.target.id !== "fvid") {
      x.style.display = "none";
      finisherVideo.pause();
    }
  };
}
