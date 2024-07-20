document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviewList');

    // Загрузить отзывы из локального хранилища
    const loadReviews = () => {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewList.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <p><strong>${review.name}</strong> (Оценка: ${review.rating} ★): ${review.message}</p>
                <button class="delete-btn" onclick="deleteReview(this)">Удалить</button>
            `;
            reviewList.appendChild(reviewElement);
        });
    };

    // Сохранить отзывы в локальное хранилище
    const saveReviews = () => {
        const reviews = [];
        reviewList.querySelectorAll('.review').forEach(reviewElement => {
            const reviewText = reviewElement.querySelector('p').innerText;
            const name = reviewText.split(' (')[0];
            const rating = reviewText.split('Оценка: ')[1].split(' ★')[0];
            const message = reviewText.split('): ')[1];
            reviews.push({ name, message, rating });
        });
        localStorage.setItem('reviews', JSON.stringify(reviews));
    };

    // Обработчик удаления отзыва
    window.deleteReview = function(button) {
        const reviewElement = button.parentElement;
        reviewElement.remove();
        saveReviews();
    };

    // Обработчик отправки формы
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;

        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <p><strong>${name}</strong> (Оценка: ${rating} ★): ${message}</p>
            <button class="delete-btn" onclick="deleteReview(this)">Удалить</button>
        `;

        reviewList.appendChild(reviewElement);
        saveReviews();
        reviewForm.reset();
    });

    // Изначально загрузить отзывы
    loadReviews();
});