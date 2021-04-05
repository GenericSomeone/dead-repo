const refresh = require("libraries/refresh")

//fang
const defense_rocket = extend(MissileBulletType, {});

defense_rocket.damage = 300
defense_rocket.buildingDamageMultiplier = 0;
defense_rocket.speed = 4;
defense_rocket.homingPower = 0.1;
defense_rocket.homingRange = 80;
defense_rocket.lifetime = 120;
defense_rocket.width = 12;
defense_rocket.height = 40;
defense_rocket.keepVelocity = true;
defense_rocket.trailChance = 0.5;
defense_rocket.trailColor = Color.valueOf("40b2fb")
defense_rocket.hitEffect = Fx.flakExplosion;
defense_rocket.despawnEffect = Fx.flakExplosion;
defense_rocket.hitSound = Sounds.explosionbig;
defense_rocket.backColor = Color.valueOf("40b2fb");
defense_rocket.shootSound = Sounds.missile;
defense_rocket.collidesTiles = false;

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
const rocket_pod = extend(MissileBulletType, {});

rocket_pod.damage = 42
rocket_pod.splashDamage = 45;
rocket_pod.splashDamageRadius = 34.4;
rocket_pod.speed = 4;
rocket_pod.homingPower = 0.1;
rocket_pod.homingRange = 80;
rocket_pod.lifetime = 90;
rocket_pod.width = 8;
rocket_pod.height = 8;
rocket_pod.keepVelocity = true;
rocket_pod.trailChance = 0.5;
rocket_pod.hitEffect = Fx.flakExplosion;
rocket_pod.despawnEffect = Fx.flakExplosion;
rocket_pod.hitSound = Sounds.explosionbig;
rocket_pod.shootSound = Sounds.missile;

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
	update(b){
		Units.nearbyEnemies(b.team, b.x - 4, b.y - 4, 8, 8, u =>{
			u.health -= splinter.damage;
        	});
		this.super$update;
        },
});

splinter.damage = 1;
splinter.speed = 4;
splinter.pierce = true;
splinter.lifetime = 60;
splinter.width = 4;
splinter.height = 16;
splinter.keepVelocity = true;
splinter.hitEffect = Fx.unitDrop;
splinter.despawnEffect = Fx.unitDrop;
splinter.hitSound = Sounds.none;
splinter.frontColor = Color.valueOf("6e7080");
splinter.backColor = Color.valueOf("6e7080");
splinter.shootSound = loadSound("splinter");

const rocket_pod_ap = extend(MissileBulletType, {
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

rocket_pod_ap.damage = 42;
rocket_pod_ap.splashDamage = 45;
rocket_pod_ap.splashDamageRadius = 34.4;
rocket_pod_ap.speed = 4;
rocket_pod_ap.homingPower = 0.1;
rocket_pod_ap.homingRange = 80;
rocket_pod_ap.lifetime = 90;
rocket_pod_ap.width = 8;
rocket_pod_ap.height = 8;
rocket_pod_ap.keepVelocity = true;
rocket_pod_ap.trailChance = 0.5;
rocket_pod_ap.trailColor = Color.valueOf("272727")
rocket_pod_ap.hitEffect = Fx.flakExplosion;
rocket_pod_ap.despawnEffect = Fx.flakExplosion;
rocket_pod_ap.hitSound = Sounds.explosionbig;
rocket_pod_ap.frontColor = Color.valueOf("272727");
rocket_pod_ap.backColor = Color.valueOf("272727");
rocket_pod_ap.shootSound = Sounds.missile;

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
