var R;
var G;
var B;
var newcolor;
var surfaces;
var re;

function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth * 0.5,
        height: window.innerHeight,

        enableAutoResize: false
    });
  
    var isovalue = 128;
    surfaces = Isosurfaces( volume, isovalue, screen, re);
    screen.scene.add( surfaces );

    document.getElementById('red')
        .addEventListener('mousemove', function(){
        R = document.getElementById('red').value;
    });

    document.getElementById('green')
        .addEventListener('mousemove', function(){
        G = document.getElementById('green').value;
    });

    document.getElementById('blue')
        .addEventListener('mousemove', function(){
        B = document.getElementById('blue').value;
    });

    document.getElementById('changecolor').addEventListener('click', function() {
        screen.scene.remove( surfaces );
        R = +document.getElementById('red').value;
        G = +document.getElementById('green').value;
        B = +document.getElementById('blue').value;   
        newcolor = new THREE.Color( R, G, B );
        surfaces = Isosurfaces( volume, isovalue, screen, re);
        screen.scene.add( surfaces );
    });

    function getReflection()
    {
    radio = document.getElementsByName('re')
    if(radio[0].checked){
    re = 0;
    }
    else if (radio[1].checked) {
    re = 1;
    }
    else if (radio[2].checked) {
    re = 2;
    }
    return re;
    }

    document.getElementById('shader').addEventListener('click', function() {
        screen.scene.remove( surfaces );
        R = +document.getElementById('red').value;
        G = +document.getElementById('green').value;
        B = +document.getElementById('blue').value;   
        newcolor = new THREE.Color( R, G, B );
        re = getReflection();
        surfaces = Isosurfaces( volume, isovalue, screen, re);
        screen.scene.add( surfaces );
    });

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.5, window.innerHeight ] );
    });

    screen.loop();
}

