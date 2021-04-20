const refresh = require("libraries/refresh")

//plover
const plover = extend(UnitType, "plover", {
	flying: true,
	hitSize: 8,
	health: 50,
	range: 0,
	itemCapacity: 70,
	speed: 4,
	rotateSpeed: 6,
	rotateShooting: false,
	accel: 0.08,
	drag: 0.03,
});
plover.constructor = () => extend(UnitEntity, {});



//bee
const bee = extend(UnitType, "bee", {
	flying: true,
	hitSize: 12,
	health: 100,
	range: 0,
	itemCapacity: 120,
	speed: 3,
	rotateSpeed: 6,
	rotateShooting: false,
	accel: 0.1,
	drag: 0.03,
});
bee.constructor = () => extend(PayloadUnit, {});



//raven
const shieldbreaker_frag = extend(LaserBoltBulletType, {
	height: 8,
	lifetime: 8,
	speed: 5,
	damage: Number.MAX_VALUE,
	backColor: Pal.heal,
	frontColor: Pal.missileYellow,
	collidesTiles: false,
	collidesAir: false,
	collidesGround: false,
	hitSound: Sounds.none,
});

const shieldbreaker = extend(LaserBoltBulletType, {
	height: 8,
	lifetime: 40,
	speed: 5,
	damage: 0,
	backColor: Pal.heal,
	frontColor: Pal.missileYellow,
	collidesTiles: true,
	collidesAir: true,
	collidesGround: true,
	hitSound: Sounds.none,

	despawned(b){
		if(b.absorbed){
			shieldbreaker_frag.create(b.owner, b.team, b.x, b.y, b.rotation());
    			this.shield_sound.at(b.x, b.y);
		}
		this.super$despawned(b);
	},
});
shieldbreaker.shield_sound = Sounds.corexplode;

const shield_buster = extend(Weapon, "unbalance-mod-rebirth-shield_buster", {
	reload: 15,
	x: 8,
	y: -8,
	shootY: 1,
	recoil: 1,
	rotate: true,
	shootSound: Sounds.lasershoot,
	shootCone: 10,
	bullet: shieldbreaker,
});

const raven = extend(UnitType, "raven", {
	flying: true,
	hitSize: 16,
	health: 350,
	armor: 3,
	range: 200,
	itemCapacity: 120,
	speed: 3,
	rotateSpeed: 6,
	rotateShooting: false,
	accel: 0.1,
	drag: 0.03,
	buildSpeed: 2,
	mineSpeed: 8,
        mineTier: 2,
	engineOffset: 8,
	engineSize: 4.5,
});
raven.constructor = () => extend(PayloadUnit, {
	classId: () => raven.classId
});
refresh(raven);
raven.weapons.addAll(shield_buster);



//hornet
const pod = extend(BasicBulletType, {
	height: 54,
	width: 36,
	lifetime: 60,
	speed: 4,
	damage: 0,
	sprite: "missile",
	backColor: Color.valueOf("6e7080"),
	frontColor: Color.valueOf("b0bac0"),
	collidesTiles: false,
	collidesAir: false,
	collidesGround: false,
	absorbable: false,
	hitSound: Sounds.none,

	update(b){
		if(b.timer.get(1, 5)){
  			var new_unit = Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-flock").spawn(b.team, b.x, b.y);
			new_unit.rotation = Math.random() * 360;

			var new_unit_2 = Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-stampede").spawn(b.team, b.x, b.y);
			new_unit_2.rotation = Math.random() * 360;
		}
	},
});
pod.scaler = 1

const decoy_cannon = extend(Weapon, "unbalance-mod-rebirth-decoy_cannon", {
	reload: 45,
	x: 0,
	y: 0,
	shootY: 1,
	recoil: 1,
	rotate: true,
	mirror: false,
	shootSound: Sounds.missile,
	shootCone: 10,
	bullet: pod,
});

const hornet = extend(UnitType, "hornet", {
	flying: true,
	hitSize: 28,
	health: 5500,
	armor: 7,
	range: 240,
	itemCapacity: 160,
	speed: 1,
	rotateSpeed: 3,
	rotateShooting: false,
	accel: 0.1,
	drag: 0.02,
	buildSpeed: 2.5,
	mineSpeed: 8,
        mineTier: 2,
	engineOffset: 12,
	engineSize: 8,
});
hornet.constructor = () => extend(PayloadUnit, {
	classId: () => hornet.classId
});
refresh(hornet);
hornet.weapons.addAll(decoy_cannon);



//egret
const blast_wave = new Effect(15, e => {
	Draw.color(Color.white, Pal.lancerLaser, e.fin());
	Lines.stroke(8 * e.fout());
        Lines.circle(e.x, e.y, (e.fin() * 480));
});

const hooked = new StatusEffect("hooked");
hooked.speedMultiplier = 0;
hooked.reloadMultiplier = 1;
hooked.effect = Fx.none;

const hook_chain = new Effect(2, (e) => {
	Draw.color(Color.gray);
   	Fill.circle(e.x, e.y, 6);
});

const hook_head = new Effect(2, (e) => {
	Draw.color(Color.gray);
   	Draw.rect(this.frontRegion = Core.atlas.find("unbalance-mod-rebirth-hook"), e.x, e.y, e.rotation);
});

const hook = extend(PointBulletType, {
	height: 54,
	width: 36,
	damage: 0,
	length: 320,
	speed: 160,
	lifetime: 2,
	sprite: "unbalance-mod-rebirth-hook",
	backColor: Color.valueOf("6e7080"),
	frontColor: Color.valueOf("b0bac0"),
	collidesTiles: false,
	collidesAir: false,
	collidesGround: false,
	hitSound: Sounds.none,
	trailEffect: hook_chain,
	shootEffect: Fx.none,
	smokeEffect: Fx.none,
	hitEffect: Fx.none,

	despawned(b){
		hook_head.at(b.x, b.y, b.rotation());
		Units.nearby(b.x - 16, b.y - 16, 32, 32, cons(u =>{

			let floor_tile = Vars.world.tileWorld(Mathf.floor(b.x), Mathf.floor(b.y));

			//this long if statement verifies if the unit can exist on the target tile so that units cannot be instakilled by being dragged onto environmental tiles
			if(
			 (floor_tile != null && u.flying) || //flying
			 (floor_tile != null && floor_tile.floor().isLiquid && u instanceof WaterMovec && !floor_tile.solid() ) || //naval
			 (floor_tile != null && u instanceof Mechc && !floor_tile.solid() ) || //mech
			 (floor_tile != null && u.isGrounded() && u instanceof Legsc && ( ( floor_tile.solid() && floor_tile.synthetic() ) || !floor_tile.solid() ) ) // spider
			) {
				if (Mathf.dst(b.owner.x, b.owner.y, b.x, b.y) > ((u.hitSize + b.owner.hitSize) * 0.7) ) { //prevents hook from working if the unit is too close so that the unit cannot teleport itself or use units to move itself
					u.x = b.x;
					u.y = b.y;
					if (u.team != b.team){
						u.apply(hooked, 2); // only applies status effect on enemy units
					}
				}
			}
		}));
        },
});

const pirate_hook = extend(Weapon, "unbalance-mod-rebirth-pirate_hook", {
	reload: 1,
	x: 0,
	y: 0,
	shootY: 27,
	recoil: 0,
	rotate: true,
	mirror: false,
	shootSound: Sounds.none,
	shootCone: 0,
	bullet: hook,
	shootEffect: Fx.none,
});

//we need to put our custom sounds here and store them to variables for later use, as they do not correspond to any of the default fields
let charge = ["placeholder"];
for(let i = 1; i <= 9; i++){
    charge.push(loadSound("charge_" + i));
}

const egret = extendContent(UnitType, "egret", {
	flying: true,
	hitSize: 56,
	health: 22000,
	armor: 15,
	range: 500,
	itemCapacity: 240,
	speed: 0.9,
	rotateSpeed: 2,
	rotateShooting: false,
	accel: 0.1,
	drag: 0.01,
	buildSpeed: 3,
	mineSpeed: 8,
        mineTier: 2,
	engineOffset: 46,
	engineSize: 6,
	lowAltitude: true,
});
egret.constructor = () => extend(PayloadUnit, {
	update(){
		this.super$update();
		
		//a bunch of custom fields
		if (this.custom_timer == null){
			this.custom_timer = 0;
		} else {
			this.custom_timer += 1;
		}

		if (this.blast_wave_charge == null){
			this.blast_wave_charge = 0;
		}

		if (this.blast_wave_requirement == null){
			this.blast_wave_requirement = 6000;
		}

		if (this.blast_wave_charge >= this.blast_wave_requirement) {
			let blast_wave_range = 360;
			Units.nearbyEnemies(this.team, this.x - blast_wave_range, this.y - blast_wave_range, blast_wave_range * 2, blast_wave_range * 2, u =>{
				const blast_line = new Effect(30, e => {
						Draw.color(Color.white, Pal.lancerLaser, e.fin());
						Lines.stroke(6 * e.fout());
      						Lines.line(e.x, e.y, u.x, u.y);
				});
				blast_line.at(this.x, this.y, u.x, u.y);
				
				const blast_wave_hit = new Effect(30, (e) => {
					Draw.color(Pal.lancerLaser);
   					Fill.circle(e.x, e.y, e.fout() * 24);
				});
				blast_wave_hit.at(u.x, u.y);
				u.health -= 400;
			});
			blast_wave.at(this.x, this.y);
			Sounds.laserblast.at(this.x, this.y);
			this.blast_wave_charge = 0;	
		}

		if (this.custom_timer >= 15) {
			let blast_wave_charge_range = 160;
			Units.nearbyEnemies(this.team, this.x - blast_wave_charge_range, this.y - blast_wave_charge_range, 2 * blast_wave_charge_range, 2 * blast_wave_charge_range, u =>{
				//this is done to prevent charging from dead units
				if (u.health > 0){
					let target_distance = Mathf.dst(this.x, this.y, u.x, u.y);
					let charge_increase = ((250 - target_distance) / 15);
					//this if statement limits the charge that a unit can provide if it gets too close
					if (charge_increase > 12) {
						charge_increase = 12;
					}
					u.health -= charge_increase;
					this.blast_wave_charge += charge_increase;
					//the effect is placed in here so that the coordinates of the unit can be obtained
					const charge_line = new Effect(10, e => {
						Draw.color(Color.valueOf("81d249"), Color.valueOf("68922c"), e.fin());
						Lines.stroke((this.blast_wave_requirement * e.fout() * charge_increase)/2000);
      						Lines.line(e.x, e.y, u.x, u.y);

						Draw.color(Color.white, Pal.lancerLaser, e.fin());
						Lines.stroke((this.blast_wave_charge * e.fout() * charge_increase)/2000);
      						Lines.line(e.x, e.y, u.x, u.y);
					});
					charge_line.at(this.x, this.y, u.x, u.y);
					if (this.blast_wave_charge < (this.blast_wave_requirement/9) ){
						charge[1].at(this.x, this.y);
					} else if (this.blast_wave_charge < (2 * (this.blast_wave_requirement/9) ) ) {
						charge[2].at(this.x, this.y);
					} else if (this.blast_wave_charge < (3 * (this.blast_wave_requirement/9) ) ) {
						charge[3].at(this.x, this.y);
					} else if (this.blast_wave_charge < (4 * (this.blast_wave_requirement/9) ) ) {
						charge[4].at(this.x, this.y);
					} else if (this.blast_wave_charge < (5 * (this.blast_wave_requirement/9) ) ) {
						charge[5].at(this.x, this.y);
					} else if (this.blast_wave_charge < (6 * (this.blast_wave_requirement/9) ) ) {
						charge[6].at(this.x, this.y);
					} else if (this.blast_wave_charge < (7 * (this.blast_wave_requirement/9) ) ) {
						charge[7].at(this.x, this.y);
					} else if (this.blast_wave_charge < (8 * (this.blast_wave_requirement/9) ) ) {
						charge[8].at(this.x, this.y);
					} else {
						charge[9].at(this.x, this.y);
					}
				}
			});
			this.custom_timer = 0;
		}
	},

	classId: () => egret.classId
});
refresh(egret);
egret.weapons.addAll(pirate_hook);
egret.defaultController = () => extend(DefenderAI, {});



//factory scripts
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-plover"),
 60 * 25,
 ItemStack.with(Items.silicon, 10)));

Blocks.additiveReconstructor.upgrades.add(Seq.with(Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-plover"), 
Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-bee")
).toArray(UnitType));

Blocks.multiplicativeReconstructor.upgrades.add(Seq.with(Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-bee"), 
Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-raven")
).toArray(UnitType));

Blocks.exponentialReconstructor.upgrades.add(Seq.with(Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-raven"), 
Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-hornet")
).toArray(UnitType));

Blocks.tetrativeReconstructor.upgrades.add(Seq.with(Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-hornet"), 
Vars.content.getByName(ContentType.unit, "unbalance-mod-rebirth-egret")
).toArray(UnitType));
