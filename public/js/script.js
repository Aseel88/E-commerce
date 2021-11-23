// Search

function search(){
    let query = $('#search').val()
    axios.post('/api/products/search', {query})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  // The basket
  $( document ).ready(function() {
    let cart = localStorage.getItem('cart')
    let cart_items = JSON.parse(cart)
    $('#count').text(cart_items.length)
  });