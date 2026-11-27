# 📦️ Axis API

**An API to help creators build their game for our Axis machine.**

This API lets you use our **custom controllers** with just a few lines of code, and emulate them easily with your keyboard and a gamepad.

If you want to create a **multiplayer game**, Axis API already has some features ready to go for you.

To increase competitiveness in your game, you can also use our **leaderboard** system and the built-in **virtual keyboard** to let players type their name.

The API also exposes the **LEDs** inside the machine (see [Handling LEDs](#handling-leds) for their current status).

**It's all quite simple to use and very flexible.**

## Table of contents

- [Axis Machine](#axis-machine)
- [Installation](#installation)
- [Usage](#usage)
  - [Importing Axis API](#importing-axis-api)
  - [Emulating inputs on your computer](#emulating-inputs-on-your-computer)
  - [Button events](#button-events)
  - [Handling joysticks](#handling-joysticks)
  - [Handling players](#handling-players)
  - [Handling leaderboard](#handling-leaderboard)
  - [Virtual Keyboard](#virtual-keyboard)
  - [Handling exit](#handling-exit)
  - [Handling sleep and awake](#handling-sleep-and-awake)
  - [Mouse interaction](#mouse-interaction)
  - [Handling LEDs](#handling-leds)
  - [Alternative controllers](#alternative-controllers)
- [API References](#api-references)
- [Development](#development)
- [Authors](#authors)

## Axis Machine

In order to use our API better, you need to have a good overview of what the Axis machine looks like and how it works:

### Axis Controllers

All the controllers are ordered in **2 groups**, each group has **1 joystick** and **5 buttons**.

A button is identified by its **key** (`a`, `x`, `i`, `s`, `w`) and its group **id** (`1` or `2`).

A joystick is identified by its group **id** (`1` or `2`).

The machine also has a single **Home** button, used to leave the current game (see [Handling exit](#handling-exit)).

![Figure 1: Controllers](https://github.com/gobelins-axis/axis-api/blob/main/src/images/controllers-figure-transparent.png?raw=true)

**Figure 1: Controllers**

### Axis Joysticks

A joystick gives an analog signal between `-1` and `1` on the x and y axes:

- `x`: `-1` is fully left, `1` is fully right.
- `y`: `-1` is fully down, `1` is fully up.

The signal is already cleaned up for you: a **deadzone** of `0.2` around the center returns `{ x: 0, y: 0 }`, and diagonals are clamped so the distance from the center never exceeds `1`.

![Figure 2: Joystick](https://github.com/gobelins-axis/axis-api/blob/main/src/images/joystick-figure-transparent.png?raw=true)

**Figure 2: Joystick**

## Installation

```bash
npm i github:gobelins-axis/axis-api
```

## Usage

### Importing Axis API

The Axis object is a singleton that contains every method and property you need to build your game. You should take a look at the [API References](#api-references) for more details.

```js
import Axis from "axis-api";
```

On the Axis machine, the launcher connects the singleton to the hardware automatically. On your computer, nothing is connected: you emulate the inputs as described below. **Your game code stays exactly the same in both cases.**

### Emulating inputs on your computer

The first thing you will need to do when starting the development of your game is to properly emulate the Axis machine inputs.

#### Emulate button inputs

You can emulate button inputs easily by mapping your keyboard keys to all the buttons available on the Axis machine, using the **registerKeys** method:

```js
// Map keyboard keys to Axis machine buttons from group 1
Axis.registerKeys("q", "a", 1); // keyboard key "q" to button "a" from group 1
Axis.registerKeys("d", "x", 1); // keyboard key "d" to button "x" from group 1
Axis.registerKeys("z", "i", 1); // keyboard key "z" to button "i" from group 1
Axis.registerKeys("s", "s", 1); // keyboard key "s" to button "s" from group 1
Axis.registerKeys(" ", "w", 1); // keyboard key Space to button "w" from group 1

// Map keyboard keys to Axis machine buttons from group 2
Axis.registerKeys("ArrowLeft", "a", 2); // keyboard key "ArrowLeft" to button "a" from group 2
Axis.registerKeys("ArrowRight", "x", 2); // keyboard key "ArrowRight" to button "x" from group 2
Axis.registerKeys("ArrowUp", "i", 2); // keyboard key "ArrowUp" to button "i" from group 2
Axis.registerKeys("ArrowDown", "s", 2); // keyboard key "ArrowDown" to button "s" from group 2
Axis.registerKeys("Enter", "w", 2); // keyboard key "Enter" to button "w" from group 2

// Note: it's also possible to map multiple keyboard keys to a single machine button:
// Axis.registerKeys(["q", "ArrowLeft"], "a", 1);
```

Keyboard keys are matched against the `key` property of the browser's `KeyboardEvent` (`"q"`, `" "`, `"ArrowLeft"`, `"Enter"`...), so the match is case sensitive.

The machine's **Home** button is emulated with the `Escape` key (see [Handling exit](#handling-exit)).

#### Emulate joystick inputs

Of course, for joystick events it's a little less convenient. You will need a gamepad with analog joysticks connected through USB or Bluetooth.

Once you have one, create a gamepad emulator instance and update it every frame to keep track of the gamepad inputs:

```js
const gamepadEmulator = Axis.createGamepadEmulator(0); // 0 is the gamepad index, usually the first gamepad connected to your computer

function update() {
    gamepadEmulator.update();

    requestAnimationFrame(update);
}

update();
```

Then, assign this emulator to the joystick you want to emulate:

```js
Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator, 0); // 0 is the joystick index of the gamepad, usually the one on the left side
Axis.joystick2.setGamepadEmulatorJoystick(gamepadEmulator, 1); // 1 is the joystick index of the gamepad, usually the one on the right side
```

You can also connect two gamepads to make it more convenient if you're creating a multiplayer game:

```js
const gamepadEmulator1 = Axis.createGamepadEmulator(0);
const gamepadEmulator2 = Axis.createGamepadEmulator(1);

Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator1, 0);
Axis.joystick2.setGamepadEmulatorJoystick(gamepadEmulator2, 0);

function update() {
    gamepadEmulator1.update();
    gamepadEmulator2.update();

    requestAnimationFrame(update);
}

update();
```

Since we're now using gamepads, why not use gamepad buttons too? Let's do it:

```js
const gamepadEmulator = Axis.createGamepadEmulator(0);

Axis.registerGamepadEmulatorKeys(gamepadEmulator, 0, "a", 1); // Gamepad button index 0 (PS4 Cross, Xbox A) to button "a" from group 1
Axis.registerGamepadEmulatorKeys(gamepadEmulator, 1, "x", 1); // Gamepad button index 1 (PS4 Circle, Xbox B) to button "x" from group 1
Axis.registerGamepadEmulatorKeys(gamepadEmulator, 2, "i", 1); // Gamepad button index 2 (PS4 Square, Xbox X) to button "i" from group 1
Axis.registerGamepadEmulatorKeys(gamepadEmulator, 3, "s", 1); // Gamepad button index 3 (PS4 Triangle, Xbox Y) to button "s" from group 1

// Like registerKeys, you can pass an array of gamepad button indexes:
// Axis.registerGamepadEmulatorKeys(gamepadEmulator, [0, 1], "a", 1);
```

Button indexes follow the [W3C standard gamepad layout](https://w3c.github.io/gamepad/#dfn-standard-gamepad). The exact mapping can vary by controller and browser, so log the index if a button doesn't respond as expected.

A few things to keep in mind:

- A joystick or button accepts **one** gamepad emulator. Calling `setGamepadEmulatorJoystick` or `registerGamepadEmulatorKeys` again on the same joystick or button does nothing.
- The emulator only starts listening once the browser fires `gamepadconnected`, which usually requires you to press a button on the gamepad first. `gamepadEmulator.isConnected()` tells you if the gamepad is currently available.
- Emulators are harmless on the machine: `update()` does nothing when no gamepad is found.

### Button events

Once the machine buttons are properly emulated with your keyboard or gamepad, you can use our button event system directly on the Axis singleton. The event payload gives you back the button key and id:

```js
// Setup event listeners directly on the Axis singleton
Axis.addEventListener("keydown", keydownHandler);
Axis.addEventListener("keyup", keyupHandler);

const position = { x: 0, y: 0 };

function keydownHandler(e) {
    const speed = 50;

    // Get the pressed button key in the event payload object
    if (e.key === "a") {
        const direction = -1;
        position.x += speed * direction;
    }

    if (e.key === "x") {
        const direction = 1;
        position.x += speed * direction;
    }

    // Use e.id to know which group the button belongs to
    if (e.key === "w" && e.id === 2) {
        // Player 2 pressed "w"
    }
}

function keyupHandler(e) {
    // Do stuff...
}

// If needed, you can of course remove the event listeners
function destroy() {
    Axis.removeEventListener("keydown", keydownHandler);
    Axis.removeEventListener("keyup", keyupHandler);
}
```

The `keydown` and `keyup` payload contains:

| Property              | Type                       | Description                                              |
| --------------------- | -------------------------- | -------------------------------------------------------- |
| `key`                 | <code>String</code>        | The machine button key (`"a"`, `"x"`, `"i"`, `"s"`, `"w"`) |
| `id`                  | <code>Int</code>           | The machine button group id (`1` or `2`)                 |
| `keyboardKeys`        | <code>Array(String)</code> | The keyboard keys registered on this button              |
| `gamepadEmulatorKeys` | <code>Array(Int)</code>    | The gamepad button indexes registered on this button (`keydown` only) |
| `instance`            | <code>Button</code>        | The Button instance itself                               |

You can also listen to button events on the button instance itself. There are two ways of accessing a button instance:

-   Using the **buttonManager**:

```js
const buttonA1 = Axis.buttonManager.getButton("a", 1);

buttonA1.addEventListener("keydown", () => {
    // Do stuff...
});
```

-   Using the **registerKeys** method, which returns the instance:

```js
const buttonA1 = Axis.registerKeys("q", "a", 1);

buttonA1.addEventListener("keydown", () => {
    // Do stuff...
});
```

You can also grab all the buttons of a group at once:

```js
const buttonsGroup1 = Axis.buttonManager.getButtonsById(1); // [a, x, i, s, w] from group 1
```

#### Button lights

Each button has an RGB LED inside of it. You can set its color with our API:

```js
const buttonA1 = Axis.buttonManager.getButton("a", 1);
buttonA1.setLedColor("red");

// You can also use RGB or hexadecimal strings
// buttonA1.setLedColor("rgb(255, 0, 0)");
// buttonA1.setLedColor("#FF0000");
```

This is quite useful if you want to let your users know which button they need to use. Or if you are creating a multiplayer game, you can split the buttons between players with different colors!

Any color format understood by the [color](https://www.npmjs.com/package/color) package is accepted. On your computer this call does nothing. See [Handling LEDs](#handling-leds) for the current status of the LEDs on the machine.

### Handling joysticks

#### Joystick event system

Just like the buttons, you can listen to joystick events directly on the Axis singleton. The event payload gives you back the joystick id:

```js
Axis.addEventListener("joystick:move", joystickMoveHandler);

const position1 = { x: 0, y: 0 };
const position2 = { x: 0, y: 0 };

function joystickMoveHandler(e) {
    // Get the joystick id in the event payload object
    if (e.id === 1) {
        const speed = 50;
        position1.x += speed * e.position.x;
        position1.y += speed * e.position.y;
    }

    if (e.id === 2) {
        const speed = 50;
        position2.x += speed * e.position.x;
        position2.y += speed * e.position.y;
    }
}
```

Again, just like the buttons, you can also listen to events on the joystick instance itself. Joystick instances are available on the Axis singleton:

```js
// Joystick move event on the joystick instance
Axis.joystick1.addEventListener("joystick:move", joystick1MoveHandler);
Axis.joystick2.addEventListener("joystick:move", joystick2MoveHandler);

const position1 = { x: 0, y: 0 };
const position2 = { x: 0, y: 0 };

function joystick1MoveHandler(e) {
    const speed = 50;
    position1.x += speed * e.position.x;
    position1.y += speed * e.position.y;
}

function joystick2MoveHandler(e) {
    const speed = 50;
    position2.x += speed * e.position.x;
    position2.y += speed * e.position.y;
}
```

If you'd rather poll than listen, the last known position is always available on the instance:

```js
function update() {
    const { x, y } = Axis.joystick1.position;
    // ...
    requestAnimationFrame(update);
}
```

#### Joystick event types

The joystick instances dispatch two different event types:

_"joystick:move":_

Fires every time a new joystick position is received (every frame with a gamepad emulator, every hardware update on the machine), even when the joystick is at rest. The payload is `{ id, position: { x, y } }` with `x` and `y` between `-1` and `1`.

_"joystick:quickmove":_

Fires when the joystick is pushed close to its limit (`0.9` or more) in one direction, and then **repeats while it is held**, like a key repeat on a keyboard: slowly at first, then faster. The payload is `{ id, direction }` where `direction` is one of `"left"`, `"right"`, `"up"`, `"down"`.

This is typically useful when you want to achieve UI navigation with the joystick.

```js
Axis.joystick1.addEventListener("joystick:quickmove", joystickQuickmoveHandler);

function joystickQuickmoveHandler(e) {
    if (e.direction === "left") selectPreviousColumn();
    if (e.direction === "right") selectNextColumn();
    if (e.direction === "up") selectPreviousRow();
    if (e.direction === "down") selectNextRow();
}
```

#### Tuning a joystick

A few parameters can be adjusted per joystick if the defaults don't fit your game:

```js
Axis.joystick1.deadzone = 0.3; // Default 0.2. Radius around the center that returns { x: 0, y: 0 }
Axis.joystick1.threshold = 0.2; // Default 0.1. "joystick:quickmove" triggers past 1 - threshold
Axis.joystick1.inputIntervalMax = 0.3; // Default 0.2. Seconds between the first "quickmove" repeats
Axis.joystick1.inputIntervalMin = 0.05; // Default 0.1. Seconds between repeats once the joystick has been held for a while
```

### Handling players

If you're building a multiplayer game, you might want to create player instances and assign them a set of joysticks and buttons. You can do that through the Axis singleton:

```js
const player1 = Axis.createPlayer({
    id: 1,
    joysticks: Axis.joystick1,
    // Can also be an array of both joysticks...
    // joysticks: [Axis.joystick1, Axis.joystick2],
    buttons: Axis.buttonManager.getButtonsById(1), // Give player 1 all buttons from group 1
});

const player2 = Axis.createPlayer({
    id: 2,
    joysticks: Axis.joystick2,
    buttons: Axis.buttonManager.getButtonsById(2), // Give player 2 all buttons from group 2
});
```

Now you can use the player instances to listen to the buttons and joystick inputs. The payloads are the same as on the Axis singleton:

```js
// Joysticks
player1.addEventListener("joystick:move", player1JoystickMoveHandler);
player2.addEventListener("joystick:move", player2JoystickMoveHandler);

// Buttons
player1.addEventListener("keydown", player1KeydownHandler);
player2.addEventListener("keydown", player2KeydownHandler);

const positionPlayer1 = { x: 0, y: 0 };
const positionPlayer2 = { x: 0, y: 0 };

function player1JoystickMoveHandler(e) {
    const speed = 50;
    positionPlayer1.x += speed * e.position.x;
}

function player2JoystickMoveHandler(e) {
    const speed = 50;
    positionPlayer2.x += speed * e.position.x;
}

function player1KeydownHandler(e) {
    // Player 1 shooting
}

function player2KeydownHandler(e) {
    // Player 2 shooting
}
```

A player's controls can be swapped at any time by reassigning its buttons and joysticks, which is handy when players choose their side:

```js
player1.buttons = Axis.buttonManager.getButtonsById(2);
player2.buttons = Axis.buttonManager.getButtonsById(1);
```

When a player leaves, destroy it so it stops listening to its inputs:

```js
Axis.playerManager.destroyPlayer(player2);
```

### Handling leaderboard

To increase competitiveness, you can create a leaderboard where your users will be able to save their best scores.

You can create the leaderboard instance like so:

```js
const leaderboard = Axis.createLeaderboard({
    id: "my-game",
});
```

Make sure to use exactly the same id as the one you received when uploading your game to the Axis machine, otherwise it won't work.
If you haven't uploaded your game yet and want to try out the leaderboard, just use any string: scores will be stored locally
and you'll be able to use the leaderboard API just like on the machine.

Only one leaderboard exists per game: the first `createLeaderboard` call creates it, later calls return the same instance, which is also available as `Axis.leaderboard`.

Then you can post scores and fetch all the existing scores. They are automatically ordered by the `value` key in descending order:

```js
// Post a score
// Every score object must at least have username and value keys
leaderboard
    .postScore({
        username: "sergiuonthetrack",
        value: 100,
    })
    .then(() => {
        // Get all scores
        leaderboard.getScores().then((scores) => {
            console.log(scores);
        });
    });
```

Each score in the returned array looks like `{ username, value, createdAt }` plus any extra key you posted. `value` is rounded to 2 decimals and `createdAt` is added automatically.

If you need to show a string instead of a numerical value in the leaderboard, you can use the `valueString` key:

```js
// Post a score
// Every score object must at least have username and value keys, valueString is optional
leaderboard
    .postScore({
        username: "sergiuonthetrack",
        value: 100,
        valueString: "100s", // specify that the score is in seconds
    })
    .then(() => {
        // Get all scores
        leaderboard.getScores().then((scores) => {
            console.log(scores);
        });
    });
```

`postScore` rejects its promise if the score is invalid (missing `username`, or `value` is not a number) or if the machine fails to save it, so remember to handle errors.

**NB**
You will not be able to push any data to the database when running the game on your own computer: only the Axis machine has the rights to push score data. On your computer we simply use the `localStorage` API to store scores under your leaderboard id. You don't have to do anything different.

### Virtual Keyboard

So you can now store your users' scores, but how will they type their usernames?

You can use our virtual keyboard. It is rendered as an overlay on top of your game and driven by the machine's controls:

- **Joystick 1** (or the arrow keys on your computer) moves between keys.
- **Button A** of group 1 (or `Enter` on your computer) presses the highlighted key.
- **Button X** of group 1 deletes the last character, **button I** inserts a space, **button S** validates.

```js
const input = document.querySelector("input");

Axis.virtualKeyboard.open();

// Fires every time the typed text changes, with the current text
Axis.virtualKeyboard.addEventListener("input", (username) => {
    input.value = username;
});

// Fires when the user validates
Axis.virtualKeyboard.addEventListener("validate", () => {
    const username = Axis.virtualKeyboard.getInput();

    Axis.virtualKeyboard.close();

    leaderboard.postScore({
        username,
        value: 100098796,
    });
});
```

`open()` clears any previously typed text. While the keyboard is open, your game still receives button and joystick events, so pause your inputs handling if needed (`Axis.virtualKeyboard.isOpen`).

### Handling exit

At any time, the player can leave the game with the machine's **Home** button. When this button is pressed, an overlay asks the player to confirm or cancel:

- **Button A** (either group) or pressing **Home** again confirms and leaves the game.
- **Button X** (either group) cancels and goes back to the game.

On your computer, the `Escape` key plays the role of the Home button.

You can handle these situations with the following events:

```js
// Exit game events
Axis.addEventListener("exit:attempted", exitAttemptedHandler);
Axis.addEventListener("exit:canceled", exitCanceledHandler);
Axis.addEventListener("exit:completed", exitCompletedHandler);

function exitAttemptedHandler() {
    pause();
}

function exitCanceledHandler() {
    unpause();
}

function exitCompletedHandler() {
    console.log("👋 Bye bye");
}
```

The overlay itself is provided by the API, you don't have to build it. After `exit:completed`, the launcher closes your game and goes back to the menu.

### Handling sleep and awake

The launcher can put the machine to sleep and wake it up later. Your game receives an event in both cases, which is a good opportunity to pause music and animations:

```js
Axis.addEventListener("sleep", () => pause());
Axis.addEventListener("awake", () => unpause());
```

These events only fire on the machine.

### Mouse interaction

If your game needs a pointer (for a WebGL picking scene or a plain HTML interface for instance), you can ask the launcher to move the system cursor with **joystick 1** and click with **button A** of group 1:

```js
Axis.enableMouseInteraction(10); // cursor speed factor

// ...

Axis.disableMouseInteraction();
```

These calls only do something on the machine. On your computer, just use your real mouse.

### Handling LEDs

The Axis machine has many LEDs connected to it. Beyond the button lights, there are two long strips on the left and right of the machine. Each one is exposed as a **group** you can color at once:

```js
Axis.ledManager.getLedGroupByName("left-strip").setColor("rgb(255, 0, 0)");
Axis.ledManager.getLedGroupByName("right-strip").setColor("#0000ff");

// Single LEDs, by name
Axis.ledManager.getLedByName("button-a-1").setColor("red"); // same as Axis.buttonManager.getButton("a", 1).setLedColor("red")
Axis.ledManager.getLedByName("button-home-0").setColor("white");

// Or by index
Axis.ledManager.leds[0].setColor("red");
Axis.ledManager.ledGroups[0].leds[10].setColor("red"); // 11th LED of the left strip
```

Available LED names: `button-{key}-{id}` for the 10 controller buttons (`button-a-1`, `button-w-2`...), `button-home-0`, and the groups `left-strip` and `right-strip` (51 LEDs each).

⚠️ **Hardware issue** The LEDs from the first player buttons are currently broken (a-1, x-1, i-1, s-1, w-1). Calling the API is safe but no light will be visible for now.

### Alternative controllers

Besides its own buttons and joysticks, the machine accepts **alternative controllers**: any board with a USB serial port (Arduino Uno, Nano, ESP32, Teensy...) plugged in while it runs. You build the controller, flash it with a sketch that speaks the launcher's protocol (see `scripts/AlternativeController` in the [arduino repository](https://github.com/gobelins-axis/arduino)), and your game reads its messages here.

Each board announces a **name** (`type:ready__controller:my-controller`). Get the controller by that name, it works even before the board is plugged in and keeps your listeners across unplug / replug:

```js
const controller = Axis.getAlternativeController("my-controller");

controller.addEventListener("connected", (e) => console.log(`${e.name} connected on slot ${e.slot}`));
controller.addEventListener("disconnected", (e) => console.log(`${e.name} disconnected`));

controller.addEventListener("message", (e) => {
    // The board sent "type:alternative__key:fire__state:keydown"
    if (e.data.key === "fire" && e.data.state === "keydown") shoot();
});
```

Message fields are free-form: everything the board sends after `type:alternative__` arrives in `data` as **strings** (`"type:alternative__key:knob__value:512"` → `{ key: "knob", value: "512" }`), so your sketch and your game agree on the names. Convert numbers yourself (`parseInt(e.data.value)`).

You can also listen to every controller at once on the singleton:

```js
Axis.addEventListener("alternative:message", (e) => console.log(e.name, e.slot, e.data));
```

Give each board a unique name. The `slot` (3, 4, ...) is assigned by the launcher in connection order and can change on replug; use the name to tell controllers apart.

These events only fire on the machine, with a launcher that supports alternative controllers. On your computer, emulate a controller by calling its handlers yourself:

```js
const controller = Axis.getAlternativeController("my-controller");
controller.connectHandler(3);
window.addEventListener("keydown", (e) => {
    if (e.key === "f") controller.messageHandler({ key: "fire", state: "keydown" });
});
```

## API References

Every class listed below with events extends the same `EventDispatcher`, so it exposes:

`addEventListener(event, eventHandler)`

`removeEventListener(event, eventHandler)`

| Param        | Type                  | Description           |
| ------------ | --------------------- | --------------------- |
| event        | <code>String</code>   | Event name            |
| eventHandler | <code>function</code> | The callback function |

The same handler can only be registered once per event.

### Axis (singleton)

#### Properties

`ipcRenderer` : Electron IPC renderer object on the machine, `null` on your computer

`joystickManager` : instance of JoystickManager class

`joystick1` : instance of Joystick class

`joystick2` : instance of Joystick class

`buttonManager` : instance of ButtonManager class

`playerManager` : instance of PlayerManager class

`players` : Array of instances of Player class

`leaderboard` : instance of Leaderboard class, `null` until `createLeaderboard` is called

`virtualKeyboard` : instance of VirtualKeyboard class

`ledManager` : instance of LedManager class

`alternativeControllerManager` : instance of AlternativeControllerManager class

`alternativeControllers` : Array of instances of AlternativeController class, every controller known so far

#### Methods

`Axis.registerKeys(keyboardKeys, key, id)` : instance of Button class

| Param        | Type                                              | Description                                      |
| ------------ | ------------------------------------------------- | ------------------------------------------------ |
| keyboardKeys | <code>String</code> or <code>Array(String)</code> | Keyboard keys to map to the machine button       |
| key          | <code>String</code>                               | The machine button key ("a", "x", "i", "s", "w") |
| id           | <code>Int</code>                                  | The machine button group id (1 or 2)             |

`Axis.registerGamepadEmulatorKeys(gamepadEmulator, gamepadButtonIndexes, key, id)` : instance of Button class

| Param                | Type                                        | Description                                      |
| -------------------- | ------------------------------------------- | ------------------------------------------------ |
| gamepadEmulator      | <code>GamepadEmulator</code>                | Instance of GamepadEmulator class                |
| gamepadButtonIndexes | <code>Int</code> or <code>Array(Int)</code> | The gamepad button indexes                       |
| key                  | <code>String</code>                         | The machine button key ("a", "x", "i", "s", "w") |
| id                   | <code>Int</code>                            | The machine button group id (1 or 2)             |

`Axis.getAlternativeController(name)` : instance of AlternativeController class, created if needed

| Param | Type                | Description                         |
| ----- | ------------------- | ----------------------------------- |
| name  | <code>String</code> | The name the board announces itself with |

`Axis.createGamepadEmulator(index)` : instance of GamepadEmulator class

| Param | Type             | Description       |
| ----- | ---------------- | ----------------- |
| index | <code>Int</code> | The gamepad index |

`Axis.createPlayer(options)` : instance of Player class

| Param             | Type                                                  | Description                                |
| ----------------- | ----------------------------------------------------- | ------------------------------------------ |
| options.id        | <code>Any</code>                                      | Identifier of your choice                  |
| options.joysticks | <code>Joystick</code> or <code>Array(Joystick)</code> | Joysticks assigned to the player, optional |
| options.buttons   | <code>Array(Button)</code>                            | Buttons assigned to the player, optional   |

`Axis.createLeaderboard(options)` : instance of Leaderboard class (always the same instance)

| Param      | Type                | Description                                        |
| ---------- | ------------------- | -------------------------------------------------- |
| options.id | <code>String</code> | The id received when uploading the game to the hub |

`Axis.enableMouseInteraction(speed)` : undefined

| Param | Type                | Description                            |
| ----- | ------------------- | -------------------------------------- |
| speed | <code>Number</code> | Cursor speed factor                    |

`Axis.disableMouseInteraction()` : undefined

`Axis.addEventListener(event, eventHandler)` : undefined

`Axis.removeEventListener(event, eventHandler)` : undefined

#### Events

| Event                | Payload                       | Description                                             |
| -------------------- | ----------------------------- | ------------------------------------------------------- |
| `keydown`            | see [Button events](#button-events) | Any machine button pressed                        |
| `keyup`              | see [Button events](#button-events) | Any machine button released                       |
| `joystick:move`      | `{ id, position: { x, y } }`  | Any joystick position update                            |
| `joystick:quickmove` | `{ id, direction }`           | Any joystick pushed to a limit, repeats while held      |
| `exit:attempted`     | none                          | Home pressed, exit overlay shown                        |
| `exit:canceled`      | none                          | Exit overlay canceled                                   |
| `exit:completed`     | none                          | Exit confirmed, the launcher is about to close the game |
| `sleep`              | none                          | The machine goes to sleep (machine only)                |
| `awake`              | none                          | The machine wakes up (machine only)                     |
| `alternative:connected`    | `{ name, slot }`        | An alternative controller connected                     |
| `alternative:disconnected` | `{ name, slot }`        | An alternative controller disconnected                  |
| `alternative:message`      | `{ name, slot, data }`  | A message from any alternative controller               |

### JoystickManager

#### Properties

`joystick1` : instance of Joystick class

`joystick2` : instance of Joystick class

### Joystick

#### Properties

`id` : Int, `1` or `2` (read only)

`position` : `{ x, y }`, last normalized position (read only)

`deadzone` : Number, default `0.2`

`threshold` : Number, default `0.1`

`inputIntervalMax` : Number in seconds, default `0.2`

`inputIntervalMin` : Number in seconds, default `0.1`

#### Methods

`joystick.setGamepadEmulatorJoystick(gamepadEmulator, joystickIndex)` : undefined

| Param           | Type                         | Description                                           |
| --------------- | ---------------------------- | ----------------------------------------------------- |
| gamepadEmulator | <code>GamepadEmulator</code> | Instance of GamepadEmulator class                     |
| joystickIndex   | <code>Int</code>             | `0` for the left stick, `1` for the right stick       |

#### Events

`joystick:move` : `{ id, position: { x, y } }`

`joystick:quickmove` : `{ id, direction }`

### ButtonManager

#### Properties

`buttons` : Array of the 10 Button instances

`buttonHome` : instance of Button class for the Home button (`key: "home"`, `id: 0`)

#### Methods

`buttonManager.getButton(key, id)` : instance of Button class, or `undefined`

| Param | Type                | Description                                      |
| ----- | ------------------- | ------------------------------------------------ |
| key   | <code>String</code> | The machine button key ("a", "x", "i", "s", "w") |
| id    | <code>Int</code>    | The machine button group id (1 or 2)             |

`buttonManager.getButtonsById(id)` : Array of Button instances

| Param | Type             | Description                          |
| ----- | ---------------- | ------------------------------------ |
| id    | <code>Int</code> | The machine button group id (1 or 2) |

`buttonManager.getButtonsByKeyboardKey(keyboardKey)` : Array of Button instances

| Param       | Type                | Description                     |
| ----------- | ------------------- | ------------------------------- |
| keyboardKey | <code>String</code> | A keyboard key, e.g. `"q"`      |

`buttonManager.registerKeys(keyboardKeys, key, id)` : same as `Axis.registerKeys`

`buttonManager.registerGamepadEmulatorKeys(gamepadEmulator, gamepadButtonIndexes, key, id)` : same as `Axis.registerGamepadEmulatorKeys`

#### Events

`home:keydown` : none, Home button pressed (machine only)

`home:keyup` : none, Home button released (machine only)

### Button

#### Properties

`key` : String (read only)

`id` : Int (read only)

`keyboardKeys` : Array(String), keyboard keys mapped to this button

`gamepadEmulatorKeys` : Array(Int), gamepad button indexes mapped to this button

`led` : instance of Led class

#### Methods

`button.setLedColor(color)` : undefined

| Param | Type                | Description                                      |
| ----- | ------------------- | ------------------------------------------------ |
| color | <code>String</code> | Any CSS color string (`"red"`, `"#ff0000"`, `"rgb(255, 0, 0)"`) |

#### Events

`keydown`, `keyup` : see [Button events](#button-events)

### PlayerManager

#### Properties

`players` : Array of Player instances

#### Methods

`playerManager.createPlayer(options)` : same as `Axis.createPlayer`

`playerManager.destroyPlayer(player)` : undefined, removes the player and its listeners

`playerManager.getPlayerById(id)` : instance of Player class, or `undefined`

`playerManager.destroy()` : undefined, destroys every player

### Player

#### Properties

`id` : the id given at creation (read only)

`joysticks` : Array of Joystick instances, can be reassigned with a Joystick or an array of Joysticks

`buttons` : Array of Button instances, can be reassigned

#### Methods

`player.destroy()` : undefined, stops listening to its inputs

#### Events

`keydown`, `keyup`, `joystick:move`, `joystick:quickmove` : same payloads as on the Axis singleton, limited to the player's own inputs

### Leaderboard

#### Properties

`id` : String (read only)

#### Methods

`leaderboard.postScore(score)` : Promise, resolves when saved, rejects if the score is invalid or could not be saved

| Param             | Type                | Description                                     |
| ----------------- | ------------------- | ----------------------------------------------- |
| score.username    | <code>String</code> | Required, must not be empty                     |
| score.value       | <code>Number</code> | Required, rounded to 2 decimals, used for sorting |
| score.valueString | <code>String</code> | Optional, displayed instead of `value`          |

`leaderboard.getScores()` : Promise resolving to an Array of scores sorted by `value`, highest first

### VirtualKeyboard

#### Properties

`isOpen` : Boolean (read only)

#### Methods

`virtualKeyboard.open()` : undefined, clears the input and shows the keyboard

`virtualKeyboard.close()` : undefined

`virtualKeyboard.getInput()` : String, the current typed text

#### Events

`input` : String, the current typed text, fires on every change

`keypress` : String, the key that was pressed (`"a"`, `"{bksp}"`, `"{space}"`, `"{enter}"`...)

`validate` : fires when the user presses the validate key

### GamepadEmulator

#### Methods

`gamepadEmulator.update()` : undefined, reads the gamepad state, call it every frame

`gamepadEmulator.isConnected()` : Boolean

#### Events

`gamepad:keydown` : Int, gamepad button index

`gamepad:keyup` : Int, gamepad button index

`gamepad:joystick:move` : `{ index, position: { x, y } }`, raw gamepad axes

### LedManager

#### Properties

`leds` : Array of Led instances (the 11 button LEDs)

`ledGroups` : Array of LedGroup instances (`left-strip`, `right-strip`)

#### Methods

`ledManager.getLedByName(name)` : instance of Led class, or `undefined`

`ledManager.getLedGroupByName(name)` : instance of LedGroup class, or `undefined`

### Led

#### Properties

`name` : String, `strip` : Int, `index` : Int (read only)

#### Methods

`led.setColor(color)` : undefined

### LedGroup

#### Properties

`name` : String, `strip` : Int, `indexStart` : Int, `indexEnd` : Int, `leds` : Array of Led instances (read only)

#### Methods

`ledGroup.setColor(color)` : undefined, sets every LED of the group

### AlternativeControllerManager

#### Properties

`controllers` : Array of AlternativeController instances, connected or not (read only)

`connectedControllers` : Array of the connected ones (read only)

#### Methods

`alternativeControllerManager.getController(name)` : instance of AlternativeController class, created (disconnected) if the board has not shown up yet

#### Events

`alternative:connected` : `{ name, slot }`

`alternative:disconnected` : `{ name, slot }`

`alternative:message` : `{ name, slot, data }`

### AlternativeController

#### Properties

`name` : String, the name announced by the board (read only)

`slot` : Int (3, 4, ...) assigned by the launcher, `null` before the first connection (read only)

`isConnected` : Boolean (read only)

`data` : Object, fields of the last message, values are strings (read only)

#### Methods

`controller.connectHandler(slot)`, `controller.disconnectHandler()`, `controller.messageHandler(data)` : undefined. Called by the API on the machine; call them yourself to emulate a controller.

#### Events

`connected` : `{ name, slot }`

`disconnected` : `{ name, slot }`

`message` : `{ name, slot, data }`

### Named exports

Besides the default `Axis` export, the package exposes two helpers:

```js
import { normalizeJoystickSignal, getGamepadList } from "axis-api";
```

`normalizeJoystickSignal(position, deadzone)` : converts a raw machine joystick position into the `-1..1` range used by the API. You should not need it in a game.

`getGamepadList()` : Promise resolving to `navigator.getGamepads()` once the first gamepad is connected. Useful to find the index to pass to `createGamepadEmulator`.

## Development

### Run demo

```bash
# install dependencies
npm install

# serve the demo with hot reload at localhost:3003
npm run dev
```

The demo (`demo/`) doubles as a joystick and button debugger.

### Build

Pushing to `main` triggers a GitHub Action that runs the build and commits `build/bundle.js`. You can also build locally with `npm run build` and commit the bundle together with your source changes.

### Compatibility rule

Dozens of shipped games embed old builds of this library and will never be rebuilt. **New features must be additive**: never change what existing code receives (event names, payload shapes, the joystick normalization range). The joystick input range in `src/utils/normalizeJoystickSignal.js` is a wire format produced on purpose by the launcher, not a hardware description, and must not be "fixed".

### Running inside your own Electron shell

The Axis launcher already does this for you on the machine. If you want to reproduce the machine setup in your own Electron app, make sure context isolation is disabled in the main process:

```js
// main.js
const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: false,
        enableRemoteModule: true,
    },
});
```

Then in `preload.js`, on `DOMContentLoaded`, hand the IPC renderer to the Axis instance exposed on `window`:

```js
// preload.js
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    window.__axis__.set_ipc_renderer(ipcRenderer);
});
```

The launcher expects `window.__axis__` on every page, so make sure Axis API is imported before the page finishes loading.

## Authors

[@LPGeneret](https://twitter.com/LPGeneret)
[@sergebocancea](https://twitter.com/sergebocancea)
[@leochocolat](https://twitter.com/leochocolat)
