﻿const refresh = require("libraries/refresh")

//pollux
const fire_bomb = extend(BombBulletType, {});

fire_bomb.damage = 0;
fire_bomb.splashDamage = 85;
fire_bomb.splashDamageRadius = 57.6;
fire_bomb.speed = 1;
fire_bomb.homingPower = 0;
fire_bomb.homingRange = 0;
fire_bomb.lifetime = 60;
fire_bomb.width = 16;
fire_bomb.height = 16;
//fire_bomb.trailEffect = Fx.fireSmoke;
fire_bomb.keepVelocity = true;
//fire_bomb.trailChance = 0.5;
//fire_bomb.trailColor = Color.valueOf("40b2fb")
fire_bomb.hitEffect = Fx.flakExplosionBig;
fire_bomb.despawnEffect = Fx.flakExplosionBig;
fire_bomb.hitSound = Sounds.explosionbig;
fire_bomb.backColor = Color.valueOf("fc7b03");
fire_bomb.shootSound = Sounds.bang;
fire_bomb.collidesTiles = true;
fire_bomb.collidesGround = true;
fire_bomb.collidesAir = false;
fire_bomb.incendChance = 1;
fire_bomb.incendAmount = 5;
fire_bomb.incendSpread = 5;


const pollux = extendContent(UnitType, "pollux", {});
pollux.constructor = () => extend(UnitEntity, {
	update(){
		if (this.armed_status != true){
			this.armed_status = false;
		}

		if (this.armed_status == true){
			fire_bomb.shootSound.at(this.x, this.y);
        		fire_bomb.create(this, this.team, this.x, this.y, this.rotation - 15 + Math.random() * 30, Math.random() + 1 );
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
	classId: () => pollux.classId

});
pollux.armed_status = false;
refresh(pollux);















//arcturus
const frag_cluster = extend(BombBulletType, {});

frag_cluster.damage = 0;
frag_cluster.splashDamage = 30;
frag_cluster.splashDamageRadius = 24;
frag_cluster.speed = 3;
frag_cluster.homingPower = 0;
frag_cluster.homingRange = 0;
frag_cluster.lifetime = 20;
frag_cluster.width = 8;
frag_cluster.height = 8;
//frag_cluster.trailEffect = Fx.fireSmoke;
frag_cluster.keepVelocity = true;
//frag_cluster.trailChance = 0.5;
//frag_cluster.trailColor = Color.valueOf("40b2fb")
frag_cluster.hitEffect = Fx.flakExplosion;
frag_cluster.despawnEffect = Fx.flakExplosion;
frag_cluster.hitSound = Sounds.explosionbig;
frag_cluster.backColor = Color.valueOf("fc7b03");
frag_cluster.shootSound = Sounds.bang;
frag_cluster.collidesTiles = true;
frag_cluster.collidesGround = true;
frag_cluster.collidesAir = false;
frag_cluster.incendChance = 1;
frag_cluster.incendAmount = 3;
frag_cluster.incendSpread = 3;


const fire_bomb_cluster = extend(BombBulletType, {});

fire_bomb_cluster.damage = 0;
fire_bomb_cluster.splashDamage = 85;
fire_bomb_cluster.splashDamageRadius = 57.6;
fire_bomb_cluster.speed = 3;
fire_bomb_cluster.homingPower = 0;
fire_bomb_cluster.homingRange = 0;
fire_bomb_cluster.lifetime = 60;
fire_bomb_cluster.width = 16;
fire_bomb_cluster.height = 16;
//fire_bomb_cluster.trailEffect = Fx.fireSmoke;
fire_bomb_cluster.keepVelocity = true;
//fire_bomb_cluster.trailChance = 0.5;
//fire_bomb_cluster.trailColor = Color.valueOf("40b2fb")
fire_bomb_cluster.hitEffect = Fx.flakExplosionBig;
fire_bomb_cluster.despawnEffect = Fx.flakExplosionBig;
fire_bomb_cluster.hitSound = Sounds.explosionbig;
fire_bomb_cluster.backColor = Color.valueOf("fc7b03");
fire_bomb_cluster.shootSound = Sounds.bang;
fire_bomb_cluster.collidesTiles = true;
fire_bomb_cluster.collidesGround = true;
fire_bomb_cluster.collidesAir = false;
fire_bomb_cluster.incendChance = 1;
fire_bomb_cluster.incendAmount = 5;
fire_bomb_cluster.incendSpread = 5;
fire_bomb_cluster.fragBullet = frag_cluster;
fire_bomb_cluster.fragBullets = 8;


const arcturus = extendContent(UnitType, "arcturus", {});
arcturus.constructor = () => extend(UnitEntity, {
	update(){
		if (this.armed_status != true){
			this.armed_status = false;
		}

		if (this.armed_status == true){
			let shots = 8;
			var i;
			for (i = 0; i < shots; i++) {
  				fire_bomb_cluster.shootSound.at(this.x, this.y);
        			fire_bomb_cluster.create(this, this.team, this.x, this.y, this.rotation + (Math.random() * 360), (Math.random() * 1) );
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
	classId: () => arcturus.classId
});
arcturus.armed_status = false;
refresh(arcturus);













//aldebaran
const explosion = new Effect(30, e => {
        e.scaled(7, i => {
            Lines.stroke(3 * i.fout());
            Lines.circle(e.x, e.y, 3 + i.fin() * 160);
        });

	Draw.color(Color.gray);

        Angles.randLenVectors(e.id, 1600, 160 * e.finpow(), (x, y) => {
            Fill.circle(e.x + x, e.y + y, e.fout() * 9);
            Fill.circle(e.x + x / 2, e.y + y / 2, e.fout());
        });

	Draw.color(Color.red, Color.gray, e.fin());

        Angles.randLenVectors(e.id, 1200, 152 * e.finpow(), (x, y) => {
            Fill.circle(e.x + x, e.y + y, e.fout() * 7.5);
            Fill.circle(e.x + x / 2, e.y + y / 2, e.fout());
        });

	Draw.color(Pal.lightOrange, Color.gray, e.fin());

        Angles.randLenVectors(e.id, 800, 144 * e.finpow(), (x, y) => {
            Fill.circle(e.x + x, e.y + y, e.fout() * 6);
            Fill.circle(e.x + x / 2, e.y + y / 2, e.fout());
        });

	Draw.color(Color.yellow, Color.gray, e.fin());

        Angles.randLenVectors(e.id, 400, 136 * e.finpow(), (x, y) => {
            Fill.circle(e.x + x, e.y + y, e.fout() * 4.5);
            Fill.circle(e.x + x / 2, e.y + y / 2, e.fout());
        });

});

const mushroom_cloud = new Effect(600, e => {
        Draw.color(Color.gray);

        Angles.randLenVectors(e.id, 1200, 160 * e.finpow(), (x, y) => {
            Fill.circle(e.x + x, e.y + y, (e.fout() * 9));
        });

	Draw.color(Color.valueOf("969696"), Color.gray, e.fin());

        Angles.randLenVectors(e.id, 1200, 80 * e.finpow(), (x, y) => {
            Fill.circle(e.x + x, e.y + y, (e.fout() * 9));
        });

	Draw.color(Color.white);
	Lines.stroke(6 * e.fout());
        Lines.circle(e.x, e.y, (e.fin() * 320));
});


const nuclear_bomb = extend(BombBulletType, {});

nuclear_bomb.damage = 0;
nuclear_bomb.splashDamage = 7000;
nuclear_bomb.splashDamageRadius = 160;
nuclear_bomb.speed = 1;
nuclear_bomb.homingPower = 0;
nuclear_bomb.homingRange = 0;
nuclear_bomb.lifetime = 60;
nuclear_bomb.width = 24;
nuclear_bomb.height = 24;
//nuclear_bomb.trailEffect = Fx.fireSmoke;
nuclear_bomb.keepVelocity = true;
//nuclear_bomb.trailChance = 0.5;
//nuclear_bomb.trailColor = Color.valueOf("40b2fb")
nuclear_bomb.hitEffect = mushroom_cloud;
nuclear_bomb.despawnEffect = explosion;
nuclear_bomb.hitSound = loadSound("atomic_bomb_LOUD");
nuclear_bomb.backColor = Color.valueOf("6e7080");
nuclear_bomb.shootSound = Sounds.bang;
nuclear_bomb.collidesTiles = true;
nuclear_bomb.collidesGround = true;
nuclear_bomb.collidesAir = false;


const aldebaran = extendContent(UnitType, "aldebaran", {});
aldebaran.constructor = () => extend(UnitEntity, {
	update(){
		if (this.armed_status != true){
			this.armed_status = false;
		}

		if (this.armed_status == true){
			nuclear_bomb.shootSound.at(this.x, this.y);
        		nuclear_bomb.create(this, this.team, this.x, this.y, this.rotation - 15 + Math.random() * 30, Math.random() + 1 );
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
	classId: () => aldebaran.classId
});
aldebaran.armed_status = false;
refresh(aldebaran);