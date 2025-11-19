// --- 1. GLOBAL VARIABLES AND SETUP ---

// Get references to key elements from index.html
const dateTimeElement = document.getElementById('current-date-time');
const taskListElement = document.getElementById('task-list');

// Key name for local storage data
const LOCAL_STORAGE_KEY = 'focusAppTasks'; 


// --- 2. DATE AND TIME FUNCTIONALITY ---

/**
 * Updates the DATE N TIME box with the current local time.
 * In a static site, this replaces the static "DATE N TIME" text.
 */
function updateDateTime() {
    const now = new Date();
    
    // Format the date (e.g., Nov 13, 2025)
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);

    // Format the time (e.g., 10:30 PM)
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

    if (dateTimeElement) {
        dateTimeElement.innerHTML = `${formattedDate} | ${formattedTime}`;
    }
}


// --- 3. TASK LIST FUNCTIONALITY (USING LOCAL STORAGE) ---

/**
 * Loads tasks from the browser's Local Storage and renders them to the dashboard.
 */
function loadTasks() {
    // Attempt to retrieve the stored tasks (defaults to an empty array if nothing is found)
    const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    
    // Clear the existing HTML list before rendering
    taskListElement.innerHTML = ''; 

    // Loop through the tasks and create the list items
    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskListElement.appendChild(li);
    });
}

/**
 * Placeholder function for adding a new task.
 * In the final version, you would integrate this with an input box.
 * @param {string} newTaskText - The text of the new task to be added.
 */
function addTask(newTaskText) {
    if (!newTaskText || newTaskText.trim() === '') return;

    // Load existing tasks
    const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    
    // Add the new task
    tasks.push(newTaskText.trim());
    
    // Save the updated list back to Local Storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    
    // Refresh the list on the dashboard
    loadTasks();
}

/**
 * Placeholder function for demonstrating the initial task data structure.
 * This runs if no tasks are found in Local Storage.
 */
function initializeTasks() {
    const existingTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    if (!existingTasks) {
        const initialTasks = [
            "Outline Chapter 2 (Module 1)",
            "Review Eisenhower Matrix (Module 2)",
            "Practice Pomodoro Timer (Tools)",
            "Check Community Board"
        ];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialTasks));
    }
    loadTasks();
}


// --- 4. INITIALIZATION (RUN WHEN THE PAGE LOADS) ---

// 1. Update the date/time immediately and set an interval to update it every minute
updateDateTime();
setInterval(updateDateTime, 60000); // Updates every 60 seconds (60,000 ms)

// 2. Initialize and load the Task List
initializeTasks();

// 3. (Future Step) Event listener placeholder for a full Task Manager page:
/* document.getElementById('task-input-button').addEventListener('click', () => {
        const inputField = document.getElementById('task-input');
        addTask(inputField.value);
        inputField.value = ''; // Clear input field
    });
*/
// --- 5. SLIDESHOW FUNCTIONALITY ---

let slideIndex = 1; // Start on the first slide
let slideTimer;     // Timer to control auto-rotation

/**
 * Main function to display the slides.
 * @param {number} n - The index of the slide to show.
 */
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    const dotsContainer = document.querySelector(".slide-dots-container");

    // Exit if no slides are found
    if (slides.length === 0 || !dotsContainer) return;
    
    // Wrap around logic (go back to 1 if we exceed the count)
    if (n > slides.length) { slideIndex = 1 }
    // Wrap around logic (go to the last slide if we go below 1)
    if (n < 1) { slideIndex = slides.length }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Clear old dots and create new ones
    dotsContainer.innerHTML = '';
    for (i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        // Attach click handler to navigate to that slide
        dot.onclick = (function(index) {
            return function() {
                currentSlide(index + 1);
            };
        })(i);
        dotsContainer.appendChild(dot);
    }

    // Show the current slide and mark the current dot as active
    slides[slideIndex - 1].style.display = "block";  
    dotsContainer.children[slideIndex - 1].className += " active-dot";

    // Restart the auto-rotate timer whenever a new slide is shown
    clearTimeout(slideTimer);
    slideTimer = setTimeout(autoRotate, 8000); // Change slide every 8 seconds (8000ms)
}

/**
 * Advances the slideshow automatically.
 */
function autoRotate() {
    slideIndex++;
    showSlides(slideIndex);
}

/**
 * Function to handle manual navigation via dots.
 * @param {number} n - The slide number clicked.
 */
function currentSlide(n) {
    showSlides(slideIndex = n);
}


// --- 6. INITIALIZATION (Add Slideshow Start) ---

// In the main execution area (end of your script.js):
// ... after initializeTasks();

// 3. Start the Slideshow
showSlides(slideIndex);