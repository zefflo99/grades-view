
let Semestre = [];

export function addSemester() {

  const representSemester = {
    numero: Semestre.length + 1, 
    notes: [], 
    moyenne: 0, 
  };
  /* console.log(representSemester) */

  
  Semestre.push(representSemester);

  
  const newSemester = document.querySelector("#template_semester").content.cloneNode(true);
  const tontruc = document.querySelector("#tontruc");
  tontruc.appendChild(newSemester);

  const semester = tontruc.lastElementChild;

  semester.querySelector("dt").innerText = "Semestre " + representSemester.numero;


  const newNote = semester.querySelector("button");
  const inputElement = semester.querySelector("input");
  const gradeList = semester.querySelector("dd").querySelector("div");
  const moyenneSpan = semester.querySelector("#Moyenne");

  moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + "0";

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
      newSpan.className = "inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200";
      newSpan.innerHTML = iconTemplate + inputValue;

      newSpan.classList.add("grade-span");

      gradeList.appendChild(newSpan);

      updateAverage(representSemester);

      inputElement.value = "";
    }
  });

  function updateAverage(semestre) {
    
    
    if (semestre.notes.length === 1) {
      semestre.moyenne = semestre.notes[0];
      moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + semestre.moyenne;
      moyenneSpan.querySelector("circle").style.fill = getColorForValue(semestre.moyenne);
      return;
    }

    let total = 0;

    semestre.notes.forEach((note) => {
      total += note;
    });

    const average = total / semestre.notes.length;

    const roundedAverage = Math.round(average * 2) / 2;

    semestre.moyenne = roundedAverage;
    moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + roundedAverage;
    moyenneSpan.querySelector("circle").style.fill = getColorForValue(roundedAverage);
    /*console.log(roundedAverage);*/
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
