var stickyNav, threeD, pigGame;



/* Sticky Navbar Function
 *******************************/
stickyNav = () => {
    var navbar, sticky;
    window.onscroll = () => { stickyScroll() };
    navbar = document.getElementById("navigate");
    sticky = navbar.offsetLeft;

    function stickyScroll() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    }
}
stickyNav();
/* Introduction Three.js Animation
 ****************************************/
threeD = () => {
    var scene, camera, renderer, container, geometry, material, cube, light;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerWidth, 0.1, 1000);

    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#ff7f50");
    renderer.setSize(window.innerWidth, window.innerHeight);
    container = document.getElementById('intro');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    })



    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshLambertMaterial({ color: 0x25b8b8 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);





    light = new THREE.PointLight(0xFFFFFF, 1, 500)
    light.position.set(10, 0, 25);
    scene.add(light);

    var render = () => {
        requestAnimationFrame(render);


        renderer.render(scene, camera);
    }

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseMove(event) {
        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children, true);
        for (var i = 0; i < intersects.length; i++) {


            this.tl = new TimelineMax();
            this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut })
            this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut })
            this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut })
            this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5")
        }
    }

    render();



    window.addEventListener('click', onMouseMove);

}

threeD();


/* Pig Game Code
 **************************************/
pigGame = () => {
    var scores, roundScore, activePlayer, gamePlay;

    init();

    var preDice;

    function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
    }

    document.querySelector('.btn-roll').addEventListener('click', () => {
        if (gamePlay) {
            // 1. Random number
            var dice = Math.floor(Math.random() * 6) + 1;

            // 2. Display the result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'public/images/dice-' + dice + '.png';


            //3. Update the round score IF the rolled number was NOT a 1
            if (dice === 6 && preDice === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            } else if (dice !== 1) {

                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

            } else {
                nextPlayer();
            }
            preDice = dice;
        }


    });

    document.querySelector('.btn-hold').addEventListener('click', () => {
        if (gamePlay) {
            // Add current score to global score
            scores[activePlayer] += roundScore;


            // Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            // Check if player won the game
            if (scores[activePlayer] >= 1000) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlay = false;
            } else {
                nextPlayer();
            }

        }

    });

    document.querySelector('.btn-new').addEventListener('click', init);

    function init() {
        scores = [0, 0];
        activePlayer = 0;
        roundScore = 0;
        gamePlay = true;
        document.querySelector('.dice').style.display = 'none';

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }
}
pigGame();