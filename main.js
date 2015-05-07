//Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Worker1' );
var harvester = require('harvester');

for(var name in Game.creeps) {
  var creep = Game.creeps[name];
  harvester(creep);
}


//Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Worker1' );
//var worker1 = Game.creeps.Worker1;

var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);

for (var name in Game.creeps) {
  var curr_source = getClosestSource(Game.creeps[name].pos, sources);
  if (Game.creeps[name].energy < Game.creeps[name].energyCapacity) {
    Game.creeps[name].moveTo(curr_source);
    Game.creeps[name].harvest(curr_source);
  } else {
    Game.creeps[name].moveTo(Game.spawns.Spawn1.pos);
    Game.creeps[name].transferEnergy(Game.spawns.Spawn1);
  }
}

function getClosestSource(from_pos, sources) {
  var dists = [sources.length];
  for (var i = 0; i < sources.length; i++) {
    dists[i] = dist(from_pos, sources[i].pos);
  }
  var target = sources[dists.indexOf(minOfArray(dists))];
  //console.log(minOfArray(dists));
  return target;
}

function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    min = Math.min(submin, min);
  }

  return min;
}

function dist(a, b) {
  return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
}

// Memory.creeps.Worker1.role = 'harvester';
// Memory.creeps.Worker2.role = 'harvester';
// Memory.creeps.Builder1.role = 'builder';