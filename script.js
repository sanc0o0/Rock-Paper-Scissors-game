
        let Score = JSON.parse(localStorage.getItem('Score')) || {
            player: 0,
            computer: 0,
            Ties: 0
        };

        updateScoreElement();



        
        function playGame(PlayerMove) {
            const computerMove = pickComputerMove();
            if (computerMove === 'Rock') {
                if (PlayerMove === 'Rock') {
                    result = 'Tie!';
                } else if (PlayerMove === 'Paper') {
                    result = 'You win!';
                } else if (PlayerMove === 'Scissor') {
                    result = 'You lose!';
                }
            } else if (computerMove === 'Paper') {
                if (PlayerMove === 'Rock') {
                    result = 'You lose!';
                } else if (PlayerMove === 'Paper') {
                    result = 'Tie!';
                } else if (PlayerMove === 'Scissor') {
                    result = 'You win!';
                }
            } else if (computerMove === 'Scissor') {
                if (PlayerMove === 'Rock') {
                    result = 'You win!';
                } else if (PlayerMove === 'Paper') {
                    result = 'You lose!';
                } else if (PlayerMove === 'Scissor') {
                    result = 'Tie!';
                }
            }
            if (result === 'You win!') {
                Score.player++;
            } else if (result === 'You lose!') {
                Score.computer++;
            } else if (result === 'Tie!') {
                Score.Ties++;
            }
            localStorage.setItem('Score', JSON.stringify(Score));

            updateScoreElement();
            document.querySelector('.js-result')
                .innerHTML = result;

            document.querySelector('.js-moves')
                .innerHTML = `Your: ${PlayerMove},   Computer: ${computerMove}.`;


        }

        function updateScoreElement() {
            document.querySelector('.js-score')
                .innerHTML = `Wins : ${Score.player}, Losses: ${Score.computer}, Ties: ${Score.Ties}`;
        }
        function pickComputerMove() {
            const randomNumber = Math.random();

            if (randomNumber <= 1 / 3) {
                computerMove = 'Rock';
            } else if (randomNumber <= 2 / 3) {
                computerMove = 'Paper';
            } else if (randomNumber <= 1) {
                computerMove = 'Scissor';
            }
            return computerMove;

        }
        function resetScore() {
            Score.player = 0;
            Score.computer = 0;
            Score.Ties = 0;
            localStorage.setItem('Score', JSON.stringify(Score));

        }


    