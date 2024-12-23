let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('catogery');
let btn = document.getElementById('btn')
let mood ='create';
let tmp;

function getTotal(){

    if( price.value !=''){
let result = (+price.value +  +taxes.value +  +ads.value)- +discount.value;
total.innerHTML = result ;
total.style.background='green' ;
    }
    else{
        total.innerHTML ='';
        total.style.background =' red'
    }
}
let datapro;
if(localStorage.product != null){
 datapro = JSON.parse(localStorage.product);
}else{
    datapro =[];
}

 function create(){
    let newpro ={
title:title.value ,
price:price.value,
taxes: taxes.value,
ads : ads.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value,
    }
      if( title.value !='' && 
      price.value !=''
      &&category.value !=''
      && newpro.count <= 100){

     if( mood === 'create'){

      if(newpro.count >1){
      for( let i =0 ; newpro.count>i ;i++){
        datapro.push(newpro);
      }
      }else{
    datapro.push(newpro);
    }
  } else{
      datapro[tmp] = newpro;
      mood = 'create';
      btn.innerHTML ='create';
      count.style.display='block';
   
     
      }
      clear();
      }
    localStorage.setItem('product',JSON.stringify( datapro))
    console.log(datapro)
    
    showdata();

     
}

function clear(){
    title.value ='';
    price.value = '';
    taxes.value ='';
    ads.value = '';
    discount.value ='';
    total.innerHTML ='';
     count.value ='';
     category.value ='';
     total.style.background='red';

}
 function showdata(){
      let table = '';  
      for( let i= 0; i < datapro.length; i++){
     table += ` <tr>
     <td>${i}</td>
     <td>${datapro[i].title} </td>
     <td>${datapro[i].price}</td>
     <td>${datapro[i].taxes}</td>
     <td>${datapro[i].ads}</td>
     <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].category}</td>
     <td><button  onclick ="updatedata(${i})" id="ubdate">ubdate</button></td>
     <td><button onclick ="deleteData(${i} )" id="delete">delete</button></td>
    </tr>`
    
         
      }

      document.getElementById('tbody').innerHTML = table ;
      let btndelete = document.getElementById('deleteall');
      if(datapro.length > 0){
        btndelete.innerHTML =` <button onclick ="deleteall( )">delete all(${datapro.length}) </button> `
      } 
      else{
        btndelete.innerHTML ='';
      }
 }
   function deleteData( i){
    
     datapro.splice(i,1);
     localStorage.product = JSON.stringify(datapro);
     showdata();

   }
   
   function deleteall( ){
    localStorage.clear();
    datapro.splice(0);
    showdata();
   }
   
   function updatedata( i){
  
    title.value = datapro[i].title ;
    price.value = datapro[i].price ;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display='none';
    category.value = datapro[i].category ;
      btn.innerHTML='update';

       mood = 'update';
          tmp = i;
          scroll({
            top:0,
            behavior:'smooth'
          })



   }


   let searhMood = ' title'
   
   function serchmood(id){
    let search = document.getElementById('search');

      if(id == 'searchtitle'){  
      searhMood = ' title'
      search.placeholder = 'search by title';
   }else{
    searhMood ='category'
    search.placeholder = 'search by category';
   }
    search.focus();
    search.value = '';
    showdata();
    
  }



  function searchdata( value){
    
    let table ='';

      if( searhMood == 'title'){

      for( let i = 0 ; i < datapro.length ; i++){

          if( datapro[i].title.includes(value)){
                  
            table += ` <tr>
     <td>${i}</td>
     <td>${datapro[i].title} </td>
     <td>${datapro[i].price}</td>
     <td>${datapro[i].taxes}</td>
     <td>${datapro[i].ads}</td>
     <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].category}</td>
     <td><button  onclick ="updatedata(${i})" id="ubdate">ubdate</button></td>
     <td><button onclick ="deleteData(${i} )" id="delete">delete</button></td>
    </tr>`
    ;
    
          }
      }

      }else {

        for( let i = 0 ; i < datapro.length ; i++){

          if( datapro[i].category.includes(value)){
                  
            table += ` <tr>
     <td>${i}</td>
     <td>${datapro[i].title} </td>
     <td>${datapro[i].price}</td>
     <td>${datapro[i].taxes}</td>
     <td>${datapro[i].ads}</td>
     <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].category}</td>
     <td><button  onclick ="updatedata(${i})" id="ubdate">ubdate</button></td>
     <td><button onclick ="deleteData(${i} )" id="delete">delete</button></td>
    </tr>`
    ;
   
          }
      }
    }
    document.getElementById('tbody').innerHTML = table ;
      
  }

 











 showdata();