var utils = require("midiutils");
var through2 = require("through2");

module.exports = noteParser;

function noteParser() {
	return through2.obj(parse);
}

function parse(data, encoding, cb) {
	var status = data[0];
	var note = data[1];
	var velocity = data[2];

	var pressed;
	var channel;

	if (is_off(status)) {
		pressed = false;
		channel = get_channel_off(status);
	} else if (is_on(status)) {
		pressed = true;
		channel = get_channel_on(status);
	} else return cb(); // Ignore non-press related events

	var frequency = utils.noteNumberToFrequency(note);

	cb(null, {
		pressed: pressed,
		note: note,
		velocity: velocity,
		channel: channel,
		frequency: frequency,
	})
}

function is_off(status) {
	return status >= 128 && status <= 143;
}

function get_channel_off(status) {
	return status - 127;
}

function is_on(status) {
	return status >= 144 && status <= 159;
}

function get_channel_on(status) {
	return status - 143;
}
