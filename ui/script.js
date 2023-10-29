//disable drag and drop html elements on pages
document.querySelector('html').addEventListener('dragstart', e => e.preventDefault())



const audioBtn = new Audio('./sound/clickBtn.wav');
  

//----------------
let mayorName = ''
let advisorName = ''
let isChoseAdvisor = false
let [table1, table2] = document.getElementsByTagName('table')


//card animation by click
document.querySelector('.card').addEventListener('click', function (e) {
  //hide label
  e.target.parentNode.children[1].style.display = 'none'
  // move card down
  this.style.transform = 'translateY(18.8em)'
  // move card left
  setTimeout(() => this.style.transform = 'translate(-25.05em, 18.8em)', 1500)
  // move card up
  setTimeout(() => {
    this.style.transform = 'translate( -25.05em, 14em)'
    document.querySelector('.page').src = ("./images/page1_1.png")
    document.querySelector('.card').style.zIndex = '-1'
  }, 3000)

  // prevent more click events
  this.removeEventListener('click', arguments.callee);
  // switch page
  setTimeout(() => {
    document.getElementById('page2').style.display = 'flex'
  }, 5000);

});


//------td elements mayor select vote
Array.from(document.getElementsByTagName('td')).forEach((td, index) => {
  td.addEventListener('click', (e) => {
    //restore default table data before choice
    restoreTableData()

    if (e.currentTarget.lastChild.data != 'Не подкрепям никого') {
      document.querySelector('ul').style.display = 'block'
    } else {
      document.querySelector('ul').style.display = 'none'
    }
    e.currentTarget.querySelector('.icon2').innerHTML = '&#9745;'
    e.target.style = "background-color:darkslateblue; color: white"
    mayorName = (index + 1) + '. ' + e.currentTarget.lastChild.textContent
  })
})


//------li elements advisors
Array.from(document.getElementsByTagName('li')).forEach(li => {
  li.addEventListener('click', (e) => {
    if (!isChoseAdvisor) {
      isChoseAdvisor = true
      advisorName = e.currentTarget.textContent
      e.currentTarget.innerHTML = '&#215;' //'&#9745;'
      e.currentTarget.style = "background-color:darkslateblue; color: white"
    }

  })
})


//------buttons elements
Array.from(document.getElementsByTagName('button')).forEach(btn => {
  btn.addEventListener('click', (e) => {
    //play sound
    audioBtn.play()

    if (e.currentTarget.textContent == 'Следваща стр.') {
      e.currentTarget.textContent = 'Предишна стр.'
      table1.style.display = 'none'
      table2.style.display = 'block'
    } else if (e.currentTarget.textContent == 'Предишна стр.') {
      e.currentTarget.textContent = 'Следваща стр.'
      table2.style.display = 'none'
      table1.style.display = 'block'
    } else if (e.currentTarget.textContent == 'Преглед') {
      //set names
      const [mayor, advisor] = document.getElementsByClassName("data")
      mayor.textContent = mayorName

      let btnVote = document.getElementsByClassName("btn-vote")[0]
      if (mayor.textContent == '') {
        mayor.textContent = 'Не е направен избор!'
        advisor.textContent = ''
        btnVote.disabled = true
        btnVote.style.color = 'black'
        btnVote.style.backgroundColor = 'rgb(38, 38, 41)'
      } else {
        const randomFakeName = Math.random() < 0.5 ? '. Бай Хой' : '. Кака Потка'
        advisor.textContent = advisorName.length ? advisorName + randomFakeName : null
        btnVote.disabled = false
        btnVote.style = "color: white"
      }

      document.getElementById('page2').style.display = 'none'
      document.getElementById('page3').style.display = 'flex'

    } else if (e.currentTarget.textContent == 'Промени избора') {
      //restore data
      restoreTableData()
      //hide / show page
      document.getElementById('page3').style.display = 'none'
      document.getElementById('page2').style.display = 'flex'
      //restore choice
      let btnNext = document.querySelector('.btn-next')
      if (btnNext.textContent == 'Предишна стр.') {
        btnNext.textContent = 'Следваща стр.'
        table1.style.display = 'block'
        table2.style.display = 'none'
      }

    } else if (e.currentTarget.textContent == 'Гласуване') {
      //hide / show page
      document.getElementById('page3').style.display = 'none'
      document.getElementById('page4').style.display = 'flex'
      setTimeout(() => {
        document.getElementById('page4').style.display = 'none'
        document.getElementById('page5').style.display = 'flex'
      }, 4000);
    }
  });
})

//--------receipt event
document.getElementsByClassName('receipt-done')[0].addEventListener('click', e => {
  e.currentTarget.style.opacity = 0
  setTimeout(() => {
    document.getElementById('page5').style.display = 'none'
    document.getElementById('page6').style.display = 'flex'
  }, 1000);


})


//-------final card animation 
document.getElementsByClassName('half-card')[0].addEventListener('click', e => {
  //hide div fake btn
  e.currentTarget.display = 'none'
 
  //load card element
  let card = document.getElementsByClassName('card-out')[0]

  //--------------------start animation card
  // move card down
  card.style.transform = 'translate( 0, 6.7em)'

  //show card  display block
  setTimeout(() => {
    card.style.display = 'block'
    document.querySelector('.page').src = ("./images/page1.png")
    document.querySelector('.card').remove()
    
  }, 200);


  // move card right
  setTimeout(() => card.style.transform = 'translate(26em, 6.7em)', 1000)


  // move card up
  setTimeout(() => card.style.transform = 'translate( 26em ,-15em)', 2500)


  // RESTART HTML
  setTimeout(() => location.reload(), 5000)
})



//-------------restore table data
function restoreTableData() {
  // restore names
  mayorName = ''
  advisorName = ''
  isChoseAdvisor = false
  //hide li table
  document.querySelector('ul').style.display = 'none'

  //table 1
  Array.from(document.getElementsByTagName('td')).forEach((td, index) => {
    let num = 49 + index
    td.querySelector('.icon2').innerHTML = `&#${num};`
    td.style = "background-color: revert; color: black"
  })
  //table 2
  Array.from(document.getElementsByTagName('li')).forEach((li, index) => {
    li.style = "background-color: revert; color: black"
    li.innerHTML = 101 + index
  })

}

