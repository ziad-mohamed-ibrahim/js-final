//menu
let gameStarted = false
let volumeCheck = document.getElementById("VolumeCheck")
let volumeCheck2 = document.getElementById("VolumeCheck2")
let volume = document.getElementById("slider")
let volume2 = document.getElementById("slider2")
let settingsToggle = 1

function quit(){
    
    window.close()
}


function soundvolcheck2(){
    
    volumeCheck2.innerText = volume2.value
}
document.getElementById("slider").addEventListener("input",soundvolcheck)
document.getElementById("slider2").addEventListener("input",soundvolcheck2)

soundvolcheck2()

function shake(intensity){
    let shakedObject = document.getElementById("title")
    shakedObject.style.transform =
    `translate(${Math.random() * intensity - intensity / 2}px,
    ${Math.random() * intensity - intensity / 2}px)`

}

setInterval(() => shake(3), 100);

function SettingsToggle(){
    let SettingsTab = document.getElementById("settingsToggle")
    if (settingsToggle === 0){
        settingsToggle = 1
        SettingsTab.style = "z-index: 6; display: flex;align-items: center; justify-content: center;"
    }
    else{settingsToggle = 0
        SettingsTab.style = "z-index: 0; display: none;"}
}
SettingsToggle()


let fullscreenToggle = 0
let toggle = document.getElementById("fullscreenToggle")
let spanToggle = document.getElementById("toggleSpan")
function fullscreen(){
    if(fullscreenToggle === 0){
     document.documentElement.requestFullscreen();
     fullscreenToggle = 1
     toggle.classList.replace("off", "on")
     spanToggle.classList.replace("off", "on")
    }
    else{
        document.exitFullscreen()
        toggle.classList.replace("on", "off")
        spanToggle.classList.replace("on", "off")
        fullscreenToggle = 0
    }
     
}
document.addEventListener("fullscreenchange",()=>{
    if(!document.fullscreenElement){
        toggle.classList.replace("on", "off")
        spanToggle.classList.replace("on", "off")
    }
})
let lava = document.getElementById("lava")
let UI = document.getElementById("ui")
let music = document.getElementById("menuMusic")
let lvlMusic = document.getElementById("levelMusic")
let headNbody = document.getElementById("head-and-body")
let weaponsShow = document.getElementById("weapons")
let menu = document.getElementById("menu")
let platform = document.getElementById("platform")
function start(){
 gameStarted = true
menu.style = "transition: 0.2s;display: none"
platform.style = "scale: 3 ; display: flex; z-index: 3; justify-content: center; align-items: center; width: 100%; margin-bottom: 400px;position: relative;top: -3100px; left: 0"
headNbody.style="display: flex"
weaponsShow.style="display: flex"
document.body.style="background:no-repeat url(lavaGame.png)"
UI.style.display="block"
lava.style="position: fixed;top: 0;left: 0;width: 100vw;height: 100vh;z-index: 1;display: block"
music.pause()
music.currentTime = 0
lvlMusic.play()
wave(10,0,0,0,0,0)

}

function unmute(){

    let menuMusic = document.getElementById("menuMusic")

menuMusic
}

document.addEventListener("wheel", (event) => {
    if (event.ctrlKey) {
        event.preventDefault()
    }
}, { passive: false })

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && ["+", "-", "=", "0"].includes(event.key)) {
        event.preventDefault()
    }
})

document.addEventListener("contextmenu", (event) => {
    event.preventDefault()
})

document.addEventListener("dragstart", (event) => {
    if (event.target.tagName === "IMG") {
        event.preventDefault()
    }
})
//end of menu


//game
let staminaRegenMulti = 1
let swordSpeedMulti = 1
let gunSpeedMulti = 1
let maxhp = 100
let maxHPdisplay = document.getElementById("maxHP") 
maxHPdisplay.innerText = `/${maxhp}`
let dead = false
let Deathscreen = document.getElementById("death")

let hitbox = document.getElementById("lavaHitbox")


let health = 100
let weapons = document.getElementById("weapons")

let mouseAngleDeg = 0;

let recoil = 0


function die(){
        if (health < 0) return
    health = -1
    dead = true
        lvlMusic.pause()
         document.getElementById("screenFX").style =
        "display: block; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 15;"

    Deathscreen.style =
        "display: block; width: 100%; height: 100%; object-fit: cover;"

        deathsound.currentTime = 0
    
deathsound.play()

            
}


if (dead == false){
document.addEventListener("mousemove", (event) => {
    let x = event.clientX - window.innerWidth / 2
    let y = event.clientY - window.innerHeight / 2

    mouseAngleDeg = Math.atan2(y, x) * 180 / Math.PI


})

function update() {
    weapons.style.transform = `rotate(${mouseAngleDeg + 90 +recoil}deg)`

    requestAnimationFrame(update)
}

update()

let deathsound = document.getElementById("deathsound")






function checkLava() {
    if (!gameStarted && dead == false) return

    let hitboxRect = hitbox.getBoundingClientRect()
    let lavaRect = lava.getBoundingClientRect()
    let platformRect = platform.getBoundingClientRect()

    let touchingLava =
        hitboxRect.left < lavaRect.right &&
        hitboxRect.right > lavaRect.left &&
        hitboxRect.top < lavaRect.bottom &&
        hitboxRect.bottom > lavaRect.top

    let touchingPlatform =
        hitboxRect.left < platformRect.right &&
        hitboxRect.right > platformRect.left &&
        hitboxRect.top < platformRect.bottom &&
        hitboxRect.bottom > platformRect.top

    if (touchingLava && !touchingPlatform) {
        health = 0
    }
    console.log(
    "Lava:", touchingLava,
    "Platform:", touchingPlatform
)
} //ai stuff
 
let platformY = -3100
let platformX = 0

let directionFacing = ``
let head = document.getElementById("head")
let keys = {}

document.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true

})

document.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false
        if (event.key === "Shift") {
        canDash = true}
})
window.addEventListener("blur", () => {
    keys = {}
})
let upgrades = document.getElementById("upgrades")
let DashSFX = document.getElementById("DashSFX")
let dashfail = document.getElementById("dashfail")
let staminaDisplay = document.getElementById("stamina")
let healthDisplay = document.getElementById("health")
let canDash = true
let movementEnabled = true
let stamina = 3
function movement(){
    if (dead != false)return
    if(keys["w"] || keys["W"] || keys["ArrowUp"]){
        platformY += 20
        head.src = "player/headback.png"
        directionFacing = "up"
    }
    else if(keys["s"] || keys["S"] || keys["ArrowDown"]){
        platformY -= 20
        head.src = "player/head.png"
        directionFacing = "down"
    }
    else if(keys["a"] || keys["A"] || keys["ArrowLeft"]){
        platformX += 20
        head.src = "player/headSide2.png"
        directionFacing = "left"
    }
    else if(keys["d"] || keys["D"] || keys["ArrowRight"]){
        platformX -= 20
        head.src = "player/headSide.png"
        directionFacing = "right"
    }

    platform.style.top = `${platformY}px`
    platform.style.left = `${platformX}px`

    requestAnimationFrame(movement)
    staminaDisplay.innerText = stamina
    healthDisplay.innerText = health
    if (health === 0){
        die()
    }

    checkLava()
}

movement()

document.addEventListener("keydown", (e) => {
    if (e.key !== "Shift" || !canDash || stamina < 1) return
    movementEnabled = false
    if (directionFacing === "up") {
        platformY += 250
    } else if (directionFacing === "down") {
        platformY -= 250
    } else if (directionFacing === "left") {
        platformX += 250
    } else if (directionFacing === "right") {
        platformX -= 250
    }
    DashSFX.currentTime = 0
    DashSFX.play()
    stamina -= 1
    canDash = false

    if(stamina < 1){    
        dashfail.currentTime = 0
    dashfail.play()}
    
 
})

setInterval(() => {
    if(stamina < 3){
        stamina += 0.25 
        
if(stamina > 3){
            stamina = 3}


    }
    
}, 450 * staminaRegenMulti)
let currentWave = 1
let damageSFX = document.getElementById("hurt")
function wave(normZombieAmmount, FastZombieAmmount, ArcherAmmount, SmokerAmmount, TankAmmount, BossAmmount) {

    for (let i = 0; i < normZombieAmmount; i++) {

        let enemy = document.createElement("img")

        enemy.classList.add("enemy")
        enemy.src = "enemy/meeleeEnemy.png"

        enemy.health = 100
        enemy.canAttack = true
        enemy.speed = 2
        enemy.damage = 10

        enemy.style.position = "fixed"
        enemy.style.scale = "0.5"
        enemy.style.zIndex = "4"

        let side = Math.floor(Math.random() * 4)

        if (side === 0) {
            enemy.style.left = Math.random() * window.innerWidth + "px"
            enemy.style.top = "-150px"
        }
        else if (side === 1) {
            enemy.style.left = window.innerWidth + "px"
            enemy.style.top = Math.random() * window.innerHeight + "px"
        }
        else if (side === 2) {
            enemy.style.left = Math.random() * window.innerWidth + "px"
            enemy.style.top = window.innerHeight + "px"
        }
        else {
            enemy.style.left = "-150px"
            enemy.style.top = Math.random() * window.innerHeight + "px"
        }

        document.body.appendChild(enemy)
    }

for (let i = 0; i < TankAmmount; i++) {

    let enemy = document.createElement("img")

    enemy.classList.add("enemy")
    enemy.src = "enemy/tankEnemy.png"

    enemy.health = 300
    enemy.canAttack = true
    enemy.speed = 1
    enemy.damage = 25

    enemy.style.position = "fixed"
    enemy.style.scale = "0.7"
    enemy.style.zIndex = "4"

    let side = Math.floor(Math.random() * 4)

    if (side === 0) {
        enemy.style.left = Math.random() * window.innerWidth + "px"
        enemy.style.top = "-150px"
    }
    else if (side === 1) {
        enemy.style.left = window.innerWidth + "px"
        enemy.style.top = Math.random() * window.innerHeight + "px"
    }
    else if (side === 2) {
        enemy.style.left = Math.random() * window.innerWidth + "px"
        enemy.style.top = window.innerHeight + "px"
    }
    else {
        enemy.style.left = "-150px"
        enemy.style.top = Math.random() * window.innerHeight + "px"
    }

    document.body.appendChild(enemy)
}
    for (let i = 0; i < FastZombieAmmount; i++) {

        let enemy = document.createElement("img")

        enemy.classList.add("enemy")
        enemy.src = "enemy/fastEnemy.png"

        enemy.health = 75
        enemy.canAttack = true
        enemy.speed = 4
        enemy.damage = 10

        enemy.style.position = "fixed"
        enemy.style.scale = "0.4"
        enemy.style.zIndex = "4"

        let side = Math.floor(Math.random() * 4)

        if (side === 0) {
            enemy.style.left = Math.random() * window.innerWidth + "px"
            enemy.style.top = "-150px"
        }
        else if (side === 1) {
            enemy.style.left = window.innerWidth + "px"
            enemy.style.top = Math.random() * window.innerHeight + "px"
        }
        else if (side === 2) {
            enemy.style.left = Math.random() * window.innerWidth + "px"
            enemy.style.top = window.innerHeight + "px"
        }
        else {
            enemy.style.left = "-150px"
            enemy.style.top = Math.random() * window.innerHeight + "px"
        }

        document.body.appendChild(enemy)
    }
for (let i = 0; i < BossAmmount; i++) {

    let enemy = document.createElement("img")

    enemy.classList.add("enemy")
    enemy.src = "enemy/bossEnemy.png"

    enemy.health = 600
    enemy.canAttack = true
    enemy.speed = 2
    enemy.damage = 50

    enemy.style.position = "fixed"
    enemy.style.scale = "1"
    enemy.style.zIndex = "4"

    let side = Math.floor(Math.random() * 4)

    if (side === 0) {
        enemy.style.left = Math.random() * window.innerWidth + "px"
        enemy.style.top = "-150px"
    }
    else if (side === 1) {
        enemy.style.left = window.innerWidth + "px"
        enemy.style.top = Math.random() * window.innerHeight + "px"
    }
    else if (side === 2) {
        enemy.style.left = Math.random() * window.innerWidth + "px"
        enemy.style.top = window.innerHeight + "px"
    }
    else {
        enemy.style.left = "-150px"
        enemy.style.top = Math.random() * window.innerHeight + "px"
    }

    document.body.appendChild(enemy)
}

for (let i = 0; i < ArcherAmmount; i++) {

    let enemy = document.createElement("img")

    enemy.classList.add("enemy")
    enemy.src = "enemy/projectileEnemy.png"

    enemy.health = 100
    enemy.canAttack = false
    enemy.speed = 0

    enemy.style.position = "fixed"
    enemy.style.scale = "0.5"
    enemy.style.zIndex = "4"

    enemy.style.left = Math.random() * window.innerWidth + "px"
    enemy.style.top = Math.random() * window.innerHeight + "px"

    document.body.appendChild(enemy)

    setInterval(() => {

        if (!enemy.parentElement || dead) return

        let enemyRect = enemy.getBoundingClientRect()

        let enemyX = enemyRect.left + enemyRect.width / 2
        let enemyY = enemyRect.top + enemyRect.height / 2

        let playerX = window.innerWidth / 2
        let playerY = window.innerHeight / 2

        let dx = playerX - enemyX
        let dy = playerY - enemyY

        let angle = Math.atan2(dy, dx)

        let projectile = document.createElement("div")
        projectile.classList.add("enemyProjectile")

        projectile.style.position = "fixed"
        projectile.style.left = enemyX + "px"
        projectile.style.top = enemyY + "px"
        projectile.style.zIndex = "10"

        document.body.appendChild(projectile)

        let x = enemyX
        let y = enemyY
        let speed = 7

        let oldProjectilePlatformX = platformX
        let oldProjectilePlatformY = platformY

        function moveProjectile() {

            if (!projectile.parentElement || dead) return

            let movementX = platformX - oldProjectilePlatformX
            let movementY = platformY - oldProjectilePlatformY

            x += movementX
            y += movementY

            oldProjectilePlatformX = platformX
            oldProjectilePlatformY = platformY

            x += Math.cos(angle) * speed
            y += Math.sin(angle) * speed

            projectile.style.left = x + "px"
            projectile.style.top = y + "px"

            let projectileRect = projectile.getBoundingClientRect()
            let bodyRect = body.getBoundingClientRect()

            if (
                projectileRect.left < bodyRect.right &&
                projectileRect.right > bodyRect.left &&
                projectileRect.top < bodyRect.bottom &&
                projectileRect.bottom > bodyRect.top
            ) {
                health -= 15
                damageSFX.currentTime = 0
                damageSFX.play()
                projectile.remove()
                return
            }

            if (
                x < -100 || x > window.innerWidth + 100 ||
                y < -100 || y > window.innerHeight + 100
            ) {
                projectile.remove()
                return
            }

            requestAnimationFrame(moveProjectile)
        }

        moveProjectile()

    }, 1500)
}

for (let i = 0; i < SmokerAmmount; i++) {

    let enemy = document.createElement("img")

    enemy.classList.add("enemy")
    enemy.src = "enemy/smokerEnemy.png"

    enemy.health = 150

    enemy.style.position = "fixed"
    enemy.style.scale = "0.5"
    enemy.style.zIndex = "4"

    enemy.style.left = Math.random() * window.innerWidth + "px"
    enemy.style.top = Math.random() * window.innerHeight + "px"

    document.body.appendChild(enemy)

    setInterval(() => {

        if (!enemy.parentElement || dead) return
        document.getElementById("ash").style="margin-bottom: 8500px; display: block; opacity: 60;"
        ash += 10

        if (ash >= 100) {
            ash = 0
            health -= 5
            damageSFX.currentTime = 0
            damageSFX.play()
        }

    }, 1000)
}

    let oldPlatformX = platformX
    let oldPlatformY = platformY

    let body = document.getElementById("body")

    let waveEnded = false

    function enemyAI() {

        if (waveEnded) return

        let enemies = document.querySelectorAll(".enemy")

        if (enemies.length === 0) {
            currentWave = currentWave + 1
            waveEnded = true

            health = maxhp

            upgrades.style.display = "flex"

            return
        }

        let movementX = platformX - oldPlatformX
        let movementY = platformY - oldPlatformY

        enemies.forEach(enemy => {

            enemy.style.left =
                `${enemy.offsetLeft + movementX}px`

            enemy.style.top =
                `${enemy.offsetTop + movementY}px`

            let enemyRect = enemy.getBoundingClientRect()
            let bodyRect = body.getBoundingClientRect()

            let enemyX =
                enemyRect.left + enemyRect.width / 2

            let enemyY =
                enemyRect.top + enemyRect.height / 2

            let playerX = window.innerWidth / 2
            let playerY = window.innerHeight / 2

            let dx = playerX - enemyX
            let dy = playerY - enemyY

            let distance =
                Math.sqrt(dx * dx + dy * dy)

            let angle =
                Math.atan2(dy, dx) * 180 / Math.PI

            enemy.style.transform =
                `rotate(${angle + 180}deg)`

            if (distance > 50) {

                if (!enemy.src.includes("smokerEnemy") && !enemy.src.includes("projectileEnemy")) {

                    enemy.style.left =
                        `${enemy.offsetLeft + (dx / distance) * (enemy.speed || 2)}px`

                    enemy.style.top =
                        `${enemy.offsetTop + (dy / distance) * (enemy.speed || 2)}px`
                }
            }

            if (
                enemyRect.left < bodyRect.right &&
                enemyRect.right > bodyRect.left &&
                enemyRect.top < bodyRect.bottom &&
                enemyRect.bottom > bodyRect.top &&
                enemy.canAttack &&
                !enemy.src.includes("projectileEnemy")
            ) {

                enemy.canAttack = false

                enemy.src =
                    "enemy/projectileEnemy.png"

                setTimeout(() => {

                    if (!enemy.parentElement || dead) return

                    let newEnemyRect =
                        enemy.getBoundingClientRect()

                    let newBodyRect =
                        body.getBoundingClientRect()

                    if (
                        newEnemyRect.left < newBodyRect.right &&
                        newEnemyRect.right > newBodyRect.left &&
                        newEnemyRect.top < newBodyRect.bottom &&
                        newEnemyRect.bottom > newBodyRect.top
                    ) {
                        health -= enemy.damage

    damageSFX.currentTime = 0
    damageSFX.play()
                    }

                    if (enemy.parentElement && enemy.src.includes("meeleeEnemyAttack")) {
                        enemy.src =
                            "enemy/meeleeEnemy.png"
                    }

                    enemy.canAttack = true

                }, 500)
            }
        })

        oldPlatformX = platformX
        oldPlatformY = platformY

        requestAnimationFrame(enemyAI)
    }

    enemyAI()
}
let hpUpgrades = 0
let stUpgrades = 0
let gnUpgrades = 0
let sdUpgrades = 0
let hpUpgradeDisplay = document.getElementById("hpUP")
let stUpgradeDisplay = document.getElementById("stUP")
let gnUpgradeDisplay = document.getElementById("gnUP")
let sdUpgradeDisplay = document.getElementById("sdUP")


function upgradeHealth() {
    if(hpUpgrades === 0){

        maxhp *= 1.5
        health = maxhp

        maxHPdisplay.innerText = `/${maxhp}`

        upgrades.style.display = "none"
        hpUpgrades = hpUpgrades +1
        hpUpgradeDisplay.innerText = "Health 3.0x"
        nextWave()
    }
    else if(hpUpgrades === 1){

        maxhp *= 3.0
        health = maxhp

        maxHPdisplay.innerText = `/${maxhp}`

        upgrades.style.display = "none"
        hpUpgrades = hpUpgrades +1
        hpUpgradeDisplay.innerText = "Health 3.0x"
        nextWave()
    }
    else if(hpUpgrades === 2){

        maxhp *= 4.5
        health = maxhp

        maxHPdisplay.innerText = `/${maxhp}`

        upgrades.style.display = "none"
        hpUpgrades = hpUpgrades +1
        hpUpgradeDisplay.innerText = "Health 4.5x"
        nextWave()
    }
    else if(hpUpgrades === 3){

        document.getElementById("hpUP").disabled = true

        upgrades.style.display = "none"

        hpUpgradeDisplay.innerText = "Maxed"
    }
    
}

function upgradeStamina() {

    if(stUpgrades === 0){

        staminaRegenMulti *= 1.5

        upgrades.style.display = "none"
        stUpgrades = stUpgrades +1
        stUpgradeDisplay.innerText = "Stamina 3.0x"
        nextWave()
    }

    else if(stUpgrades === 1){

        staminaRegenMulti *= 3.0

        upgrades.style.display = "none"
        stUpgrades = stUpgrades +1
        stUpgradeDisplay.innerText = "Stamina 4.5x"
        nextWave()
    }

    else if(stUpgrades === 2){

        staminaRegenMulti *= 4.5

        upgrades.style.display = "none"
        stUpgrades = stUpgrades +1
        stUpgradeDisplay.innerText = "Stamina Maxed"

        document.getElementById("stUP").disabled = true
        nextWave()
    }

}

function upgradeSword() {

    if(swordUpgrades === 0){

        swordSpeedMulti *= 0.5

        upgrades.style.display = "none"
        swordUpgrades = swordUpgrades +1
        swordUpgradeDisplay.innerText = "Sword Speed 0.25x"
        nextWave()
    }

    else if(swordUpgrades === 1){

        swordSpeedMulti *= 0.5

        upgrades.style.display = "none"
        swordUpgrades = swordUpgrades +1
        swordUpgradeDisplay.innerText = "Sword Speed 0.125x"
        nextWave()
    }

    else if(swordUpgrades === 2){

        swordSpeedMulti *= 0.5

        upgrades.style.display = "none"
        swordUpgrades = swordUpgrades +1
        swordUpgradeDisplay.innerText = "Sword Maxed"

        document.getElementById("sdUP").disabled = true
        nextWave()
    }

}

function upgradeGun() {

    if(gunUpgrades === 0){

        gunSpeedMulti *= 0.5

        upgrades.style.display = "none"
        gunUpgrades = gunUpgrades +1
        gunUpgradeDisplay.innerText = "Gun Speed 0.25x"
        nextWave()
    }

    else if(gunUpgrades === 1){

        gunSpeedMulti *= 0.5

        upgrades.style.display = "none"
        gunUpgrades = gunUpgrades +1
        gunUpgradeDisplay.innerText = "Gun Speed 0.125x"
        nextWave()
    }

    else if(gunUpgrades === 2){

        gunSpeedMulti *= 0.5

        upgrades.style.display = "none"
        gunUpgrades = gunUpgrades +1
        gunUpgradeDisplay.innerText = "Gun Maxed"

        document.getElementById("gnUP").disabled = true
        nextWave()
    }

}


function nextWave(){
    if(currentWave === 2){
        wave(15,5,2,1,1,0)
    }
    else if(currentWave === 3){
        wave(20,7,3,2,1,0)
    }
    else if(currentWave === 4){
        wave(25,10,4,2,2,0)
    }
    else if(currentWave === 5){
        wave(30,12,5,3,2,0)
    }
    else if(currentWave === 6){
        wave(35,15,6,3,3,0)
    }
    else if(currentWave === 7){
        wave(40,18,7,4,3,0)
    }
    else if(currentWave === 8){
        wave(45,20,8,4,4,0)
    }
    else if(currentWave === 9){
        wave(50,22,9,5,4,0)
    }
    else if(currentWave === 10){
        wave(55,25,10,5,5,0)
    }
    else if(currentWave === 11){
        wave(60,30,12,6,5,0)
    }
    else if(currentWave === 12){
        wave(0,0,0,0,0,1)
    }
}



let bulletDamage = 25
let canShoot = true
let shootSFX = document.getElementById("shoot")
document.addEventListener("mousedown", (event) => {
    if (event.button === 0 && !dead && gameStarted && canShoot) {
        shoot()
    }
})
let bulletCooldownMulti = 1
function shoot() {
    canShoot = false

    let bullet = document.createElement("div")
    bullet.classList.add("bullet")
    document.body.appendChild(bullet)

    let gunRect = document.getElementById("gun").getBoundingClientRect()

    let angle = mouseAngleDeg 
    let radians = angle * Math.PI / 180

    let x = gunRect.left + gunRect.width / 2
    let y = gunRect.top + gunRect.height / 2 - 25

    // move bullet to the end of the gun
    x += Math.cos(radians) * gunRect.height / 2
    y += Math.sin(radians) * gunRect.height / 2

    let speed = 15

    function moveBullet() {
        x += Math.cos(radians) * speed
        y += Math.sin(radians) * speed
        let enemies = document.querySelectorAll(".enemy")
let bulletRect = bullet.getBoundingClientRect()

enemies.forEach(enemy => {
    let enemyRect = enemy.getBoundingClientRect()

    if (
        bulletRect.left < enemyRect.right &&
        bulletRect.right > enemyRect.left &&
        bulletRect.top < enemyRect.bottom &&
        bulletRect.bottom > enemyRect.top
    ) {
        enemy.health -= bulletDamage
        bullet.remove()

        if (enemy.health <= 0) {
            enemy.remove()
        }
    }
})

recoil = 0

        bullet.style.left = `${x}px`
        bullet.style.top = `${y}px`

        if (
            x < -50 || x > window.innerWidth + 50 ||
            y < -50 || y > window.innerHeight + 50
        ) {
            bullet.remove()
            return
        }

        requestAnimationFrame(moveBullet)
    }

    moveBullet()
shootSFX.currentTime = 0
    shootSFX.play()
    setTimeout(() => {
        canShoot = true
    }, 500 * bulletCooldownMulti)
    recoil = -20
}
let canSlash = true
document.addEventListener("mousedown", (event) => {
    if (event.button === 2 && !dead && gameStarted && canSlash) {
        slash()
    }
})
let slashSFX = document.getElementById("slash")
function slash() {
        canSlash = false
slashSFX.currentTime = 0
    slashSFX.play()
    recoil = 90
    setTimeout(()=>{
        recoil = 180

        let bladeRect = document.getElementById("blade").getBoundingClientRect()
        let enemies = document.querySelectorAll(".enemy")

        enemies.forEach(enemy => {
            let enemyRect = enemy.getBoundingClientRect()

            if (
                bladeRect.left < enemyRect.right &&
                bladeRect.right > enemyRect.left &&
                bladeRect.top < enemyRect.bottom &&
                bladeRect.bottom > enemyRect.top
            ) {
                enemy.health -= 75

                if (enemy.health <= 0) {
                    enemy.remove()
                }
            }
        })
            let slashTrail = document.createElement("div")
slashTrail.classList.add("slashTrail")

weapons.appendChild(slashTrail)
let weaponsRect = weapons.getBoundingClientRect()

slashTrail.style.left =
    `${bladeRect.left - weaponsRect.left + bladeRect.width / 2}px`

slashTrail.style.top =
    `${bladeRect.top - weaponsRect.top + bladeRect.height / 2}px`

weapons.appendChild(slashTrail)
setTimeout(() => {
    slashTrail.remove()
}, 150)
    }, 100)

    setTimeout(() => {
recoil =  0

    }, 200)




    setTimeout(() => {
        canSlash = true
    }, 1000 * swordSpeedMulti)
}








}









//end of game


//pause
function soundvolcheck(){
    
    volumeCheck.innerText = volume.value
        music.volume = volume.value / 100
    lvlMusic.volume = volume.value / 100
}
soundvolcheck()
//end of pause
