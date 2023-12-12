// Variables pour stocker le nombre total de semestres et la moyenne globale
let semesterAmount = 0;
let totalAverage = 0;

// Fonction pour ajouter un nouveau semestre
export function addSemester() {
  // Objet qui represent un semestre avec les note et moyenne
  const representSemester = {
    notes: [],
    moyenne: null,
  };

  // Augmente le nombre de semestre
  semesterAmount++;

  // Clone la template d'un nouveau semestre et l'ajoute au dom
  const newSemester = document.querySelector("#template_semester").content.cloneNode(true);
  const tontruc = document.querySelector("#tontruc");
  tontruc.appendChild(newSemester);

  // Recupere les éléments du html 
  const semester = tontruc.lastElementChild;
  const moyenneSpan = semester.querySelector("#Moyenne");
  const moyenneTotalSpan = document.querySelector("#MoyenneTotal");

  // Defini le titre du semestre
  semester.querySelector("dt").innerText = "Semestre " + semesterAmount;

  // Defini le rond de base dans la balise de moyenne du semestre
  moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + "";

  // Ecouteur pour ajouter une nouvelle note
  const newNote = semester.querySelector("button");
  const inputElement = semester.querySelector("input");
  const gradeList = semester.querySelector("dd").querySelector("div");

  newNote.addEventListener("click", () => {
    const inputValue = parseFloat(inputElement.value);

    // Verifi si l'entrer est un nombre valide
    if (!isNaN(inputValue)) {
      // Ajoute la nouvelle note a l'objet du semestre
      representSemester.notes.push(inputValue);

      // Determine le rond en fonction de la note
      let iconTemplate = "";
      if (inputValue < 4) {
        iconTemplate = document.querySelector("#red-dot-svg").innerHTML;
      } else if (inputValue < 5) {
        iconTemplate = document.querySelector("#orange-dot-svg").innerHTML;
      } else {
        iconTemplate = document.querySelector("#green-dot-svg").innerHTML;
      }

      // Crée un nouveau span pour la note et l'ajoute a la liste
      const newSpan = document.createElement("span");
      newSpan.className =
        "inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200";
      newSpan.innerHTML = iconTemplate + inputValue;
      newSpan.classList.add("grade-span");
      gradeList.appendChild(newSpan);

      // Met à jour la moyenne du semestre
      updateAverage(representSemester);

      // Efface l'entrer et met le focus pour la suivante
      inputElement.value = "";
      inputElement.focus();
    }
  });

  // Fonction pour mettre a jour la moyenne du semestre
  function updateAverage(semestre) {
    if (semestre.notes.length === 0) {
      // S'il n'y a pas de notes on défini la moyenne sur la première note 
      semestre.moyenne = semestre.notes[0];
    } else {
      // Calcul la moyenne des note
      let total = 0;
      semestre.notes.forEach((note) => {
        total += note;
      });

      const average = total / semestre.notes.length;

      // Arrondi la moyenne 
      const roundedAverage = Math.round(average * 2) / 2;
      semestre.moyenne = roundedAverage;
    }

    // Met a jour la moyenne globale en fonction de la nouvelle moyenne du semestre
    totalAverage = (totalAverage * (semesterAmount - 1) + semestre.moyenne) / semesterAmount;

    // Met a jour le visuel du site avec les nouvelle moyennes du semestre et globale
    moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + semestre.moyenne;
    moyenneSpan.querySelector("circle").style.fill = getColorForValue(semestre.moyenne);

    moyenneTotalSpan.innerHTML =
      document.querySelector("#green-dot-svg").innerHTML + totalAverage;
  }

  // Fonction pour détermié la couleur en fonction de la valeur
  function getColorForValue(value) {
    if (value < 4) {
      return "red";
    } else if (value < 5) {
      return "orange";
    } else {
      return "green";
    }
  }
}
