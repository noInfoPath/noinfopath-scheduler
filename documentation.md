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

### NoCron

The actual task runner. Handles adding, removing, maintaining, and running no-cron and alarm tasks.

**Parameters**
|name|String|The name that will be used to refer to the task represented by the instance of the NoCronJob object|

**Returns**

Type: Promise <Object>
None

### addSchedule

adds a task to the NoCron task runner. Calls the constructor for an alarm or no-cron task to create a new task, and adds it to the task array so it will be checked on each 'tick'

**Parameters>**
|name|String|the name used to refer to the task|
|schedule|Object|an object containing information on when/how often to run the task|
|jobFn|function|The actual function to be called when the task is ran|
|isAlarm|boolean|a flag to determine whether the task to be created is an alarm task(true) or no-cron task(false)|

**Parameters<alternate #1>**
|name|object|an object containing the name and schedule information for a task|
|schedule|function|the function to be called when the task is ran|

**Parameters<alternate #2>**
|name|object|an object containing the name, schedule information, and callback function for a task|
**Returns**
Object - the newly created task object


### removeSchedule

removes a job from the task runner

**Parameters**
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

### _tick

calls run on every task, which will run all tasks that are due to be executed. resets _timeout to call this function again in 1000s so that it can continue periodically checking all tasks and running them

**Parameters**
None

**Returns**
None

### start

tells _timeout to call _tick in 1 second, which will begin a loop where tick is called every second, effectively starting the task runner

**Parameters**
None

**Returns**
None

### stop

clears _timeout, preventing _tick from being called again and stopping the task runner.

**Parameters**
None

**Returns**
None

### debug

Property that enables or disables debug output.

**Returns**
bool

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

