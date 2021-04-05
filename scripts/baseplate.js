//custom color variable
const gel = Color.valueOf("ffe87f");


//custom status effect
const napalm = new StatusEffect("napalm");
napalm.damageMultiplier = 1
napalm.speedMultiplier = 0.48;
napalm.color = gel;
napalm.damage = 1.36;
napalm.effect = Fx.ballfire;

//put frag bullet first
const fireshotfrag = extend(BasicBulletType, {});

//frag stats
fireshotfrag.speed = 10;
fireshotfrag.damage = 1;
fireshotfrag.hitEffect = Fx.ballfire;
fireshotfrag.despawnEffect = Fx.ballfire;
fireshotfrag.lifetime = 2.4;
fireshotfrag.keepVelocity = true;
fireshotfrag.pierce = false;
fireshotfrag.status = napalm;
fireshotfrag.statusDuration = 1800
fireshotfrag.bulletWidth = 1;
fireshotfrag.bulletHeight = 2;
fireshotfrag.backColor = Color.valueOf("fc7b03");
fireshotfrag.frontColor = Color.valueOf("ffffef");

const fireshot = extend(BasicBulletType, {});
fireshot.damage = 45;
fireshot.height = 12;
fireshot.width = 6;
fireshot.speed = 10;
fireshot.lifetime = 25.6;
fireshot.ammoMultiplier = 2;
fireshot.reloadMultiplier = 1;
fireshot.smokeEffect = Fx.shootBigSmoke;
fireshot.backColor = Color.valueOf("fc7b03");
fireshot.frontColor = Color.valueOf("ffffef");
fireshot.splashDamageRadius = 36;
fireshot.splashDamage = 25;
fireshot.keepVelocity = true;
fireshot.pierce = false;
fireshot.hitEffect = Fx.flakExplosionBig;
fireshot.despawnEffect = Fx.flakExplosionBig;
fireshot.status = napalm;
fireshot.statusDuration = 1800;
fireshot.fragBullets = 12;
fireshot.fragBullet = fireshotfrag;


const baseplate = extendContent(ItemTurret, "baseplate", {});
baseplate.reloadTime = 11;
baseplate.shootShake = 2;
baseplate.range = 256;
baseplate.recoilAmount = 3;
baseplate.spread = 0;
baseplate.shootCone = 30;
baseplate.size = 3;
baseplate.health = 960;
baseplate.shots = 1;
baseplate.shootSound = Sounds.bang;
baseplate.ammoUseEffect = Fx.casing3;
baseplate.rotateSpeed = 10;
baseplate.targetAir = true;
baseplate.targetGround = true;
baseplate.ammo(
    Items.pyratite, fireshot, 
);

