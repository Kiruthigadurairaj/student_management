
const students = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    gender: "Male",
    class: 10,
    marks: 85,
    passing: true,
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/30",
  }
  // Add more student objects as needed
];

// Select the table body
const tableBody = document.querySelector("tbody");

// Function to display students in the table
function displayStudents(data) {
  tableBody.innerHTML = "";
  data.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>
        <img src="${student.image}" alt="${student.first_name}" class="student-image">
        ${student.first_name} ${student.last_name}
      </td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? "Passing" : "Failed"}</td>
      <td>${student.email}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Initial display of all students
displayStudents(students);

// Search functionality
const searchBar = document.querySelector(".search-bar input[type='text']");
const searchButton = document.querySelector(".search-bar input[type='submit']");

searchButton.addEventListener("click", () => {
  const query = searchBar.value.toLowerCase();
  const filtered = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
  );
  displayStudents(filtered);
});

// Sorting functionality
document.querySelectorAll(".sort-buttons button").forEach((button, index) => {
  button.addEventListener("click", () => {
    let sorted;
    switch (index) {
      case 0: // Sort A→Z
        sorted = [...students].sort((a, b) =>
          (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name)
        );
        break;
      case 1: // Sort Z→A
        sorted = [...students].sort((a, b) =>
          (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name)
        );
        break;
      case 2: // Sort By Marks
        sorted = [...students].sort((a, b) => b.marks - a.marks);
        break;
      case 3: // Sort By Passing
        sorted = students.filter((student) => student.passing);
        break;
      case 4: // Sort By Class
        sorted = [...students].sort((a, b) => a.class - b.class);
        break;
      case 5: // Sort By Gender
        const male = students.filter((student) => student.gender === "Male");
        const female = students.filter((student) => student.gender === "Female");
        sorted = [...female, ...male];
        break;
      default:
        sorted = students;
    }
    displayStudents(sorted);
  });
});
