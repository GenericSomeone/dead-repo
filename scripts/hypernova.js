const beam_trail = new Effect(20, (e) => {
	Draw.color(Pal.lancerLaser);
   	Fill.circle(e.x, e.y, e.fout() * 6);
});

const beam_hit = new Effect(20, (e) => {
	Draw.color(Pal.lancerLaser);
   	Fill.circle(e.x, e.y, e.fout() * 24);
});

const beam = extend(PointBulletType, {
	

	update(b){
            Units.nearbyEnemies(b.team, b.x, b.y, 24, 24, u =>{
		u.kill();
		Sounds.railgun.at(b.x, b.y)
            });
        },

	/*hit(b){
		let rad = 10;
        	Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            		if(!u.isDead && b.team != u.team) {
               		 	u.kill();
        		}
		}));
        },*/
});

beam.damage = 0;
beam.collidesAir = true;
beam.collidesGround = true;
beam.collidesTiles = false;
beam.trailEffect = beam_trail;
beam.hitEffect = beam_hit;
beam.despawnEffect = beam_hit;

const hypernova = extendContent(PowerTurret, "hypernova", {
	load(){
		this.baseRegion = Core.atlas.find("block-5");
		this.region = Core.atlas.find(this.name);
		this.super$load();
	},
});

hypernova.shootType = beam;
hypernova.reloadTime = 360;
hypernova.size = 5;
hypernova.inaccuracy = 0;
hypernova.targetAir = false;
hypernova.targetGround = false;
hypernova.range = Number.MAX_VALUE;
hypernova.shootSound = Sounds.bigshot;

hypernova.buildType = () => extend(PowerTurret.PowerTurretBuild, hypernova, {
	validateTarget(){
		if(this.isControlled() == true || this.logicControlled() == true){
        		return true;
        	}
	},
});