/**************** 
 * Facetag Test *
 ****************/

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color('black'),
  units: 'height',
  waitBlanking: true
});

// store info about the experiment session:
let expName = 'facetag';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// Start code blocks for 'Before Experiment'
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(instructionsRoutineBegin());
flowScheduler.add(instructionsRoutineEachFrame());
flowScheduler.add(instructionsRoutineEnd());
const tag_trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(tag_trialsLoopBegin, tag_trialsLoopScheduler);
flowScheduler.add(tag_trialsLoopScheduler);
flowScheduler.add(tag_trialsLoopEnd);
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'resources/instructions.jpg', 'path': 'resources/instructions.jpg'},
    {'name': 'resources/tag_scale.js', 'path': 'resources/tag_scale.js'},
    {'name': 'resources/tag_scale.html', 'path': 'resources/tag_scale.html'},
    {'name': 'resources/main_loop.csv', 'path': 'resources/main_loop.csv'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2020.2.10';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}


var instructionsClock;
var insIm;
var instAdvance;
var faceTagClock;
var null_txt;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "instructions"
  instructionsClock = new util.Clock();
  insIm = new visual.ImageStim({
    win : psychoJS.window,
    name : 'insIm', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [0, 0], size : [1.3, 0.7],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : 0.0 
  });
  instAdvance = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "faceTag"
  faceTagClock = new util.Clock();
  null_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'null_txt',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Exposes PsychoJS's addData for use in HTML pages
  window.addData = function(key, value) {
      psychoJS.experiment.addData(key, value);
  }
  
  // Adds an iframe on top of the PsychoJS canvas. Use src to specify an HTML page
  window.startHTML = (src) => {
    $('body').append('<iframe id="iframe" src="' + src +'" style="width: 100%; height: 100%; position:absolute;z-index:1;top:0;left:0;border:0;"></iframe>');    
    window.finishedHTML = false;
  };
  
  // Removes the iframe again
  window.finishHTML = () => {
    $('#iframe').remove();
    window.finishedHTML = true;
  };
  
  // Note that you can use window.finishRoutine to check if the HTML page has completed
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var _instAdvance_allKeys;
var instructionsComponents;
function instructionsRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'instructions'-------
    t = 0;
    instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    insIm.setImage('resources/instructions.jpg');
    instAdvance.keys = undefined;
    instAdvance.rt = undefined;
    _instAdvance_allKeys = [];
    // keep track of which components have finished
    instructionsComponents = [];
    instructionsComponents.push(insIm);
    instructionsComponents.push(instAdvance);
    
    instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function instructionsRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'instructions'-------
    // get current time
    t = instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *insIm* updates
    if (t >= 0.0 && insIm.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      insIm.tStart = t;  // (not accounting for frame time here)
      insIm.frameNStart = frameN;  // exact frame index
      
      insIm.setAutoDraw(true);
    }

    
    // *instAdvance* updates
    if (t >= 0.0 && instAdvance.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instAdvance.tStart = t;  // (not accounting for frame time here)
      instAdvance.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { instAdvance.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { instAdvance.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { instAdvance.clearEvents(); });
    }

    if (instAdvance.status === PsychoJS.Status.STARTED) {
      let theseKeys = instAdvance.getKeys({keyList: ['space'], waitRelease: false});
      _instAdvance_allKeys = _instAdvance_allKeys.concat(theseKeys);
      if (_instAdvance_allKeys.length > 0) {
        instAdvance.keys = _instAdvance_allKeys[_instAdvance_allKeys.length - 1].name;  // just the last key pressed
        instAdvance.rt = _instAdvance_allKeys[_instAdvance_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    instructionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instructionsRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'instructions'-------
    instructionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('instAdvance.keys', instAdvance.keys);
    if (typeof instAdvance.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('instAdvance.rt', instAdvance.rt);
        routineTimer.reset();
        }
    
    instAdvance.stop();
    // the Routine "instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var tag_trials;
var currentLoop;
function tag_trialsLoopBegin(tag_trialsLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  tag_trials = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.RANDOM,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'resources/main_loop.csv',
    seed: undefined, name: 'tag_trials'
  });
  psychoJS.experiment.addLoop(tag_trials); // add the loop to the experiment
  currentLoop = tag_trials;  // we're now the current loop

  // Schedule all the trials in the trialList:
  tag_trials.forEach(function() {
    const snapshot = tag_trials.getSnapshot();

    tag_trialsLoopScheduler.add(importConditions(snapshot));
    tag_trialsLoopScheduler.add(faceTagRoutineBegin(snapshot));
    tag_trialsLoopScheduler.add(faceTagRoutineEachFrame(snapshot));
    tag_trialsLoopScheduler.add(faceTagRoutineEnd(snapshot));
    tag_trialsLoopScheduler.add(endLoopIteration(tag_trialsLoopScheduler, snapshot));
  });

  return Scheduler.Event.NEXT;
}


function tag_trialsLoopEnd() {
  psychoJS.experiment.removeLoop(tag_trials);

  return Scheduler.Event.NEXT;
}


var faceTagComponents;
function faceTagRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'faceTag'-------
    t = 0;
    faceTagClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    
    window.id = id ;
    psychoJS.experiment.addData("name", name);
    window.startHTML('resources/tag_scale.html');
    // keep track of which components have finished
    faceTagComponents = [];
    faceTagComponents.push(null_txt);
    
    faceTagComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function faceTagRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'faceTag'-------
    // get current time
    t = faceTagClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *null_txt* updates
    if (t >= 0.0 && null_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      null_txt.tStart = t;  // (not accounting for frame time here)
      null_txt.frameNStart = frameN;  // exact frame index
      
      null_txt.setAutoDraw(true);
    }

    continueRoutine = !window.finishedHTML;
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    faceTagComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function faceTagRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'faceTag'-------
    faceTagComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "faceTag" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
