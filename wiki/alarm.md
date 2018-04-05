### NoAlertJob

constructor function that creates objects of alarm-type tasks(tasks that are run at a certain day/time, as opposed to at regular intervals). The task runner uses this
function to create task objects, it is not meant to be used by users directly

**Parameters**
|name|string|the name used to refer to this task|
|schedule|object|an object containing information specifying when exactly to run this task|
|jobFn|function|the function that is called when this task is run|

**Returns**
None

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

called by the task runner on each 'tick' - checks if it is time for this task to be run yet, if so it executes the jobFn. if not(or if it is a parallel task),
it sets skipped to true.

**Parameters**
None

**Returns**
None

