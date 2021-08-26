Describe Player {}
1. Make an object for each player
2. Player one = new player use constructor to build
3. Objects should have Keys: Player Name, current score, total score

Describe rollDice()
1. Create function to make dice.
2. Use randomizer to produce number

Describe roll()
1. Add rollDice number to current score. 
2. else if roll 1 lose current score.
3. Function should end turn if a one is rolled.

Describe endTurn()
1. Function to end the turn voluntarily.
2. Function should also transfer the current score to the total score.
3. Function should then transfer control to other player.
4. Game should end when a player ends turn with 100 points.

Describe rollTwo()
1. Perform rollDice() twice.
2. Check for a single 1, end turn.
3. Check for a double 1, clear total score and end turn.
4. Check for any other double, add score and must roll again.


<!-- Two standard dice are rolled. If neither shows a 1, their sum is added to the turn total.
If a single 1 is rolled, the player scores nothing and the turn ends.
If two 1s are rolled, the player’s entire score is lost, and the turn ends.
If a double is rolled, the point total is added to the turn total as with any roll but the player is obligated to roll again (possible sub-variation of the two-dice game) -->