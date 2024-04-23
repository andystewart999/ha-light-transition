This node provides a light transition service within Home Assistant for lights that don't
have a built-in `transition` capability.  It does this by sending multiple `light.turn_on` 
messages in a loop through the second output, calculating the appropiate brightness as it goes.

Once the transition is complete or is cancelled, the original message will be sent through 
the first output.

When adding this node to your flow you must also add a `call service` node to the second output, with the specific
configuration detailed below.

# Input Message to start a transition

The node expects an input `msg` which contains the following to start a light transition:

+ `msg.topic` specifies the target light or light group - this is the only mandated property
+ `msg.brightness_start` and `msg.brightness_end` integers, between 0 and 255 - if not provided, 0 and 255 are 
assumed
+ `msg.transition_time` tells the node how long to take to make the transition between the defined brightnesses,
in seconds - if not provided, it defaults to 60

Note: if `msg.brightness_end` is 0 the target light(s) will have `light.turn_off` sent to them at the end of the transition

# Other control messages

There are also two other control messages which the  node will accept:

+ a `msg.payload` of `cancel` will immediately stop the transition wherever it is
+ a `msg.payload` of `finish` will immediately set the target light(s) to the `msg.brightness_end` value, effectively jumping to the end of the transition

# Home Assistant note
The original release of this node contained the Home Assistant `call service` node within it.  This meant that it didn't work for anyone other than me
as Node Red doesn't appear to support importing your own Home Assistant configuration node when adding a subflow-derived module to your flows.

That is the reason why this node requires you to attach a `call service` node to the second output with this specific configuration:

+ domain: `{{call_service_domain}}`
+ service: `{{call_service_service}}`
+ entityId: `{{call_service_entity}}`
+ data: `call_service_data`
+ dataType: `jsonata`

Or you can import this flow JSON:
```
[{"id":"032e33ef3d45e13d","type":"api-call-service","z":"c04e9d3d.431e8","name":"Set light state","server":"58215890.7c8288","version":5,"debugenabled":false,"domain":"{{call_service_domain}}","service":"{{call_service_service}}","areaId":[],"deviceId":[],"entityId":["{{call_service_entity}}"],"data":"call_service_data","dataType":"jsonata","mergeContext":"","mustacheAltTags":false,"outputProperties":[],"queue":"none","x":1490,"y":600,"wires":[[]]}]
```
