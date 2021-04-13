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
const fireshotfrag = extend(BasicBulletType, {
    speed: 10,
    damage: 1,
    hitEffect: Fx.ballfire,
    despawnEffect: Fx.ballfire,
    lifetime: 2.4,
    keepVelocity: true,
    pierce: false,
    status: napalm,
    statusDuration: 1800
    bulletWidth: 1,
    bulletHeight: 2,
    backColor: Color.valueOf("fc7b03"),
    frontColor: Color.valueOf("ffffef"),
});

const fireshot = extend(BasicBulletType, {
    damage: 45,
    height: 12,
    width: 6,
    speed: 10,
    lifetime: 25.6,
    ammoMultiplier: 2,
    reloadMultiplier: 1,
    smokeEffect: Fx.shootBigSmoke,
    backColor: Color.valueOf("fc7b03"),
    frontColor: Color.valueOf("ffffef"),
    splashDamageRadius: 36,
    splashDamage: 25,
    keepVelocity: true,
    pierce: false,
    hitEffect: Fx.flakExplosionBig,
    despawnEffect: Fx.flakExplosionBig,
    status: napalm,
    statusDuration: 1800,
    fragBullets: 12,
    fragBullet: fireshotfrag,
});

const baseplate = extendContent(ItemTurret, "baseplate", {
    reloadTime: 11,
    shootShake: 2,
    range: 256,
    recoilAmount: 3,
    spread: 0,
    shootCone: 30,
    size: 3,
    health: 960,
    shots: 1,
    shootSound: Sounds.bang,
    ammoUseEffect: Fx.casing3,
    rotateSpeed: 10,
    targetAir: true,
    targetGround: true,
    ammo(
        Items.pyratite, fireshot, 
    ),
});

