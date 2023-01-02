const battleBackgroundImage = new Image();
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0, 
        y: 0
    },
    image: battleBackgroundImage
});

const draggle = new Sprite(monsters.Draggle);
const emby = new Sprite(monsters.Emby);

const renderedSprites = [draggle, emby];

const button = document.createElement('button');
button.innerHTML = 'Fireball';
document.querySelector('#attacksBox').append(button)

function animateBattle(){
    window.requestAnimationFrame(animateBattle);
    battleBackground.draw();

    renderedSprites.forEach(sprite => {
        sprite.draw()
    });
}

// animate();
animateBattle();

const queue = []



//Event listeners for buttons (attack)
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML];
        emby.attack({ 
            attack: selectedAttack,
            recipient: draggle,
            renderedSprites
        })

        queue.push(() => {
            draggle.attack({ 
                attack: attacks.Tackle,
                recipient: emby,
                renderedSprites
            })            
        })

        queue.push(() => {
            draggle.attack({ 
                attack: attacks.Fireball,
                recipient: emby,
                renderedSprites
            })            
        })
    })
});

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(queue.length > 0){
        queue[0]();
        queue.shift();
    } else e.currentTarget.style.display = 'none';
})