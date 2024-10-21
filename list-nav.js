function createListNav(listSelector, ...rest) {
    const list = document.querySelector(listSelector);
    const items = list.querySelectorAll('li');
    const nav = document.createElement('div');
    nav.setAttribute('id', '-nav');
    const letters = document.createElement('div');
    letters.classList.add('ln-letters');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const alphabetCount = {};

    // Find optional parameters or set defaults
    const noAll = rest.indexOf('noAll') != -1 ? 1 : 0;
    const showCount = rest.indexOf('showCount') != -1 ? 1 : 0;
    const disableZero = 0;


    listIdentifier(items, alphabetCount);
    if (noAll == 0) {
      allbutton(items, letters);
    }
    addNoMatchLI(list);
    
    // Build our navigation buttons
    alphabet.forEach(letter => {
      const button = document.createElement('a');
  
      // Populate the text of the buttons, with counts if desired
      if (showCount == 1 && letter in alphabetCount) {
        button.textContent = letter + "  (" + alphabetCount[letter] + ")";
      } else {
        button.textContent = letter;
      }

      button.classList.add(letter);
      button.href = '#';
      button.addEventListener('click', () => {
        // Use a counter to trigger the 'no match' LI.
        var counter = items.length;
        
        items.forEach(item => {
          const text = item.innerText.toUpperCase();
          
          if (text.trim().charAt(0) == letter) {
            item.style.display = 'list-item';  
          } else {
            item.style.display = 'none';
            counter = counter - 1;
          }
        });

        // Display the no match LI if our counter has been reduced to zero
        document.querySelector('.ln-no-match').style.display = counter == 0 ? 'list-item' : 'none';
      });

      letters.appendChild(button);
    });
    
    nav.classList.add('listNav');
    nav.appendChild(letters);

    list.parentNode.insertBefore(nav, list);
  }

  // Identify the starting letter of each list item then add the ln-[letter] class to it
  function listIdentifier(items, alphabetCount){
    for (var i = 0; i < items.length; i++) {
      var letter = items[i].innerText.charAt(0).toLowerCase();
      items[i].classList.add("ln-" + letter);
      // Add the letters to an object so we can use it for counting if that's enabled
      letter = letter.toUpperCase();
      if (letter in alphabetCount){
        alphabetCount[letter] = alphabetCount[letter] + 1;
      } else {
        alphabetCount[letter] = 1;
      }
    }
  }
  
  // Make a button to select all items
  function allbutton(items, letters){
    const allbtn = document.createElement('a');
    allbtn.textContent = 'All';
    allbtn.classList.add('all','ln-selected');
    allbtn.addEventListener('click', () => {
        items.forEach(item => {
            item.style.display = 'list-item';
        })
    })
    
    letters.appendChild(allbtn);
  }

  // Make a list item that displays if there are no matches
  function addNoMatchLI(list) {
    var noMatch = document.createElement('li');
    noMatch.classList.add('ln-no-match');
    noMatch.textContent = "No matching items found.";
    list.appendChild(noMatch);
  }