function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const innerMode = document.getElementById("card-inner-head-mode");
  const cardInfoId = document.getElementById("card-info-id");
  const bio = document.getElementById("bio");
  const svgs = document.querySelectorAll(".card-info-imp svg");
  const mode = document.getElementById("btn-mode"); 
  const locMode = document.querySelectorAll(".card-info-imp p");

  if(document.body.classList.contains("dark-mode")){
    mode.innerText = "Light Mode";
    innerMode.style.color = "white";
    cardInfoId.style.backgroundColor = "#606060";
    cardInfoId.style.color = "white";
    bio.style.color = "white";
    locMode.forEach((p) =>{
      p.style.color = "white"
    })
    svgs.forEach((svg) => {
      svg.style.fill = "white";
    });
  } else{
    mode.innerText = "Dark Mode";
    innerMode.style.color = "rgb(107,123,142)";
    cardInfoId.style.backgroundColor = "rgb(237, 243, 255)";
    cardInfoId.style.color = "rgb(107,123,142)";
    bio.style.color = "rgb(107,123,142)";
    locMode.forEach((p) =>{
      p.style.color = "rgb(73,104,154)";
    })
    svgs.forEach((svg) => {
      svg.style.fill = "rgb(73,104,154)";
    });
  }
}

function handleEnterKey(event){
  if (event.key === 'Enter'){
    fetchProfile();
  }
}

async function fetchProfile() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  const profileContainer = document.getElementById("profile-container");
  profileContainer.innerHTML = "";

  //some fun
  const ar = ["nishitk7417", "phodal", "singhsanket143","Lubrsi"];
  let id = Math.floor(Math.random() * ar.length);  
  document.getElementById("example").textContent = ar[id];
  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }

  try {
    // Fetch user profile
    usernameInput.value = "";
    const profileResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    if (!profileResponse.ok) {
      throw new Error("User not found");
    }
    const profile = await profileResponse.json();
    console.log(profile)
    // Display profile information
    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";

    const isoDate = profile.created_at;
    function formatDate(isoDate) {
      const date = new Date(isoDate); 
      const day = date.getDate(); 
      const month = date.toLocaleString('default', { month: 'short' }); 
      const year = date.getFullYear(); 
      return `${day} ${month.toUpperCase()} ${year}`;
    }

    profileCard.innerHTML = `
        <div class="card-inner"><div><img src="${profile.avatar_url}" alt="${profile.login}"></div>
        <div class="card-inner-head" id="card-inner-head-mode"><h2>${profile.name}</h2>
        <a href =${profile.html_url} target="_blank" class="profile-login-color">@${profile.login}</a>
        <p>Joined ${formatDate(isoDate)}</p></div></div>
        <p id="bio">${profile.bio || "No bio available"}</p>
        <div class="card-info" id="card-info-id"><div><p>Repos</p>${profile.public_repos}</div><div><p>Followers</p>${profile.followers}</div><div><p>Following</p>${profile.following}</div></div>
        <div class="card-info-imp-con">
        <div class="card-info-imp"><svg xmlns="http://www.w3.org/2000/svg" width="15px" fill="rgb(73,104,154)" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
        <p>${profile.location || "Not Available"}</p></div>
        <div class="card-info-imp"><svg xmlns="http://www.w3.org/2000/svg" width="15px" fill="rgb(73,104,154)" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
        <p>${profile.email || "Not Available"}</p></div>
        <div class="card-info-imp"><svg xmlns="http://www.w3.org/2000/svg" width="15px" fill="rgb(73,104,154)" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg>
        <p>${profile.twitter_username || "Not Available"}</p></div>
        <div class="card-info-imp"><svg xmlns="http://www.w3.org/2000/svg" width="15px" fill="rgb(73,104,154)" viewBox="0 0 384 512"><path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"/></svg>
        <p>${profile.company || "Not Available"}</p></div>
        </div>
      
        `;//I know this counts as bad coding, will fix it soon.
    profileContainer.appendChild(profileCard);

  } catch (error) {
    profileContainer.innerHTML = `<p class="error">${error.message}</p>`;
  }
}
