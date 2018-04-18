## NoCron

The actual task runner. Handles adding, removing, maintaining, and running no-cron and alarm tasks.

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|name|String|The name that will be used to refer to the task represented by the instance of the NoCronJob object|

**Returns**

Type: Promise <Object>
None

### addSchedule

adds a task to the NoCron task runner. Calls the constructor for an alarm or no-cron task to create a new task, and adds it to the task array so it will be checked on each 'tick'

**Parameters>**

|Name|Type|Description|
|----|----|-----------|
|name|String|the name used to refer to the task|
|schedule|Object|an object containing information on when/how often to run the task|
|jobFn|function|The actual function to be called when the task is ran|
|isAlarm|boolean|a flag to determine whether the task to be created is an alarm task(true) or no-cron task(false)|

**Parameters<alternate #1>**

|Name|Type|Description|
|----|----|-----------|
|name|object|an object containing the name and schedule information for a task|
|schedule|function|the function to be called when the task is ran|

**Parameters<alternate #2>**

|Name|Type|Description|
|----|----|-----------|
|name|object|an object containing the name, schedule information, and callback function for a task|
**Returns**
Object - the newly created task object


### removeSchedule

removes a job from the task runner

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|name|string|the name of the job to be removed|

**Returns**

Object - The removed task object

### removeAllSchedules

removes all jobs from the task runner

**Parameters**
None

**Returns**
None

### getSchedules

returns the array of tasks currently in the task runner

**Parameters**
None

**Returns**
Array - the array of all tasks currently scheduled


### start

Starts the scheduler. It check for task/jobs every second by default.
Schedule resolution is to the minute when using alarm tasks.

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|resolution|Integer|(Optional) The number of milliseconds to wait between checks for running tasks|

**Returns**
None

### stop

Stopping the scheduler from running. No scheduled tasks/jobs will be run.

**Parameters**
None

**Returns**
None

### debug

Property that enables or disables debug output.

**Returns**
bool

## NoCronJob

Creates an object that represents a task that is scheduled to run at regular intervals (as opposed to a specific day/time).
This function is called by the NoCron module to create new tasks and add them to the scheduler, users are not meant to use this constructor to create task objects directly.

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|name|String|The name that will be used to refer to the task represented by the instance of the NoCronJob object|
|schedule|Object|TODO: Document this.|

**Returns**

Type: Promise <Object>

Returns a promise that resolves an object containing a list of booleans that indicate whether monitoring is disabled for each target

### properties

Contructor function exported by no-cron-task.js. Creates an object that represents a task that is scheduled to run at regular intervals(as opposed to a specific day/time).

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|obj|Object|the object whose properties will be copied|

**Returns**
Type: Object

Returns an object with the same properties and values as the object passed in as a parameter


### reset

resets the NoCronJob's properties to defaults, creates them and sets their values to default if they don't already exist.

**Parameters**
None

**Returns**
None

### run

Called on each 'tick' of the task runner. Checks if this task is due to run yet, if so it executes resets its timer, if not (or if it is a parallel task) it sets skipped to true

**Parameters**
None

**Returns**
None
