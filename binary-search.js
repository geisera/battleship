window.onload = function() {
    // Binary Search Demo

    // Intitialize variables for Binary Search
    let min = 1;
    let max = 100;
    let mid;
    let secret = Math.floor(Math.random() * max) + min;
    let guess = 0;
    let hint = '';
    let guessesRemaining = max - 1;
    let guessCounter = 0;
    let isCorrect = false;
    let range = [];
    let outOfRange = [];
    // create a state machine ENUM
    const State = Object.freeze({
        VICTORY: 0,
        FAILURE: 1,
        TOO_LOW: 2,
        TOO_HIGH: 3,
        OUT_OF_BOUNDS: 4
    });
    // initialize state
    let currentState = State.PENDING;

    // create an array of all integers including, and between, min and max
    setRange = function ( min, max ) {
        document.getElementById('range').innerHTML = '';
        range = [];
        let i = min;
        while ( i <= max ) {
            range.push(i);
            i++;
        }

        // diplay each of the integers from the array in the 'range' div
        for ( i in range ){
            let option = range[i];
            document.getElementById('range').innerHTML +=`<span style="margin: 10px;" id="option-${option}">${option}</span>`;
        }    
    };
    
    setRange( min,  max );

    // handle user guess
    handleGuess = function (event) {
        guess = parseInt(event.target.value);
        event.target.value = '';
        guessesRemaining--;
        guessCounter++;

        if ( guess < min || guess > max ){
            isCorrect = false;
            currentState = State.OUT_OF_BOUNDS;
            stateHandler(currentState);

        } else if ( guessesRemaining <= 0 && guess != secret) {
            isCorrect = false;
            currentState = State.FAILURE;
            stateHandler(currentState);
            
        } else if ( guess < secret ){
            isCorrect = false;
            currentState = State.TOO_LOW;
            stateHandler(currentState);

        } else if ( guess > secret ){
            isCorrect = false;
            currentState = State.TOO_HIGH;
            stateHandler(currentState);

        } else if ( guess == secret ){
            isCorrect = true;
            currentState = State.VICTORY;
            stateHandler(currentState);

        } 
        
    };

    // reload page on click, or SPACE bar pressed
    handleReload = () => {
        location.reload();
    };

    // set state based on user guess and other factors
    stateHandler = function (currentState){
        let showPrompt;
        let showHint;

        if ( currentState === State.VICTORY ){
            if ( guessCounter > 1 ) {
                info = `<p class="hover-text" onclick="handleReload()">You won in ${guessCounter} guesses.</p>`;
            } else {
                info = `<p class="hover-text" onclick="handleReload()">You won in ${guessCounter} guess.</p>`;
            }
            showPrompt = 'hidden';
            showHint = 'hidden';
            max = guess;
            min = guess;
            setRange( min, max );

        } else if ( currentState === State.FAILURE ){
            info = `<p class="hover-text" onclick="handleReload()">You have failed!</p>`;
            showPrompt = 'hidden';
            showHint = 'hidden';

        } else if ( currentState === State.TOO_LOW ){
            
            info = '';
            showHint = 'visible';
            hint = `<p>${guess} is too low.</p>`
            min = guess + 1;
            setRange( min, max );

        } else if ( currentState === State.TOO_HIGH ){
            info = '';
            showHint = 'visible';
            hint = `<p>${guess} is too high.</p>`
            max = guess - 1;
            setRange( min, max );

        } else if ( currentState === State.OUT_OF_BOUNDS ){
            info = '';
            showHint = 'visible';
            hint = `<p>${guess} is out of bounds.</p>`
            guess = 'bounds';
        }

        document.getElementById('info').innerHTML = `${info}`;
        document.getElementById('prompt').style.visibility = `${showPrompt}`;
        document.getElementById('hint').style.visibility = `${showHint}`;
        if (isCorrect){
            document.getElementById(`option-${guess}`).setAttribute("class", isCorrect);
            document.getElementById('play-again').style.visibility = 'visible';
        }
        document.getElementById('hint').innerHTML = `${hint}`;

        return

    };

    // event listeners for user guess, and keyboard events. Other DOM stuff.
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('fadeIn');
    body.style.visibility = 'visible';
    document.getElementById('guess').focus();
    document.getElementById('guess').addEventListener('change', handleGuess);
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.code === 'Enter' || event.code === 'NumpadEnter') { 
            if ( currentState == State.FAILURE || currentState == State.VICTORY ){
                const game_over = document.getElementsByTagName('body')[0];
                game_over.classList.add('fadeOut');
                game_over.addEventListener('animationend', () => {
                    handleReload();
                });     
            }
        }
        // cheat
        else if ( event.code === 'NumpadMultiply') {
            console.log(secret);
        }
    });  
    
};