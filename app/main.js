window.onload = () => {
  var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,

        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1366,
        height: 700
    },
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };



    var game = new Phaser.Game(config);


    /////////PRELOAD///////////////////////////////////////////////////////////////////////////////////////////
    function preload ()
    {
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('ground', 'assets/images/platform.svg');
    this.load.image('star1', 'assets/images/paste.png');
    this.load.image('bomb', 'assets/images/sugar.png');
    this.load.spritesheet('dude', 'assets/images/dude.png',
        { frameWidth: 32, frameHeight: 48 }
        );
    }

            //MEDIA QUERY////////////////////////////////////////////////////////////////////////////////////////
            // function myFunction(x) {
            //     if (x.matches) { // If media query matches
            //         alert ["juego educativo"];
            //     } else {
            //      alert ["Para juegar a en este dispositivo necesitas un teclado"];
            //     }
            //   }
            //   var x = window.matchMedia("(max-width: 700px)")
            // myFunction(x) // Call listener function at run time
            // x.addListener(myFunction) // Attach listener function on state changes

    /////////VAR//////////////////////////////////////////////////////////////////////////////////////////
    var platforms;
    var player;
    var cursors;
    var score = 0;
    var scoreText;
    var bombs;

    /////////CREATE/////////////////////////////////////////////////////////////////////////////////////
    function create ()
    {
    this.add.image(700, 300, 'sky');

    platforms = this.physics.add.staticGroup();

        platforms.create(150, 568, 'ground')
        platforms.create(1000, 568, 'ground')
        platforms.create(500, 400, 'ground');
        platforms.create(1150, 400, 'ground');
        platforms.create(300, 250, 'ground');
        platforms.create(750, 250, 'ground');

        platforms.create(100, 670, 'ground')
        platforms.create(400, 670, 'ground')
        platforms.create(600, 670, 'ground')
        platforms.create(800, 670, 'ground')
        platforms.create(1000, 670, 'ground')
        platforms.create(1300, 670, 'ground')

        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        cursors = this.input.keyboard.createCursorKeys();

        /////////STAR 1//////////////////////////
        stars = this.physics.add.group({
            key: 'star1',
            repeat: 8,
            setXY: { x: 50, y: 0, stepX: 150 }
        });


        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);


        /////////SCORE//////////////////////////
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: 'white' });


    /////////COLECTOR_STARS//////////////////////////
    /*function collectStar (player, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);
    }*/

        /////////FISICAS//////////////////////////
        this.physics.add.collider(player, platforms);

        /////////ENEMIES//////////////////////////
        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(player, bombs, hitBomb, null, this);


    }




    /////////UPDATE//////////////////////////////////////////////////////////////////////
    function update ()
    {
    if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }


    /////////RECOGER ESTRELLAS BOMBAS//////////////////////////
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    function hitBomb (player, bomb)
    {
        this.physics.pause();

        player.setTint(0xFFFF00);

        player.anims.play('turn');

        gameOver = true;
    }







} //window.onload
