const container = document.querySelector('.container');
const defaultImage = "https://oyepriyansh.pages.dev/i/5nf5fd.png";

const loadProfiles = async () => {
  let data = await fetch('/data.json');
  let profiles = await data.json();

  profiles = shuffleArray(profiles);

  profiles.forEach((profile) => {
    let profileDiv = document.createElement('div');
    profileDiv.classList.add('profile');

    let skills = profile.skills.map(skill => `<span class="skill">${skill}</span>`).join('');

    let social = '';

    if (profile.github) {
      social += `
        <a href="${profile.github}" target="_blank"><i class="fa-brands fa-github"></i></a>
      `;
    }

    if (profile.twitter) {
      social += `
        <a href="${profile.twitter}" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
      `;
    }

    if (profile.linkedin) {
      social += `
        <a href="${profile.linkedin}" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
      `;
    }

    profileDiv.innerHTML = `
      <div class="pfp">
        <img src="${profile.image}" alt="User Image" onerror="this.onerror=null; this.src='${defaultImage}';">
      </div>
      <h3 class="name">${profile.name}</h3>
      <div class="skills">${skills}</div>
      <div class="social">${social}</div>
    `;

    container.append(profileDiv);
  });
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

loadProfiles();


// dark light mode 

const colorSwitch = document.getElementById("input-toggle-button");
colorSwitch.addEventListener("click", checkMode);

const btn = document.querySelector('.add-col');

function checkMode() {
  console.log("checking...");
  if (colorSwitch.checked) {
    console.log("dark on");
    darkModeOn();
    btn.style.color = "black";
    btn.addEventListener('mouseover', () => {
      btn.style.color = "white";
    })
    btn.addEventListener('mouseout', () => {
      btn.style.color = "black";
    })
  } else {
    console.log("dark off");
    darkModeOff();
    btn.style.color = "white";
    btn.addEventListener('mouseout', () => {
      btn.style.color = "white";
    })

    btn.addEventListener('mouseover', () => {
      btn.style.color = "white";
    })
  }
}

function darkModeOn() {
  document.body.classList.add("dark-mode");
}

function darkModeOff() {
  document.body.classList.remove("dark-mode");
}


//search 

searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const profiles = document.querySelectorAll('.profile');

  let visibleProfiles = 0;

  profiles.forEach((profile) => {
    const profileName = profile.querySelector('.name').innerText.trim().toLowerCase();

    if (profileName.includes(searchTerm)) {
      profile.style.display = 'flex'; 
      visibleProfiles++;
    } else {
      profile.style.display = 'none'; 
    }
  });

  const noProfileMessage = document.querySelector('.no-profile');
  if (visibleProfiles > 0) {
    noProfileMessage.style.display = 'none'; 
  } else {
    noProfileMessage.style.display = 'block'; 
  }
});

// scroll top button 

var fabButton = document.getElementById("backToTopBtn");

window.onscroll = function () {
    if (window.scrollY > 20) {
        fabButton.style.display = "block";
    } else {
        fabButton.style.display = "none";
    }
};

fabButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// copyright year 
document.getElementById("currentYear").textContent = new Date().getFullYear();

