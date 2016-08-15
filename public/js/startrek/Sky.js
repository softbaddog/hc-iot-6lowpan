/**
 * Created by Administrator on 2016/7/20.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.Sky=function(scene_){
    var sky=new THREE.Object3D();


    //var texture_=new THREE.TextureLoader().load("textures/skys/sky5.jpg");
    var texture_=new THREE.TextureLoader().load("textures/skys/sky6.jpg");
    //var texture_=new THREE.TextureLoader().load("textures/skys/sky3.jpg");
    var sphereGeo_=new THREE.SphereGeometry(8000,16,16);
    var sphereMaterial_=new THREE.MeshBasicMaterial({map:texture_,color:0x666666,side:THREE.BackSide});
    //var sphereMaterial_=new THREE.MeshBasicMaterial({color:000000,side:THREE.BackSide});
    this.skyBox=new THREE.Mesh(sphereGeo_,sphereMaterial_);
    sky.add(this.skyBox);

    this.sky=sky;
    //sky.rotation.x=Math.PI/4;
    //sky.rotation.y=Math.PI/2;
    sky.position.set(0, 0, 0);
    scene_.add(sky);
    this.particlesNum=500;



    //var ambient = new THREE.AmbientLight( 0xFFFFFF,40 );
    var ambient = new THREE.AmbientLight( 0xFFFFFF,4 );
    scene_.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 4.0 );
    //var directionalLight = new THREE.DirectionalLight( 0x223366, 4.0 );
    directionalLight.position.set(1000,200,500);
    directionalLight.lookAt(new THREE.Vector3(0,0,0));
    scene_.add( directionalLight );

    var starDirect2=new THREE.DirectionalLight(0xFFFFFF,0.5);
    starDirect2.position.set(0,-100,0);
    scene_.add(starDirect2);

    //var particles=new HCC_LIGHTS.ParticlesEnv(sky);
    //this.particlesEnv=particles;

    //this.init();

    this.onRotationChange=function(){
        sky.rotation.x=HCC_LIGHTS.effectController.rotationX;
        sky.rotation.y=HCC_LIGHTS.effectController.rotationY;
        sky.rotation.z=HCC_LIGHTS.effectController.rotationZ;
    }

    HCC_LIGHTS.effectController.rotationX=1;
    HCC_LIGHTS.effectController.rotationY=1;
    HCC_LIGHTS.effectController.rotationZ=0;
    HCC_LIGHTS.gui.add(HCC_LIGHTS.effectController, "rotationX",-3.14159,3.14159,0).onChange(this.onRotationChange);
    HCC_LIGHTS.gui.add(HCC_LIGHTS.effectController, "rotationY",-3.14159,3.14159,Math.PI/2).onChange(this.onRotationChange);
    HCC_LIGHTS.gui.add(HCC_LIGHTS.effectController, "rotationZ",-3.14159,3.14159,0).onChange(this.onRotationChange);
    this.onRotationChange();

}
HCC_LIGHTS.Sky.prototype={
    update:function(){
        /*
         this.particlesEnv.update();
         this.skyBox.rotation.y+=0.0001;
         this.skyBox.rotation.x+=0.0001;
         */

        //this.particlesEnv.update();
        /*
         this.sky.rotation.y+=0.0001;
         this.sky.rotation.x+=0.0001;
         */

    },
    init:function(){
        var radius = 2500;
        var earthRadius=500;
        this.geometry = new THREE.BufferGeometry();
        this.material=new THREE.PointsMaterial({color:0xFFFFFF});
        var positions = new Float32Array( this.particlesNum * 3 );
        var colors = new Float32Array( this.particlesNum * 3 );
        var sizes = new Float32Array( this.particlesNum );
        var color = new THREE.Color();
        var x_,y_,z_;
        for ( var i = 0, i3 = 0; i < this.particlesNum; i ++, i3 += 3 ) {

            positions[ i3 + 0 ] = ( Math.random() * 2 - 1 ) * radius;
            positions[ i3 + 1 ] = ( Math.random() * 2 - 1 ) * radius;
            positions[ i3 + 2 ] = ( Math.random() * 2 - 1 ) * radius;

            color.setHSL( i / this.particlesNum, 1.0, 0.5 );
            colors[ i3 + 0 ] = color.r;
            colors[ i3 + 1 ] = color.g;
            colors[ i3 + 2 ] = color.b;
            sizes[ i ] = 20;
        }

        this.geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        this.geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        this.geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
        this.particleSystem = new THREE.Points( this.geometry, this.material );
        this.sky.add( this.particleSystem );
    },
}