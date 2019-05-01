$(document).ready(function () {

    var SavedCompany = [];
    
      $('form').on('submit', function(event){
        event.preventDefault();
          var companyName = $('#company').val();
          $.ajax ({
              method: 'GET',
              url: 'https://autocomplete.clearbit.com/v1/companies/suggest?query='+ companyName ,
              success: 
              function (data) {
                  console.log(data)
                     $('#name').text( data[0].name);
                     $('#domain').text('Domain:   '+ data[0].domain);
                     $('#logo').attr('src' ,data[0].logo );
                     $('<br>').appendTo('#result')
                     $('<button>').text('Save').attr('type','click').appendTo('#result').on('click', function(){
                         SavedCompany.push(data);
                         localStorage.setItem('SavedCompany', JSON.stringify(SavedCompany));
                         renderSavedCompany();
                         
                     });
                     
            
                  },
              error: function (error) {
                  console.log(error);
              }
              
            })
        })
    
 
    function renderSavedCompany (){
       
        SavedCompany.forEach(function(data){
          
                  $('<p>').text(data[0].name).appendTo('#saved-company');
                  $('<p>').text('Domain:   '+ data[0].domain).appendTo('#saved-company');
                  $('<img>').attr('src' ,data[0].logo ).appendTo('#saved-company')
                })

    }

    })