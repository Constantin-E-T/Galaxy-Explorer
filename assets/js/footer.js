// Object to store team member information
var teamMembers = [
    { name: "Constantin E. Tivlica", github: "https://github.com/Constantin-E-T" },
    { name: "Kasia Drzewiecka", github: "https://github.com/Drzazga88" },
    { name: "Eleftheria Ntispyraki", github: "https://github.com/EleNtis" },
    { name: "Floella Otudeko", github: "https://github.com/ellaflo" }
  ];
  
 
  // Function to generate the team member links
  function generateTeamLinks() {
    var links = [];
    for (var i = 0; i < teamMembers.length; i++) {
      links.push("<a href='" + teamMembers[i].github + "'>" + teamMembers[i].name + "</a>");
    }
    return links.join(", ");
  }
  
  // Get the current year using Moment.js
  var currentYear = moment().format("YYYY");
  
  // Set the current year in the footer
  document.getElementById("currentYear").innerHTML = currentYear;
  
  // Set the team names in the footer
  document.getElementById("teamNames").innerHTML = generateTeamLinks();
  