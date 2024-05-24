

const loadData = () => {
  const search_item = document.getElementById("search-name").value
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${search_item}`)
  .then(res => res.json())
  .then(data => {
      DisplayData(data)
  })
  .catch(err => {
      console.error(err);
  });
}

const DisplayData = (data) => {
  document.getElementById("user-data-container").innerHTML = ""
  const container = document.getElementById("user-data-container");
  if (data.player) {
      data.player.forEach(user => {
          console.log(user);
          const div = document.createElement("div");
          div.classList.add("user")
          div.className = "col-lg-4 col-sm-12 mb-5"
          div.innerHTML = `
              <div class="card" style="width: 18rem">
                <img src= ${user.strThumb ? user.strThumb : "https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-75560.jpg?size=338&ext=jpg&ga=GA1.1.967060102.1715990400&semt=ais_user"} class="card-img-top" alt="" />
                <div class="card-body">
                  <h5 class="card-title">${user.strPlayer}</h5>
                  <p class="card-text">
                    ${user?.strDescriptionEN?.slice(0, 30) ? user?.strDescriptionEN?.slice(0, 30) : "Not Available"}
                  </p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Nationality: ${user.strNationality}</li>
                  <li class="list-group-item">Team: ${user.strTeam}</li>
                  <li class="list-group-item">Sports: ${user.strSport ? user.strSport : "Not Available"}</li>
                  <li class="list-group-item">Salary: ${user.strWage ? user.strWage : "Not Available"}</li>
                  <li class="list-group-item">Gender: ${user.strGender ? user.strGender : "Custom"}</li>
                  <div class="d-flex">
                    <a class="icons" href="${user.strFacebook}"><i class="fa-brands fa-facebook"></i></a>
                    <a class="icons" href="${user.strInstagram}">
                      <i class="fa-brands fa-square-instagram"></i
                    ></a>
                  </div>
                </ul>
                <div class="card-body">
                  <button onclick="displayPlayerDetails('${user.idPlayer}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                      See Details
                  </button>
                  <button onclick="handleMaketeam('${user.strPlayer}')" href="#" class="card-link card-buttons">Add to Group</button>
                </div>
              </div>
          `;
          container.appendChild(div);
      })
  } else {
      container.innerHTML = "<p>No players found.</p>";
  }
}

const names = []
const handleMaketeam = (name) => {
  const container = document.getElementById("cart-main-container")
  if (names.length >= 11) {
      alert("Player Limit Crossed Capacity")

     
  }
   else {
    const div = document.createElement("div")
    names.push(name)
    document.getElementById("team-length").innerHTML = names.length
    div.innerHTML=`
    <p class="cart-player">${name}</p>
    <hr>
    `;

    container.appendChild(div);
  }


  
  
 
}

const displayPlayerDetails = (id) => {
  const container = document.getElementById('modal-body')
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
  fetch(url)
      .then(res => res.json())
      .then(data => {
          container.innerHTML = '';
          if (data.players) {
              data.players.forEach(user => {
                  const div = document.createElement('div')
                  div.innerHTML = `
                      <div>
                          <div>
                              <img class="w-50 mx-auto rounded m-3" src=${user.strThumb ? user.strThumb : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCkmf7FpDslETRiDBiFKDPLbrxFM-wqisohQ&s"} alt="">
                          </div>
                          <div>
                              <h3>Name: ${user.strPlayer}</h3>
                              <p>Date of birth: ${user.dateBorn}</p>
                              <p>Place of birth: ${user.strBirthLocation}</p>
                              <p>Height: ${user.strHeight}</p>
                              <p>Weight: ${user.strWeight}</p>
                              <p> <a href=${user.strFacebook} ><i class="icons fa-brands fa-facebook"></i></a> <a href=${user.strInstagram}><i class="icons fa-brands fa-square-instagram"></i></a> </p>
                              <p>${user.strDescriptionEN}</p>
                          </div>
                      </div>
                  `;
                  container.appendChild(div);
              });
          } else {
              container.innerHTML = "<p>No details found.</p>";
          }
      })
      .catch(err => console.error(err));
}

