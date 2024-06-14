document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', () => {
      alert('Item added to cart!');
    });
  });
  
  // Example of functionality for toggling favorite items
  document.querySelectorAll('.fa-heart').forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
    });
  });