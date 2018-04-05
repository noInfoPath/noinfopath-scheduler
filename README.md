# noinfopath-scheduler

[![NPM](https://nodei.co/npm/noinfopath-scheduler.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/noinfopath-scheduler/)

## Overview

JavaScript alternative to scheduling tasks with CRON syntax.  Instead uses moment duration syntax to define events. Also support specifying specific times of day.

## Installation

	npm install noinfopath-scheduler --save

## Usage

For more details see the [documentation] (https://github.com/noInfoPath/noinfopath-scheduler/blob/master/documentation.md) page.

```JavaScript

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
		"fn": function {}
	},
	intervalTask = {
		"job": {
			"name": "My Task that does something else",
			"schedule": {
				"interval": "h",
				"duration": "4"
			}
		},
		"fn": function {}
	};

scheduler.addSchedule(alarmTask);

scheduler.addSchedule(intervalTask);

scheduler.start();

```
