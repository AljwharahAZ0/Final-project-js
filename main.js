$(document).ready(function () {

    var SavedCompany = [];
    $('#result').hide();
      $('form').on('submit', function(event){
        
        event.preventDefault();
          var companyName = $('#company').val();
          $('#result').show();
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
                     $('<button>').text('Save').appendTo('#result').on('click', function(){
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
       $('div > button').hide();
       $('#saved-company').empty();
       $('<h3>').text('saved companies:').appendTo('#saved-company');
        SavedCompany.forEach(function(data){
                   $('p').hide();
                  $('<h1>').text(data[0].name).appendTo('#saved-company');
                  $('<h3>').text('Domain:   '+ data[0].domain).appendTo('#saved-company');
                  $('<img>').attr('src' ,data[0].logo ).appendTo('#saved-company')
                })

    }

    })