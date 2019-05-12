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

    var geometryLambertian = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var materialLambertian = new THREE.ShaderMaterial(
    {
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('PhongLambertian.vert').text,
        fragmentShader: document.getElementById('PhongLambertian.frag').text,
        uniforms: {
        light_position: { type: 'v3', value: light.position }
        }
    });
    
    var Lambertian = new THREE.Mesh( geometryLambertian, materialLambertian );
    Lambertian.position.x = -2;
    Lambertian.position.y = 0;
    Lambertian.position.z = 0;
    Lambertian.castShadow = true;

    scene.add( Lambertian );

    var geometryPhong = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var materialPhong = new THREE.ShaderMaterial({
         vertexColors: THREE.VertexColors,
         vertexShader: document.getElementById('PhongPhong.vert').text,
         fragmentShader: document.getElementById('PhongPhong.frag').text,
         uniforms: {
         light_position: { type: 'v3', value: light.position }
         }
    });
    
    var Phong = new THREE.Mesh( geometryPhong, materialPhong );
    Phong.position.x = 2;
    Phong.position.y = 0;
    Phong.position.z = 0;
    Phong.castShadow = true;

    scene.add( Phong );

    document.getElementById('result').appendChild(renderer.domElement);
    renderer.render( scene, camera );
    loop();

    function loop()
    {
        requestAnimationFrame(loop);
        Lambertian.rotation.x += 0.01;
        Lambertian.rotation.y += 0.01;
        Phong.rotation.x += 0.01;
        Phong.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
