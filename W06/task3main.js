function main()
{
    var width = 800;
    var height = 500;

    var scene = new THREE.Scene();
    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 10 );
    camera.lookAt(scene.position);
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 0, 0, 0 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );

    var geometrygouraudBlinnPhong = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var materialgouraudBlinnPhong = new THREE.ShaderMaterial(
    {
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('gouraudBlinnPhong.vert').text,
        fragmentShader: document.getElementById('gouraudBlinnPhong.frag').text,
        uniforms: {
        light_position: { type: 'v3', value: light.position },
        camela_position: {type: 'v3', value: camera.position}
        }
    });
    
    var gouraudBlinnPhong = new THREE.Mesh( geometrygouraudBlinnPhong, materialgouraudBlinnPhong );
    gouraudBlinnPhong.position.x = -2;
    gouraudBlinnPhong.position.y = 0;
    gouraudBlinnPhong.position.z = 0;
    gouraudBlinnPhong.castShadow = true;

    scene.add( gouraudBlinnPhong );

    var geometryPhongBlinnPhong = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var materialPhongBlinnPhong = new THREE.ShaderMaterial({
         vertexColors: THREE.VertexColors,
         vertexShader: document.getElementById('PhongBlinnPhong.vert').text,
         fragmentShader: document.getElementById('PhongBlinnPhong.frag').text,
         uniforms: {
         light_position: { type: 'v3', value: light.position },
         camela_position: {type: 'v3', value: camera.position}
         }
    });
    
    var PhongBlinnPhong = new THREE.Mesh( geometryPhongBlinnPhong, materialPhongBlinnPhong );
    PhongBlinnPhong.position.x = 2;
    PhongBlinnPhong.position.y = 0;
    PhongBlinnPhong.position.z = 0;
    PhongBlinnPhong.castShadow = true;

    scene.add( PhongBlinnPhong );

    document.getElementById('result').appendChild(renderer.domElement);
    renderer.render( scene, camera );
    loop();

    function loop()
    {
        requestAnimationFrame(loop);
        gouraudBlinnPhong.rotation.x += 0.01;
        gouraudBlinnPhong.rotation.y += 0.01;
        PhongBlinnPhong.rotation.x += 0.01;
        PhongBlinnPhong.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
