
    let allReviews = [];
    let myReviews = [];
    let allProducts = [];

    let editingReviewID = null;
    let currentEditItemID = null;
    let currentEditItemName = null;

async function loadProducts() {
    try {
        const res = await fetch('https://localhost:7208/api/Products');
        allProducts = await res.json();

        const dropdown = document.getElementById("itemName");
        dropdown.innerHTML = "";
        allProducts.forEach(p => {
            const option = document.createElement("option");
            option.value = p.itemId;
            option.textContent = p.name;
            dropdown.appendChild(option);
        });
    } catch (err) {
        alert("Failed to load products: " + err.message);
    }
}

    function renderStars(rating) {
        const fullStar = '<span style="color: gold;">&#9733;</span>';
    const emptyStar = '<span style="color: lightgray;">&#9733;</span>';
    return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
    }

function createReviewCard(review, includeActions = false) {
    const card = document.createElement('div');
    card.className = 'container--product';

    let actionButtons = '';
    if (includeActions) {
        const safeReview = encodeURIComponent(JSON.stringify(review));
        actionButtons = `
    <div style="margin-top: 10px;">
        <button class="btn edit-btn" data-review="${safeReview}">Edit</button>
        <button class="btn delete-btn" data-reviewid="${review.reviewID}" style="background-color: crimson;">Delete</button>
    </div>
    `;
    }

    card.innerHTML = `
    <h2>${review.itemName}</h2>
    <div><strong>Rating:</strong> ${renderStars(review.rating)}</div>
    <p><strong>Review:</strong> ${review.reviewBody}</p>
    <p><strong>Date:</strong> ${new Date(review.dateTime).toLocaleString()}</p>
    ${actionButtons}
    `;
    return card;
}

function renderReviews() {
    const grid = document.getElementById("reviewGrid");
    grid.innerHTML = '';

    myReviews.forEach(review => {
        const card = createReviewCard(review, true);
        grid.appendChild(card);
    });

    const filteredReviews = allReviews.filter(r =>
        !myReviews.some(mr => mr.reviewID === r.reviewID)
    );

    filteredReviews.forEach(review => {
        const card = createReviewCard(review, false);
        grid.appendChild(card);
    });
}

async function loadReviews() {
    try {
        const [allRes, myRes] = await Promise.all([
            fetch('https://localhost:7208/api/Reviews'),
            fetch('https://localhost:7208/api/Reviews/myReviews', {
                credentials: 'include'
            })
        ]);

        allReviews = await allRes.json();
        myReviews = await myRes.json();

        renderReviews();
    } catch (err) {
        document.getElementById("reviewGrid").innerHTML =
            `<p style="color: red;">Failed to load reviews: ${err}</p>`;
    }
}

async function deleteReview(reviewID) {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
        const res = await fetch(`https://localhost:7208/api/Reviews/${reviewID}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!res.ok) throw new Error("Delete failed");

        await loadReviews();
    } catch (err) {
        alert("Error deleting review: " + err.message);
    }
}

function editReview(review) {
    editingReviewID = review.reviewID;
    currentEditItemID = review.itemID;
    currentEditItemName = review.itemName;

    document.getElementById("itemName").value = review.itemID;
    document.getElementById("reviewBody").value = review.reviewBody;
    document.getElementById("rating").value = review.rating;

    document.getElementById("reviewBody").focus();
}

document.getElementById("reviewForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const selectedItemID = parseInt(document.getElementById("itemName").value);
    const selectedItemName = document.getElementById("itemName").selectedOptions[0].textContent;
    const reviewBody = document.getElementById("reviewBody").value.trim();
    const rating = parseInt(document.getElementById("rating").value);

    const reviewData = {
        itemID: editingReviewID ? currentEditItemID : selectedItemID,
        itemName: editingReviewID ? currentEditItemName : selectedItemName,
        reviewBody,
        rating
    };

    const updateReviewData = {
        reviewID: editingReviewID,
        itemID: editingReviewID ? currentEditItemID : selectedItemID,
        itemName: editingReviewID ? currentEditItemName : selectedItemName,
        reviewBody,
        rating
    };

    try {
        if (editingReviewID !== null) {
            const res = await fetch(`https://localhost:7208/api/Reviews`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updateReviewData)
            });
            if (!res.ok) throw new Error("Update failed");
        } else {
            const res = await fetch("https://localhost:7208/api/Reviews", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(reviewData)
            });
            if (!res.ok) throw new Error("Submission failed");
        }

        editingReviewID = null;
        currentEditItemID = null;
        currentEditItemName = null;
        document.getElementById("reviewForm").reset();

        await loadReviews();
    } catch (err) {
        alert("Error saving review: " + err.message);
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        const data = decodeURIComponent(e.target.getAttribute("data-review"));
        const review = JSON.parse(data);
        editReview(review);
    }

    if (e.target.classList.contains("delete-btn")) {
        const reviewID = e.target.getAttribute("data-reviewid");
        deleteReview(reviewID);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    await loadProducts();
    await loadReviews();
});