### NoCronJob

Contructor function exported by no-cron-task.js. Creates an object that represents a task that is scheduled to run at regular intervals(as opposed to a specific day/time).
This function is called by the NoCron module to create new tasks and add them to the scheduler, users are not meant to use this constructor to create task objects directly.

**Parameters**
|Name|Type|Description|
|name|String|The name that will be used to refer to the task represented by the instance of the NoCronJob object|
|schedule|Object||
**Returns**

Type: Promise <Object>

Returns a promise that resolves an object containing a list of booleans that indicate whether monitoring is disabled for each target
 {
     "fan": true,
     "signal": true,
     "lamp": true,
     "screen": true,
     "temperature": true
 }

### properties

Contructor function exported by no-cron-task.js. Creates an object that represents a task that is scheduled to run at regular intervals(as opposed to a specific day/time).

**Parameters**
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

Called on each 'tick' of the task runner. Checks if this task is due to run yet, if so it executes _jobFn() and resets its timer, if not(or if it is a parallel task) it sets skipped to true

**Parameters**
None

**Returns**
None

