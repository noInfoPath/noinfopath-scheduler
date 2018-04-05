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

