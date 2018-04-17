# noinfopath-scheduler

[![NPM](https://nodei.co/npm/noinfopath-scheduler.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/noinfopath-scheduler/)

## Overview

JavaScript task scheduler that uses MomentJs duration syntax to define events. Also support specifying specific times of day.

## Installation

	npm install noinfopath-scheduler --save

## Usage

For more details see the [documentation](https://github.com/noInfoPath/noinfopath-scheduler/blob/master/documentation.md) page.

```JavaScript

function doDoSomething() {}

function doDoSomthingElse() {}

var scheduler = require("noinfopath-scheduler"),
	alarmTask = {
		"job": {
			"name": "My Task that does something",
			"type": "alarm",
			"schedule": {
				"weekday": "tuesday",
				"time": "22:30"
			}
		},
		"fn": doDoSomething
	},
	intervalTask = {
		"job": {
			"name": "My Task that does something else",
			"schedule": {
				"interval": "h",
				"duration": "4"
			}
		},
		"fn": doDoSomthingElse
	};

scheduler.addSchedule(alarmTask);

scheduler.addSchedule(intervalTask);

scheduler.start();

```
