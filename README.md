This node provides a light transition service within Home Assistant for lights that don't have a built-in `transition` capability.  It does this by sending multiple `light.turn_on` events in a loop, calculating the appropiate brightness as it goes.

Once the transition is complete or is cancelled, the original message will be sent through the first output.

# Input Message to start a transition

The node expects an input `msg` which contains the following to start a light transition:

+ a `msg.topic` which specifies the target light or light group - this is the only mandated property
+ `msg.brightness_start` and `msg.brightness_end` integers, between 0 and 255 - if not provided, 0 and 255 are assumed
+ `msg.transition_time` tells the node how long to take to make the transition between the defined brightnesses, in seconds - if not provided, it defaults to 60

Note: if `msg.brightness_end` is 0 the target light(s) will have the `turn_off` call sent to them at the end of the transition

# Other Control Messages

There are also two other control messages which the  node will accept:

+ a `msg.payload` of `cancel` will immediately stop the transition wherever it is
+ a `msg.payload` of `finish` will immediately set the target light(s) to the `msg.brightness_end` value

# Configuration Settings

The node also offers several menu options which can be adjusted:

+ a setting to enable/disable the progress status being shown on the node status
+ a setting which when enabled sends a debug message every tick to the second output

# Debug Messages
The node can send a debug message to the second output on several events, if enabled:

+ after every 'tick', which is defined by the transition time
+ when the transition has completed
+ if the transition is cancelled or is forced to finish early

The debug message includes properties containing the transition start time, progress percentage and the target light(s)
