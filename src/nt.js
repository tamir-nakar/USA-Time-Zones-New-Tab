const searchBoxInput = document.querySelector('.searchBox');

updateTime();
setInterval(function () {
  updateTime();
}, 1000);

searchBoxInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if(e.target.value){

        chrome.tabs.update({
            url: `http://www.google.com/search?q=${e.target.value}`
       });
      }

    }
  });
function updateTime() {
  setLocalTime();
  setCentralTime();
  setEasternTime();
}
function getLocalTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function getEasternTime() {
  const date = new Date();
  const strTime = date.toLocaleString("en-US", {
    timeZone: "EST",
  });

  const timePart = strTime.split(",")[1];
  const hours = timePart.split(":")[0];
  const minutes = timePart.split(":")[1];
  return `${hours}:${minutes} ${timePart.includes("PM") ? "pm" : "am"}`;
}

function getCentralTime() {
  const date = new Date();
  const strTime = date.toLocaleString("en-US", {
    timeZone: "CST",
  });
  const timePart = strTime.split(",")[1];
  const hours = timePart.split(":")[0];
  const minutes = timePart.split(":")[1];
  return `${hours}:${minutes} ${timePart.includes("PM") ? "pm" : "am"}`;
}

function setLocalTime() {
  const el = document.querySelector("#info_local");
  el.innerHTML = getLocalTime();
}

function setCentralTime() {
  const el = document.querySelector("#info_central");
  el.innerHTML = getCentralTime();
}

function setEasternTime() {
  const el = document.querySelector("#info_eastern");
  el.innerHTML = getEasternTime();
}
