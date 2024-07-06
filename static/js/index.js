const skibidi = "skibididbmsjai";
const nameInput = document.getElementById("name");
const subjectInput = document.getElementById("subject");
const sectionInput = document.querySelector("#section select");
const hoursInput = document.getElementById("hours");
const emailInput = document.getElementById("email");
const multiSubCheckbox = document.getElementById("multi-sub");
const generateButton = document.getElementById("generate-tt");
const subList = document.getElementById("sub-list").querySelector("ul");

let teacherName, subject, section, hours, email, isMultiSub, additionalSubjects;

generateButton.addEventListener("click", function () {
  teacherName = nameInput.value;
  subject = subjectInput.value;
  section = sectionInput.value;
  hours = hoursInput.value;
  email = emailInput.value;
  isMultiSub = multiSubCheckbox.checked;

  if (teacherName === "" || subject === "" || hours === "" || email === "") {
    alert("Please fill in all the required fields.");
    return;
  }

  console.log("Name:", teacherName);
  console.log("Subject:", subject);
  console.log("Section:", section);
  console.log("Hours:", hours);
  console.log("Email:", email);
  console.log("Multiple Subjects:", isMultiSub);

  if (isMultiSub) {
    additionalSubjects = document.querySelector(".additional-subject").value;
    console.log(`Additional Subjects: ${additionalSubjects}`);
  } else {
    additionalSubjects = NULL;
  }

  const data = [
    teacherName,
    subject,
    section,
    hours,
    email,
    isMultiSub,
    additionalSubjects,
  ];

  fetch("/generate-timetable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Message", data["message"]);
      if (data["message"] != "Success") {
        alert("Time Table is Already Full!");
      } else {
        alert(data["message"]);
        console.log(data["timetable"]);
        if (document.querySelector(".final-tt") != null) {
          document.querySelector(".final-tt").remove();
        }
        const finalTimetable = data["timetable"];
        const timetable = document.createElement("table");
        timetable.innerHTML = `
        <tr>
        <th>Day</th>
        <th>Period 1</th>
        <th>Period 2</th>
        <th>Period 3</th>
        <th>Period 4</th>
        <th>Period 5</th>
        <th>Period 6</th>
        <th>Period 7</th>
        </tr>
        <tr>
        <td>Monday</td>
        <td>${finalTimetable["Mon"]["1"]}</td>
        <td>${finalTimetable["Mon"]["2"]}</td>
        <td>${finalTimetable["Mon"]["3"]}</td>
        <td>${finalTimetable["Mon"]["4"]}</td>
        <td>${finalTimetable["Mon"]["5"]}</td>
        <td>${finalTimetable["Mon"]["6"]}</td>
        <td>${finalTimetable["Mon"]["7"]}</td>
        </tr>
        <tr>
        <td>Tuesday</td>
        <td>${finalTimetable["Tue"]["1"]}</td>
        <td>${finalTimetable["Tue"]["2"]}</td>
        <td>${finalTimetable["Tue"]["3"]}</td>
        <td>${finalTimetable["Tue"]["4"]}</td>
        <td>${finalTimetable["Tue"]["5"]}</td>
        <td>${finalTimetable["Tue"]["6"]}</td>
        <td>${finalTimetable["Tue"]["7"]}</td>
        </tr>
        <tr>
        <td>Wednesday</td>
        <td>${finalTimetable["Wed"]["1"]}</td>
        <td>${finalTimetable["Wed"]["2"]}</td>
        <td>${finalTimetable["Wed"]["3"]}</td>
        <td>${finalTimetable["Wed"]["4"]}</td>
        <td>${finalTimetable["Wed"]["5"]}</td>
        <td>${finalTimetable["Wed"]["6"]}</td>
        <td>${finalTimetable["Wed"]["7"]}</td>
        </tr>
        <tr>
        <td>Thursday</td>
        <td>${finalTimetable["Thu"]["1"]}</td>
        <td>${finalTimetable["Thu"]["2"]}</td>
        <td>${finalTimetable["Thu"]["3"]}</td>
        <td>${finalTimetable["Thu"]["4"]}</td>
        <td>${finalTimetable["Thu"]["5"]}</td>
        <td>${finalTimetable["Thu"]["6"]}</td>
        <td>${finalTimetable["Thu"]["7"]}</td>
        </tr>
        <tr>
        <td>Friday</td>
        <td>${finalTimetable["Fri"]["1"]}</td>
        <td>${finalTimetable["Fri"]["2"]}</td>
        <td>${finalTimetable["Fri"]["3"]}</td>
        <td>${finalTimetable["Fri"]["4"]}</td>
        <td>${finalTimetable["Fri"]["5"]}</td>
        <td>${finalTimetable["Fri"]["6"]}</td>
        <td>${finalTimetable["Fri"]["7"]}</td>
        </tr>
        `;
        timetable.classList.add("final-tt");
        document.body.appendChild(timetable);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error Generating TimeTable");
    });
});

multiSubCheckbox.addEventListener("change", function () {
  if (this.checked) {
    const additionalSubjectInput = document.createElement("input");
    additionalSubjectInput.classList.add("additional-subject");
    additionalSubjectInput.type = "text";
    additionalSubjectInput.placeholder =
      "Enter additional subjects, comma separated";
    subList.appendChild(additionalSubjectInput);
  } else {
    const additionalSubjects = document.querySelector(".additional-subject");
    additionalSubjects.remove();
  }
});
