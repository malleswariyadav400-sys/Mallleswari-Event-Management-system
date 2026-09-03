
/* =========================================================
   MALLESWARI EVENT MANAGEMENT SYSTEM
   Main JavaScript File
   File: js/script.js
   ========================================================= */


/* =========================================================
   EVENT DATA
   ========================================================= */

const events = [
    {
        id: 1,
        title: "Technology Conference 2026",
        category: "Technology",
        image: "images/event1.jpg",
        description:
            "Explore modern technologies, innovations and exciting ideas.",
        date: "20 August 2026",
        time: "10:00 AM - 4:00 PM",
        location: "College Auditorium",
        seats: 100,
        fee: "₹200"
    },

    {
        id: 2,
        title: "Cultural Festival",
        category: "Cultural",
        image: "images/event2.jpg",
        description:
            "Enjoy music, dance, traditional performances and cultural activities.",
        date: "25 August 2026",
        time: "10:00 AM - 6:00 PM",
        location: "Open Auditorium",
        seats: 200,
        fee: "₹100"
    },

    {
        id: 3,
        title: "Annual Sports Meet",
        category: "Sports",
        image: "images/event3.jpg",
        description:
            "Participate in exciting sports competitions and activities.",
        date: "30 August 2026",
        time: "9:00 AM - 5:00 PM",
        location: "College Sports Ground",
        seats: 150,
        fee: "₹150"
    },

    {
        id: 4,
        title: "Career Guidance Seminar",
        category: "Education",
        image: "images/event4.jpg",
        description:
            "Get useful guidance about careers, higher education and opportunities.",
        date: "5 September 2026",
        time: "10:00 AM - 2:00 PM",
        location: "Seminar Hall",
        seats: 120,
        fee: "Free"
    },

    {
        id: 5,
        title: "Web Development Workshop",
        category: "Workshop",
        image: "images/event5.jpg",
        description:
            "Learn the basics of HTML, CSS and JavaScript through practical activities.",
        date: "10 September 2026",
        time: "10:00 AM - 4:00 PM",
        location: "Computer Lab",
        seats: 60,
        fee: "₹250"
    },

    {
        id: 6,
        title: "Artificial Intelligence Workshop",
        category: "Technology",
        image: "images/event6.jpg",
        description:
            "Learn about AI concepts, applications and emerging technologies.",
        date: "15 September 2026",
        time: "10:00 AM - 4:00 PM",
        location: "Computer Science Lab",
        seats: 80,
        fee: "₹300"
    }
];


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeEventSearch();

    loadEventDetails();

    initializeRegistration();

    displayMyEvents();

    initializeContactForm();

    updateEventSummary();

});


/* =========================================================
   EVENT SEARCH AND CATEGORY FILTER
   ========================================================= */

function initializeEventSearch() {

    const searchInput = document.getElementById("searchEvent");
    const categoryFilter = document.getElementById("categoryFilter");

    if (!searchInput && !categoryFilter) {
        return;
    }

    function filterEvents() {

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const selectedCategory = categoryFilter
            ? categoryFilter.value
            : "all";

        const eventCards =
            document.querySelectorAll(".event-card");

        eventCards.forEach(function (card) {

            const title =
                card.querySelector("h3")
                    ?.textContent
                    .toLowerCase() || "";

            const category =
                card.dataset.category || "";

            const matchesSearch =
                title.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterEvents);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterEvents);
    }
}


/* =========================================================
   SAVE SELECTED EVENT
   ========================================================= */

function viewEvent(eventId) {

    localStorage.setItem(
        "selectedEventId",
        eventId
    );
}


/* =========================================================
   LOAD EVENT DETAILS
   ========================================================= */

function loadEventDetails() {

    const titleElement =
        document.getElementById("eventTitle");

    if (!titleElement) {
        return;
    }

    const eventId =
        Number(localStorage.getItem("selectedEventId")) || 1;

    const event =
        events.find(function (item) {
            return item.id === eventId;
        });

    if (!event) {
        return;
    }

    const imageElement =
        document.getElementById("eventImage");

    const descriptionElement =
        document.getElementById("eventDescription");

    const dateElement =
        document.getElementById("eventDate");

    const timeElement =
        document.getElementById("eventTime");

    const locationElement =
        document.getElementById("eventLocation");

    const seatsElement =
        document.getElementById("eventSeats");

    const feeElement =
        document.getElementById("eventFee");


    titleElement.textContent = event.title;

    if (imageElement) {
        imageElement.src = event.image;
        imageElement.alt = event.title;
    }

    if (descriptionElement) {
        descriptionElement.textContent =
            event.description;
    }

    if (dateElement) {
        dateElement.textContent = event.date;
    }

    if (timeElement) {
        timeElement.textContent = event.time;
    }

    if (locationElement) {
        locationElement.textContent =
            event.location;
    }

    if (seatsElement) {
        seatsElement.textContent =
            event.seats;
    }

    if (feeElement) {
        feeElement.textContent =
            event.fee;
    }
}


/* =========================================================
   REGISTRATION
   ========================================================= */

function initializeRegistration() {

    const registrationForm =
        document.getElementById("registrationForm");

    if (!registrationForm) {
        return;
    }

    const eventSelect =
        document.getElementById("event");

    const selectedEventId =
        Number(localStorage.getItem("selectedEventId"));

    if (eventSelect && selectedEventId) {

        const selectedEvent =
            events.find(function (event) {
                return event.id === selectedEventId;
            });

        if (selectedEvent) {

            for (let i = 0;
                i < eventSelect.options.length;
                i++) {

                if (
                    eventSelect.options[i].value ===
                    selectedEvent.title
                ) {
                    eventSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }


    registrationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const eventName =
                document.getElementById("event").value;

            const participants =
                document.getElementById("participants").value;

            const organization =
                document.getElementById("organization").value.trim();

            const message =
                document.getElementById("message").value.trim();


            if (
                !fullName ||
                !email ||
                !phone ||
                !eventName
            ) {

                showRegistrationMessage(
                    "Please fill in all required fields.",
                    "error"
                );

                return;
            }


            const registration = {

                id: Date.now(),

                fullName: fullName,

                email: email,

                phone: phone,

                event: eventName,

                participants: Number(participants) || 1,

                organization: organization,

                message: message,

                registrationDate:
                    new Date().toLocaleDateString()

            };


            let registrations =
                JSON.parse(
                    localStorage.getItem("registrations")
                ) || [];


            registrations.push(registration);


            localStorage.setItem(
                "registrations",
                JSON.stringify(registrations)
            );


            showRegistrationMessage(
                "Registration successful! Your event has been added to My Events.",
                "success"
            );


            registrationForm.reset();


            setTimeout(function () {

                window.location.href =
                    "my-events.html";

            }, 1500);

        }
    );
}


/* =========================================================
   REGISTRATION MESSAGE
   ========================================================= */

function showRegistrationMessage(message, type) {

    const messageElement =
        document.getElementById(
            "registrationMessage"
        );

    if (!messageElement) {
        return;
    }

    messageElement.textContent = message;

    if (type === "success") {

        messageElement.style.color = "green";

    } else {

        messageElement.style.color = "red";
    }
}


/* =========================================================
   DISPLAY MY EVENTS
   ========================================================= */

function displayMyEvents() {

    const container =
        document.getElementById(
            "myEventsContainer"
        );

    if (!container) {
        return;
    }


    const registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    const noEventsMessage =
        document.getElementById(
            "noEventsMessage"
        );


    if (registrations.length === 0) {

        if (noEventsMessage) {
            noEventsMessage.style.display =
                "block";
        }

        return;
    }


    if (noEventsMessage) {
        noEventsMessage.style.display =
            "none";
    }


    registrations.forEach(function (registration) {

        const event =
            events.find(function (item) {

                return item.title ===
                    registration.event;

            });


        if (!event) {
            return;
        }


        const eventElement =
            document.createElement("div");

        eventElement.className =
            "registered-event";


        eventElement.innerHTML = `

            <img
                src="${event.image}"
                alt="${event.title}"
            >

            <div>

                <h3>${event.title}</h3>

                <p>
                    <strong>📅 Date:</strong>
                    ${event.date}
                </p>

                <p>
                    <strong>⏰ Time:</strong>
                    ${event.time}
                </p>

                <p>
                    <strong>📍 Location:</strong>
                    ${event.location}
                </p>

                <p>
                    <strong>👤 Name:</strong>
                    ${registration.fullName}
                </p>

                <p>
                    <strong>👥 Participants:</strong>
                    ${registration.participants}
                </p>

            </div>

            <div>

                <button
                    class="btn"
                    onclick="removeRegistration(${registration.id})"
                >
                    Remove
                </button>

            </div>
        `;


        container.appendChild(
            eventElement
        );

    });

}


/* =========================================================
   REMOVE REGISTRATION
   ========================================================= */

function removeRegistration(registrationId) {

    let registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    registrations =
        registrations.filter(function (registration) {

            return registration.id !==
                registrationId;

        });


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    window.location.reload();
}


/* =========================================================
   EVENT SUMMARY
   ========================================================= */

function updateEventSummary() {

    const totalElement =
        document.getElementById(
            "totalEvents"
        );

    const upcomingElement =
        document.getElementById(
            "upcomingEvents"
        );


    if (!totalElement && !upcomingElement) {
        return;
    }


    const registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    if (totalElement) {
        totalElement.textContent =
            registrations.length;
    }


    if (upcomingElement) {

        const upcomingCount =
            registrations.filter(function (registration) {

                return events.some(function (event) {

                    return event.title ===
                        registration.event;

                });

            }).length;


        upcomingElement.textContent =
            upcomingCount;
    }
}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function initializeContactForm() {

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const subject =
                document.getElementById(
                    "subject"
                ).value.trim();

            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            const contactMessage =
                document.getElementById(
                    "contactMessage"
                );


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                if (contactMessage) {

                    contactMessage.textContent =
                        "Please fill in all required fields.";

                    contactMessage.style.color =
                        "red";
                }

                return;
            }


            /*
               Since this project does not use a backend,
               the message is stored temporarily in
               localStorage.
            */

            const contactData = {

                id: Date.now(),

                name: name,

                email: email,

                subject: subject,

                message: message,

                date:
                    new Date().toLocaleString()

            };


            let messages =
                JSON.parse(
                    localStorage.getItem(
                        "contactMessages"
                    )
                ) || [];


            messages.push(contactData);


            localStorage.setItem(
                "contactMessages",
                JSON.stringify(messages)
            );


            if (contactMessage) {

                contactMessage.textContent =
                    "Thank you! Your message has been submitted successfully.";

                contactMessage.style.color =
                    "green";
            }


            contactForm.reset();

        }
    );
}


/* =========================================================
   CLEAR ALL REGISTRATIONS
   Optional function
   ========================================================= */

function clearAllRegistrations() {

    localStorage.removeItem(
        "registrations"
    );

    window.location.reload();
}


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "Malleswari Event Management System loaded successfully."
);
```
