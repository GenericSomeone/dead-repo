const tentacle = extend(SapBulletType, {
	sapStrength: 0,
	length: 240,
	width: 1,
	damage: 1,
	knockback: -10,
	lightColor: Color.valueOf("68922c"),
});

const seaweed = extendContent(PowerTurret, "seaweed", {
	shootType: tentacle,

	//bad spagetti code, don't steal	
	/*updateTile(){
		//retarget
		target = Units.closestEnemy(this.team, this.x, this.y, this.range, u => u.checkTarget(false, true));
		
		//look at target
		if(target != null && target.isGrounded() && target.type.canDrown){
			let dest = this.angleTo(target);
			this.rotation = Angles.moveToward(this.rotation, dest, this.rotateSpeed * this.delta());
			let lastX = target.x;
			let lastY = target.y;
			let strength = Mathf.lerpDelta(this.strength, 1, 0.1);

			if(Angles.within(this.rotation, dest, this.shootCone)){
				target.impulseNet(Tmp.v1.set(this).sub(target).limit((force + (1f - target.dst(this) / range) * scaledForce) * edelta() * timeScale));
                	},
	},*/
});

seaweed.buildType = () => extend(PowerTurret.PowerTurretBuild, seaweed, {
	findTarget(){
		let temporary_target = Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(false, true) && u.type.canDrown);
		if(temporary_target != null){
			this.target = temporary_target;
		}
        },
});