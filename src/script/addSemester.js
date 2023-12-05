export function addSemester() {
  const newSemester = document.querySelector("#template_semester").content.cloneNode(true);
  const tontruc = document.querySelector("#tontruc");
  tontruc.appendChild(newSemester);

  const Semestre = tontruc.lastElementChild;

  Semestre.querySelector("dt").innerText = "Semester " + tontruc.childElementCount;

  const newNote = Semestre.querySelector("button");
  const inputElement = Semestre.querySelector("input");
  const gradeList = Semestre.querySelector("dd").querySelector("div");
  const moyenneSpan = Semestre.querySelector("#Moyenne");


  moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + "0";

  newNote.addEventListener("click", () => {
    const inputValue = parseFloat(inputElement.value);

    if (!isNaN(inputValue)) {
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

      updateAverage();

   
      inputElement.value = "";
    }
  });

  function updateAverage() {
    const gradeSpans = document.querySelectorAll(".grade-span");

    if (gradeSpans.length === 1) {
      moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + gradeSpans[0].innerText;
      moyenneSpan.querySelector("circle").style.fill = getColorForValue(parseFloat(gradeSpans[0].innerText));
      return;
    }
                                                              
    let total = 0;

    gradeSpans.forEach((span) => {
      const value = parseFloat(span.innerText);
      if (!isNaN(value)) {
        total += value;
      }
    });

    const average = total / gradeSpans.length;

    const roundedAverage = Math.round(average * 2) / 2;

   
    moyenneSpan.innerHTML = document.querySelector("#green-dot-svg").innerHTML + roundedAverage;
    moyenneSpan.querySelector("circle").style.fill = getColorForValue(roundedAverage);
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
