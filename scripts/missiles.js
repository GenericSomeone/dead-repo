const refresh = require("libraries/refresh")

//fang
const defense_rocket = extend(MissileBulletType, {
	damage: 300,
	speed: 4,
	homingPower: 0.1,
	homingRange: 80,
	lifetime: 120,
	width: 12,
	height: 40,
	keepVelocity: true,
	trailChance: 0.5,
	trailColor: Color.valueOf("40b2fb"),
	hitEffect: Fx.flakExplosion,
	despawnEffect: Fx.flakExplosion,
	hitSound: Sounds.explosionbig,
	backColor: Color.valueOf("40b2fb"),
	shootSound: Sounds.missile,
	collidesTiles: false,
});


const fang = extendContent(UnitType, "fang", {});
fang.constructor = () => extend(UnitEntity, {
	update(){
		if (this.armed_status != true){
			this.armed_status = false;
		}

		if (this.armed_status == true){
			defense_rocket.shootSound.at(this.x, this.y);
        		defense_rocket.create(this, this.team, this.x, this.y, this.rotation, 1 );
			this.remove();
		}
		this.super$update();
	},
	
	remove(){
		this.armed_status = true;
		this.super$remove();
	},

	damage(amount){
		if (this.armed_status != true) {
			this.super$damage(amount);
		}
	},
	classId: () => fang.classId
});
fang.armed_status = false;
refresh(fang);



//hive
const rocket_pod = extend(MissileBulletType, {
	damage: 42,
	splashDamage: 45,
	splashDamageRadius: 34.4,
	speed: 4,
	homingPower: 0.1,
	homingRange: 80,
	lifetime: 90,
	width: 8,
	height: 8,
	keepVelocity: true,
	trailChance: 0.5,
	hitEffect: Fx.flakExplosion,
	despawnEffect: Fx.flakExplosion,
	hitSound: Sounds.explosionbig,
	shootSound: Sounds.missile,
});


const hive = extendContent(UnitType, "hive", {});
hive.constructor = () => extend(UnitEntity, {
	update(){
		if (this.armed_status != true){
			this.armed_status = false;
		}

		if (this.armed_status == true){
			let shots = 25;
			var i;
			for (i = 0; i < shots; i++) {
  					rocket_pod.shootSound.at(this.x, this.y);
        				rocket_pod.create(this, this.team, this.x, this.y, this.rotation - 30 + (Math.random() * 60), 0.9 + (Math.random() * 0.2) );
			}
			this.remove();
		}
		this.super$update();
	},
	
	remove(){
		this.armed_status = true;
		this.super$remove();
	},

	damage(amount){
		if (this.armed_status != true) {
			this.super$damage(amount);
		}
	},
	classId: () => hive.classId
});
hive.armed_status = false;
refresh(hive);



//stinger
const splinter = extend(BasicBulletType, {
	damage: 1,
	speed: 4,
	pierce: true,
	lifetime: 60,
	width: 4,
	height: 16,
	keepVelocity: true,
	hitEffect: Fx.unitDrop,
	despawnEffect: Fx.unitDrop,
	hitSound: Sounds.none,
	frontColor: Color.valueOf("6e7080"),
	backColor: Color.valueOf("6e7080"),
	shootSound: loadSound("splinter"),
	
	update(b){
		Units.nearbyEnemies(b.team, b.x - 4, b.y - 4, 8, 8, u =>{
			u.health -= splinter.damage;
        	});
		this.super$update;
        },
});


const rocket_pod_ap = extend(MissileBulletType, {
	damage: 42,
	splashDamage: 45,
	splashDamageRadius: 34.4,
	speed: 4,
	homingPower: 0.1,
	homingRange: 80,
	lifetime: 90,
	width: 8,
	height: 8,
	keepVelocity: true,
	trailChance: 0.5,
	trailColor: Color.valueOf("272727"),
	hitEffect: Fx.flakExplosion,
	despawnEffect: Fx.flakExplosion,
	hitSound: Sounds.explosionbig,
	frontColor: Color.valueOf("272727"),
	backColor: Color.valueOf("272727"),
	shootSound: Sounds.missile,
	
	hit(b){
		Units.nearbyEnemies(b.team, b.x - 4, b.y - 4, 8, 8, u =>{
			let splinters = u.armor;
			
			if (u.armor > 100){
				splinters = 100;
				splinter.damage = u.armor/100;
				var i;
				for (i = 0; i < splinters; i++) {
  					splinter.shootSound.at(b.x, b.y);
					splinter.create(b.owner, b.team, b.x, b.y, b.rotation() - 30 + (Math.random() * 60), 0.9 + (Math.random() * 0.2));
				}	
		
			} else {
				splinter.damage = 1;
				var i;
				for (i = 0; i < splinters; i++) {
  					splinter.shootSound.at(b.x, b.y);
					splinter.create(b.owner, b.team, b.x, b.y, b.rotation() - 30 + (Math.random() * 60), 0.9 + (Math.random() * 0.2));
				}
			}
        	});
		this.super$hit;
        },

	despawn(b){
		Units.nearbyEnemies(b.team, b.x - 4, b.y - 4, 8, 8, u =>{
			let splinters = u.armor;
			
			if (u.armor > 100){
				splinters = 100;
				splinter.damage = u.armor/100;
				var i;
				for (i = 0; i < splinters; i++) {
  					splinter.shootSound.at(b.x, b.y);
					splinter.create(b.owner, b.team, b.x, b.y, b.rotation() - 30 + (Math.random() * 60), 0.9 + (Math.random() * 0.2));
				}	
		
			} else {
				splinter.damage = 1;
				var i;
				for (i = 0; i < splinters; i++) {
  					splinter.shootSound.at(b.x, b.y);
					splinter.create(b.owner, b.team, b.x, b.y, b.rotation() - 30 + (Math.random() * 60), 0.9 + (Math.random() * 0.2));
				}
			}
        	});
		this.super$despawn;
        },
});


const stinger = extendContent(UnitType, "stinger", {});
stinger.constructor = () => extend(UnitEntity, {
	update(){
		if (this.armed_status != true){
			this.armed_status = false;
		}

		if (this.armed_status == true){
			let shots = 25;
			var i;
			for (i = 0; i < shots; i++) {
  					rocket_pod_ap.shootSound.at(this.x, this.y);
        				rocket_pod_ap.create(this, this.team, this.x, this.y, this.rotation - 30 + (Math.random() * 60), 0.9 + (Math.random() * 0.2) );
			}
			this.remove();
		}
		this.super$update();
	},
	
	remove(){
		this.armed_status = true;
		this.super$remove();
	},

	damage(amount){
		if (this.armed_status != true) {
			this.super$damage(amount);
		}
	},
	classId: () => stinger.classId
});
stinger.armed_status = false;
refresh(stinger);
