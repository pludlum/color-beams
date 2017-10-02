# Color Beams

### Overview

Color Beams will be a browser based game built with HTML, CSS, and vanilla JavaScript. The core of the game will involve navigating two circles (one red, one blue) safely around the game screen while similarly colored "beams" fly in from the edges of screen. If one of these beams collides with a differently colored circle (i.e. a blue beam colliding with a red circle) the game will end. However, if a beam collides with a circle of the same color (i.e. red beam hitting a red circle) the beam is safely cancelled out and disappears.

The two circles will be guided across the screen via mouse input. One circle, which we shall call the "leading circle" will simply be tied to the current cursor position. The other circle, the "following circle", will maintain a strict distance from the leading circle. By moving the cursor around the game area, the player can then maneuver the circles in such a way as to ensure that the beams only collide with the correct, corresponding color. Below is a wireframe demonstrating what the user might interface with:

![](https://i.imgur.com/eU52xTB.png)

The beams themselves will move across the screen at varying speeds until they collide with one of the two colored circles. As the game progresses, the average speed of the beams, as well as the number of beams on the screen, will slowly increase.

Once a beam collides with the incorrect colored circle, the game will end and the score (number of beams survived) will be displayed. There will be no traditional "win" state - only this single end game condition.


## MVP
The game will involve:
- [ ] A welcoming screen describing the rules and controls to begin the game.
- [ ] User-controllable circles, bound to the position of the cursor.
- [ ] Beams with different colors and velocities, continually generated as the game progresses.
- [ ] Recording of the user's current score and high score.
- [ ] Music and sound effects (with mute button).
- [ ] Smooth interface and minimalist styling.


## Architecture and Technologies

The technologies used for this project will be:
- Vanilla Javascript for game logic.
- `HTML5 Canvas` for rendering.
- `HTML5` audio tags for sound effects and music.
- Webpack to bundle scripts together.

The main scripts will include:
- `game.js` to house the logic of the basic game loop.
- `screen.js` to handle the `canvas` screen on which the game is played and check for collisions within.
- `circles.js` to handle the logic of the user-controlled circles.
- `beams.js` to handle the movement and positioning of the beams that sweep across the screen.
- `auido.js` to handle the music and sound effect events.

## Implementation Timeline

#### Weekend:
- [x] Research methods of binding canvas drawings to mouse position.
- [x] Review asteroids project from  week 6.
- [x] Set up skeleton of project including webpack.


#### Monday:
- [ ] Set up a basic entry file.
- [ ] Implement `canvas` screen, canvas circles
- [ ] Implement logic for binding circles to the mouse position.

#### Tuesday:
- [ ] Add colored `canvas` beams that sweep across the game screen.
- [ ] Implement collision logic and game over screen.

#### Wednesday:
- [ ] Implement score counter and sound effects
- [ ] Complete game loop logic tying all other components together.

#### Thursday:
- [ ] Style the welcoming screen and interface for beginning a game.
- [ ] Implement bonus features (additional levels) if time permits.


## Bonus (Variations on a Theme)
If time permits, the basic concept of the game can be expanded with additional levels. Variations on the base game could include:
- One circle is static at the center of the game screen.
- Circles orbit one another.
- Beams fade in as they approach, allowing for shorter reaction time.
- Beams and circles swap colors over time.
- A button to swap the colors of your circles.
