function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 0, 0, 5);
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [-1,  1, -1], 
        [-1, -1, -1], 
        [ 1, -1, -1], 
        [ 1,  1, -1], 
        [-1,  1,  1], 
        [-1, -1,  1], 
        [ 1, -1,  1], 
        [ 1,  1,  1] 
    ];

    var faces = [
        [1, 0, 2],
        [2, 0, 3],
        [1, 2, 6],
        [1, 6, 5],
        [4, 7, 3],
        [4, 3, 0],
        [1, 5, 4],
        [1, 4, 0],
        [2, 7, 6],
        [2, 3, 7],
        [6, 7, 5],
        [5, 7, 4]
    ];

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );

    var v0 = new THREE.Vector3().fromArray( vertices[0] );
    geometry.vertices.push(v0);
    var v1 = new THREE.Vector3().fromArray( vertices[1] );
    geometry.vertices.push(v1);
    var v2 = new THREE.Vector3().fromArray( vertices[2] );
    geometry.vertices.push(v2);
    var v3 = new THREE.Vector3().fromArray( vertices[3] );
    geometry.vertices.push(v3);
    var v4 = new THREE.Vector3().fromArray( vertices[4] );
    geometry.vertices.push(v4);
    var v5 = new THREE.Vector3().fromArray( vertices[5] );
    geometry.vertices.push(v5);
    var v6 = new THREE.Vector3().fromArray( vertices[6] );
    geometry.vertices.push(v6);
    var v7 = new THREE.Vector3().fromArray( vertices[7] );
    geometry.vertices.push(v7);

    var n = faces.length;
    
    for(i = 0; i < n; i++)
    {
        var id = faces[i];
        var f = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push(f);
    }  

    material.vertexColors = THREE.FaceColors;

    geometry.faces[0].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[1].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[2].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[3].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[4].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[5].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[6].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[7].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[8].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[9].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[10].color = new THREE.Color( 1, 1, 1 );
    geometry.faces[11].color = new THREE.Color( 1, 1, 1 );

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    geometry.computeFaceNormals();

    document.addEventListener( 'mousedown', mouse_down_event );
    function mouse_down_event( event )
    {
        var x_win = event.clientX;
        var y_win = event.clientY;

        var vx = renderer.domElement.offsetLeft;
        var vy = renderer.domElement.offsetTop;
        var vw = renderer.domElement.width;
        var vh = renderer.domElement.height;
        var x_NDC = 2 * ( x_win - vx ) / vw - 1;
        var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );

        var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
        var p_wld = p_NDC.unproject( camera ); 

        var origin = camera.position;
        var direction = p_wld.sub( camera.position ).normalize();

        var raycaster = new THREE.Raycaster( origin, direction );
        var intersects = raycaster.intersectObject( cube );
        if ( intersects.length > 0 )
        {
            intersects[0].face.color.setRGB( 0, 1, 1 );
            intersects[0].object.geometry.colorsNeedUpdate = true;
        }
    }
    
    loop();
    
    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.010;
        cube.rotation.y += 0.012;
        renderer.render( scene, camera );
    }
}
