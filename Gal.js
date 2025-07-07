const galleryImages = document.querySelectorAll('.image-container img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const relatedDiv = img.nextElementSibling;
        relatedDiv.style.display = relatedDiv.style.display === 'block' ? 'none' : 'block';
    });
});