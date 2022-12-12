const modal = document.getElementsByClassName("modal");
const contact = document.getElementsByClassName("contact");
const template = document.getElementsByClassName("template");

function showContent(content) {
   if (content == 'modal') {
      modal[0].style.display = "flex";
      contact[0].style.display = "none";
      template[0].style.display = "none";
   }
   else if (content == 'contact') {
      modal[0].style.display = "none";
      contact[0].style.display = "block";
      template[0].style.display = "none";
   }
   else {
      modal[0].style.display = "none";
      contact[0].style.display = "none";
      template[0].style.display = "grid";
   }
}