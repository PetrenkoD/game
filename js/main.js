var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

 
var game = new Phaser.Game(config);
 
var player;
var cursors;
var text;
 
function create() {
    this.add.sprite(0, 0, 'background');
    player = this.physics.add.sprite(400, 500, 'player'); 
    player.setBounce(0.2); 
    player.setCollideWorldBounds(true); 
    cursors = this.input.keyboard.createCursorKeys();
}
 
function update() {

    player.body.velocity.setTo(0,0);
    if (cursors.left.isDown) 
    {
        player.body.setVelocityX(-200); 
    }
    else if (cursors.right.isDown) 
    {
        player.body.setVelocityX(200); 
    }
    if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor())
    {
        player.body.setVelocityY(-500); 
    } 
}
function preload() {

    this.load.image('background', 'assets/back.png'); 
    this.load.image('player', 'assets/pers.png');
 

    var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;

            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.9);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(250, 280, 300 * value, 30);
            });

            this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
            });
            
            this.load.image('logo', 'logo.png');
            for (var i = 0; i < 5000; i++) {
                this.load.image('logo'+i, 'logo.png');
            }
}
