let applications = [], count = 1;
//======================================================================================
setTimeout(() => {
   applications = JSON.parse(localStorage.getItem("applications")) || [];

   count += applications.length;
   applications.forEach(app => insertApplication(app));
}, 5000);
//======================================================================================
function sendApplication(e) {
   e.preventDefault();

   const name = document.getElementById("name")?.value;
   const job = document.querySelector("input[name='job']:checked")?.value;
   const country = document.getElementById("country")?.value;

   if (name == null || job == undefined || country == undefined) return alert("Please complete the form !");

   const obj = {
      name: name,
      job: job,
      country: country,
      skills: []
   };

   document.querySelectorAll("#skill").forEach(e => {
      if (e.checked) obj.skills.push(e.value);
   });
   applications.push(obj);

   count++;

   insertApplication(obj);
   localStorage.setItem("applications", JSON.stringify(applications));
}
//======================================================================================
function insertApplication(data) {
   const { name, job, country, skills } = data;

   let text = `<div><span>${name}</span> applied for <span>${job}</span></div><br>
      <div>
         Country:
         <span>${country}</span>
      </div><br>
      <div class="skills-show">
         Skills:`;

   if (skills.length == 0) text += `<span class="no-skill-beadge">Without skills</span>`;
   else {
      for (let skill of skills) text += `<span class="skill-beadge">${skill}</span>`;
   }

   text += '</div>';

   const div = document.createElement("div");
   div.innerHTML = text

   document.getElementById("count").innerText = count;
   document.getElementById("applications").appendChild(div);
}