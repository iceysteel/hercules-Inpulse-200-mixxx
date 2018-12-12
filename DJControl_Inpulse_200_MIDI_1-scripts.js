function THEMAPPING() {}

THEMAPPING.scratching = [false, false];

// The button that enables/disables scratching
THEMAPPING.wheelTouch0 = function (channel, control, value, status) {

    if (value == 0x7F && !THEMAPPING.scratching[0]) { // catch only first touch
       var alpha = 1.0/8;
       var beta = alpha/32;
       engine.scratchEnable(1, 300, 33+1/3, alpha, beta);
       // Keep track of whether we're scratching on this virtual deck
       THEMAPPING.scratching[0] = true;

    }
    else {    //  button up
        engine.scratchDisable(1);
        THEMAPPING.scratching[0] = false;
    }

};
// The button that enables/disables scratching
THEMAPPING.wheelTouch1 = function (channel, control, value, status) {

    if (value == 0x7F && !THEMAPPING.scratching[1]) { // catch only first touch
       var alpha = 1.0/8;
       var beta = alpha/32;
       engine.scratchEnable(2, 300, 33+1/3, alpha, beta);
       // Keep track of whether we're scratching on this virtual deck
       THEMAPPING.scratching[1] = true;

    }
    else {    //  button up
        engine.scratchDisable(2);
        THEMAPPING.scratching[1] = false;
    }

};

 
THEMAPPING.wheelTurn0 = function (channel, control, value, status, group) {
    
	// See if we're on scratching.
	//if (THEMAPPING.scratching[0] == false )  return;
   
	var newValue;
	if (value-64 > 0) newValue = value-128; // 7F, 7E, 7D
	else newValue = value;

	if(!THEMAPPING.scratching[0]){
		engine.setValue(group, "jog", newValue)
	}

	engine.scratchTick(1,newValue);
};

THEMAPPING.wheelTurn1 = function (channel, control, value, status, group) {
    
	// See if we're on scratching.
	if (THEMAPPING.scratching[1] == false )  return;
   
	var newValue;
	if (value-64 > 0) newValue = value-128; // 7F, 7E, 7D
	else newValue = value;

	if(!THEMAPPING.scratching[1]){
		engine.setValue(group, "jog", newValue)
	}

	engine.scratchTick(2,newValue);
};