let semesterAmount = 0;
let totalAverage = 0;

export function addSemester() {
  const representSemester = {
    notes: [],
    moyenne: 0,
  };

  semesterAmount++;

  const newSemester = document.querySelector("#template_semester").content.cloneNode(true);
  const tontruc = document.querySelector("#tontruc");
  tontruc.appendChild(newSemester);

  const semester = tontruc.lastElementChild;
  const moyenneSpan = semester.querySelector("#Moyenne");
  const moyenneTotalSpan = document.querySelector("#MoyenneTotal");

  semester.querySelector("dt").innerText = "Semestre " + semesterAmount;

  moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + "0";

  const newNote = semester.querySelector("button");
  const inputElement = semester.querySelector("input");
  const gradeList = semester.querySelector("dd").querySelector("div");

  newNote.addEventListener("click", () => {
    const inputValue = parseFloat(inputElement.value);

    if (!isNaN(inputValue)) {
      representSemester.notes.push(inputValue);

      let iconTemplate = "";
      if (inputValue < 4) {
        iconTemplate = document.querySelector("#red-dot-svg").innerHTML;
      } else if (inputValue < 5) {
        iconTemplate = document.querySelector("#orange-dot-svg").innerHTML;
      } else {
        iconTemplate = document.querySelector("#green-dot-svg").innerHTML;
      }

      const newSpan = document.createElement("span");
      newSpan.className =
        "inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200";
      newSpan.innerHTML = iconTemplate + inputValue;

      newSpan.classList.add("grade-span");

      gradeList.appendChild(newSpan);

      updateAverage(representSemester);

      inputElement.value = "";
      inputElement.focus();
    }
  });

  function updateAverage(semestre) {
    if (semestre.notes.length === 1) {
      semestre.moyenne = semestre.notes[0];
    } else {
      let total = 0;

      semestre.notes.forEach((note) => {
        total += note;
      });

      const average = total / semestre.notes.length;

      const roundedAverage = Math.round(average * 2) / 2;
      semestre.moyenne = roundedAverage;
    }

    totalAverage = (totalAverage * (semesterAmount - 1) + semestre.moyenne) / semesterAmount;

   

    moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + semestre.moyenne;
    moyenneSpan.querySelector("circle").style.fill = getColorForValue(semestre.moyenne);

    moyenneTotalSpan.innerHTML =
      document.querySelector("#green-dot-svg").innerHTML + totalAverage.toFixed(1);
  }

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
