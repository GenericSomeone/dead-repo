const refresh = require("libraries/refresh")

//pollux
const fire_bomb = extend(BombBulletType, {
	damage: 0,
	splashDamage: 85,
	splashDamageRadius: 57.6,
	speed: 1,
	homingPower: 0,
	homingRange: 0,
	lifetime: 60,
	width: 16,
	height: 16,
	keepVelocity: true,
	hitEffect: Fx.flakExplosionBig,
	despawnEffect: Fx.flakExplosionBig,
	hitSound: Sounds.explosionbig,
	backColor: Color.valueOf("fc7b03"),
	shootSound: Sounds.bang,
	collidesTiles: true,
	collidesGround: true,
	collidesAir: false,
	incendChance: 1,
	incendAmount: 5,
	incendSpread: 5,
});


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
const frag_cluster = extend(BombBulletType, {
	damage: 0,
	splashDamage: 30,
	splashDamageRadius: 24,
	speed: 3,
	homingPower: 0,
	homingRange: 0,
	lifetime: 20,
	width: 8,
	height: 8,
	keepVelocity: true,
	hitEffect: Fx.flakExplosion,
	despawnEffect: Fx.flakExplosion,
	hitSound: Sounds.explosionbig,
	backColor: Color.valueOf("fc7b03"),
	shootSound: Sounds.bang,
	collidesTiles: true,
	collidesGround: true,
	collidesAir: false,
	incendChance: 1,
	incendAmount: 3,
	incendSpread: 3,
});


const fire_bomb_cluster = extend(BombBulletType, {
	damage: 0,
	splashDamage: 85,
	splashDamageRadius: 57.6,
	speed: 3,
	homingPower: 0,
	homingRange: 0,
	lifetime: 60,
	width: 16,
	height: 16,
	keepVelocity: true,
	hitEffect: Fx.flakExplosionBig,
	despawnEffect: Fx.flakExplosionBig,
	hitSound: Sounds.explosionbig,
	backColor: Color.valueOf("fc7b03"),
	shootSound: Sounds.bang,
	collidesTiles: true,
	collidesGround: true,
	collidesAir: false,
	incendChance: 1,
	incendAmount: 5,
	incendSpread: 5,
	fragBullet: frag_cluster,
	fragBullets: 8,
});


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


//we have both effects separate because both effects trigger at the time of impact regardless
const nuclear_bomb = extend(BombBulletType, {
	damage: 0,
	splashDamage: 7000,
	splashDamageRadius: 160,
	speed: 1,
	homingPower: 0,
	homingRange: 0,
	lifetime: 60,
	width: 24,
	height: 24,
	keepVelocity: true,
	hitEffect: mushroom_cloud,
	despawnEffect: explosion,
	hitSound: loadSound("atomic_bomb_LOUD"),
	backColor: Color.valueOf("6e7080"),
	shootSound: Sounds.bang,
	collidesTiles: true,
	collidesGround: true,
	collidesAir: false,
});


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
