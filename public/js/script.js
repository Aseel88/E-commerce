// Search

function search(){
    let query = $('#search').val()
    // console.log(query)
    axios.post('/api/products/search', {query})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  $( document ).ready(function() {
    let cart = localStorage.getItem('cart')
    let cart_items = JSON.parse(cart)
    $('#count').text(cart_items.length)
  });

// adding to cart


//   function addToCart(id){
//     let cart = localStorage.getItem('cart')
//     console.log(id)
//     if(cart){
//       let cart_items = JSON.parse(cart)
//       cart_items.push(id)
//       localStorage.setItem('cart', JSON.stringify(cart_items))
//       $('#count').text(cart_items.length)
//     }else{
//       let cart_items = []
//       cart_items.push(id)
//       console.log(cart_items);
//       localStorage.setItem('cart', JSON.stringify(cart_items))
//       $('#count').text(cart_items.length)
//     }
//   }

//   $( document ).ready(function() {
//     let cart = localStorage.getItem('cart')
//     let cart_items = JSON.parse(cart)
//     $('#count').text(cart_items.length)
//   });