module.exports = function (creep) {
  var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
  
  var curr_source = getClosestSource(creep.pos, sources);
  if (creep.energy < creep.energyCapacity) {
    creep.moveTo(curr_source);
    creep.harvest(curr_source);
  } else {
    creep.moveTo(Game.spawns.Spawn1.pos);
    creep.transferEnergy(Game.spawns.Spawn1);
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
}