// Variables to store the total number of semesters and the overall average
let semesterAmount = 0;
let totalAverage = 0;
let allRepresentSemester = [];

// Function to add a new semester
export function addSemester() {
  // Object representing a semester with grades and average
  const representSemester = {
    notes: [],
    moyenne: null,
  };
  allRepresentSemester.push(representSemester)

  // Increment the semester count
  semesterAmount++;

  // Clone the template for a new semester and append it to the DOM
  const newSemester = document
    .querySelector("#template_semester")
    .content.cloneNode(true);
  const DOM = document.querySelector("#DOM");
  DOM.appendChild(newSemester);

  // Get HTML elements
  const semester = DOM.lastElementChild;
  const moyenneSpan = semester.querySelector("#Moyenne");

  // Set the semester title
  semester.querySelector("dt").innerText = "Semester " + semesterAmount;

  console.log(representSemester);

  // Set the default circle in the semester's average tag
  moyenneSpan.innerHTML =
    document.querySelector("#green-dot-svg").innerHTML + "";

  // Event listener to add a new grade
  const newNote = semester.querySelector("button");
  const inputElement = semester.querySelector("input");
  const gradeList = semester.querySelector("dd").querySelector("div");

  newNote.addEventListener("click", () => {
    const inputValue = parseFloat(inputElement.value);

    // Check if the input is a valid number
    if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 6) {
      // Add the new grade to the semester object
      representSemester.notes.push(inputValue);

      // Determine the circle based on the grade
      let iconTemplate = "";
      if (inputValue < 4) {
        iconTemplate = document.querySelector("#red-dot-svg").innerHTML;
      } else if (inputValue < 5) {
        iconTemplate = document.querySelector("#orange-dot-svg").innerHTML;
      } else {
        iconTemplate = document.querySelector("#green-dot-svg").innerHTML;
      }

      // Create a new span for the grade and add it to the list
      const newSpan = document.createElement("span");
      newSpan.className =
        "inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200";
      newSpan.innerHTML = iconTemplate + inputValue;
      newSpan.classList.add("grade-span");
      gradeList.appendChild(newSpan);

      // Update the semester average
      updateAverage(representSemester);

      // Clear the input and set focus for the next one
      inputElement.value = "";
      inputElement.focus();
    }
  });

  // Function to update the semester average
  function updateAverage(semester1) {
    if (semester1.notes.length === 0) {
      // If there are no grades, set the average to the first grade
      semester1.moyenne = semester1.notes[0];
    } else {
      // Calculate the average of the grades
      let sum = 0;
      semester1.notes.forEach((note) => {
        sum += note;
      });
      const average = sum / semester1.notes.length;

      // Round the average
      const roundedAverage = Math.round(average * 2) / 2;
      semester1.moyenne = roundedAverage;

      console.log("Semester Average:", semester1.moyenne);

      // Update the overall average based on the new semester average
 
      totalAverage = (totalAverage * (semesterAmount - 1) + semester1.moyenne) / allRepresentSemester.filter(semester => semester.moyenne > 0).length;
      // Update the website's visuals with the new semester and overall averages
      moyenneSpan.innerHTML =
        document.querySelector("#green-dot-svg").innerHTML + semester1.moyenne;
      moyenneSpan.querySelector("circle").style.fill = getColorForValue(
        semester1.moyenne,
      );

      allSemesterAverage();
    }
  
  }

  // New function to calculate the total average of all semesters
  function allSemesterAverage() {
      
      console.log(totalAverage);

      const totalRounded = Math.round(totalAverage * 2) / 2;

      console.log(totalRounded);

      // Update the total average display
      const moyenneTotalSpan = document.querySelector("#MoyenneTotal");
      moyenneTotalSpan.innerHTML =
        document.querySelector("#green-dot-svg").innerHTML + totalRounded;

      // Set the color for the total average circle
      const colorForTotalAverage = getColorForValue(totalAverage);
      moyenneTotalSpan.querySelector("circle").style.fill =
        colorForTotalAverage;

      // Update additional visuals with the total average
      const firstDD = document.querySelector(
        ".flex-wrap .text-3xl.font-medium.leading-10.tracking-tight.text-gray-900",
      );
      firstDD.innerHTML =
        document.querySelector("#green-dot-svg").innerHTML + totalRounded;

      const colorForTotalAverage2 = getColorForValue(totalAverage);
      firstDD.querySelector("circle").style.fill = colorForTotalAverage2;
    }

    // Function to determine the color based on the value
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
