# web-midi-note-stream
Takes in a stream of midi events and outputs objects with note/frequency information

Uses [this](http://www.midi.org/techspecs/midimessages.php) table to decode notes.

Expects a [web-midi stream](https://github.com/mmckegg/web-midi) to be piped into it,
or chunks of arrays with `[status, note, velocity]`.

Outputs an objects that looks like

``` javascript
{
	pressed: Boolean, // Whether the note was pressed or released
	note: Number, // The note from the midi event [0-127]
	velocity: Number, // The velocity from the midi event [0-127]
	channel: Number, // The channel the note was played in [1-16]
	frequency: Number, // The frequency of the note played
}
```


## Usage

Install:

``` bash
npm install --save web-midi-note-stream
```

Run:

```javascript
var noteStream = require("web-midi-note-stream");
var midiStream = require('web-midi');
var stdout = require("stdout");

// Listen to all button presses, parse them, log to console
midiStream("Launchpad")
	.pipe(noteStream())
	.pipe(stdout("Note:"));
```
