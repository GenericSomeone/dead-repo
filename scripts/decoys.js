const refresh = require("libraries/refresh")

//flock
const flock = extendContent(UnitType, "flock", {
	flying: true,
	hitSize: 8,
	health: Number.MAX_SAFE_INTEGER,
	range: 0,
	itemCapacity: 0,
	speed: 0,
	rotateSpeed: 0,
	rotateShooting: false,
	accel: 0,
	drag: 5,
	buildSpeed: 0,
	mineSpeed: 0,
        mineTier: 0,
	isCounted: false,
});
flock.constructor = () => extend(UnitEntity, {
	update(){
		this.super$update();
		if (this.internal_timer == null) {
			this.internal_timer = 0
		}

		this.internal_timer += 1;
		if (this.health < Number.MAX_SAFE_INTEGER || this.internal_timer > 180){
			this.health = 0;
		}
	},

	damage(amount){
		this.super$damage(this.health);
	},

	cap(){
        	return Infinity;
	},

	classId: () => flock.classId
});
flock.internal_timer = 0;
refresh(flock);



//stampede
const stampede = extendContent(UnitType, "stampede", {
	flying: false,
	hitSize: 8,
	health: Number.MAX_SAFE_INTEGER,
	range: 0,
	itemCapacity: 0,
	speed: 0,
	rotateSpeed: 0,
	rotateShooting: false,
	accel: 0,
	drag: 5,
	buildSpeed: 0,
	mineSpeed: 0,
        mineTier: 0,
	isCounted: false,
});
stampede.constructor = () => extend(UnitEntity, {
	update(){
		this.super$update();
		if (this.internal_timer == null) {
			this.internal_timer = 0
		}

		this.internal_timer += 1;
		if (this.health < Number.MAX_SAFE_INTEGER || this.internal_timer > 180){
			this.health = 0;
		}
	},

	damage(amount){
		this.super$damage(this.health);
	},

	cap(){
        	return Infinity;
	},

	classId: () => stampede.classId
});
stampede.internal_timer = 0;
refresh(stampede);
