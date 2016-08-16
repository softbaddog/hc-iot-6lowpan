/**
 * Created by Administrator on 2016/7/20.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.Star=function(scene){//????

    var sphereGeo=new THREE.SphereGeometry(256,100,100);
    var sphereMaterial=new THREE.MeshLambertMaterial({
        color:0xFFFFFF,
        map:HCC_LIGHTS.textureLoader.load("textures/earth/moon_1024.jpg")
    });
    var star_=new THREE.Mesh(sphereGeo,sphereMaterial);


    var clondsMaterial=new THREE.MeshLambertMaterial({
        color:0xFFFFFF,
        transparent: true,
        map:HCC_LIGHTS.textureLoader.load('textures/planets/earth_clouds_2048.png')
    });
    var clonds=new THREE.Mesh(sphereGeo,clondsMaterial);
    scene.add(star_);
    star_.position.set(1000,-100,-5600);
    scene.add(clonds);
    clonds.position.set(1000,-100,-5600);
}

HCC_LIGHTS.Earth2=function(scene_){
    var earth=new THREE.Object3D();
    this.earth=earth;
    scene_.add(earth);

    var earthCloudsMat = new THREE.MeshLambertMaterial({
        //color: 0x333333,
        color: 0x111111,
        blending: THREE.AdditiveBlending,
        transparent: true,
    });
    var earthClouds = HCC_LIGHTS.textureLoader.load('textures/planets/earth_clouds_2048.png', function (tex) {
        earthCloudsMat.map = tex;
        earthCloudsMat.needsUpdate = true;
    });

    earthCloudsMat.bumpMap=textureLoader.load("textures/planets/earth_clouds_2048.png");
    earthCloudsMat.bumpScale=1.0;

    var earthGeo = new THREE.SphereGeometry(100, 100, 100);
    var glowMaterial=new THREE.ShaderMaterial(glowShader);
    var earthGlow=new THREE.Mesh(earthGeo,glowMaterial);
    earthGlow.matrixAutoUpdate=false;
    earth.add(earthGlow);

    var cloudsGeo=new THREE.SphereGeometry(100.1, 100, 100);
    var sphereCloudsMesh = new THREE.Mesh(cloudsGeo, earthCloudsMat);
    earth.add(sphereCloudsMesh);

}

HCC_LIGHTS.Earth=function(scene_) {//????

    var earth=new THREE.Object3D();
    this.earth=earth;
    scene_.add(earth);

    var glowShader={
        depthTest:true,
        transparent: true,

        uniforms: {
            'texture': { type: 't', value: HCC_LIGHTS.textureLoader.load('textures/planets/earth_lights_2048.png') }
        },
        vertexShader: [
            'varying vec3 vNormal;',
            'varying vec2 vUv;',
            'void main() {',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
            'vNormal = normalize( normalMatrix * normal );',
            'vUv = uv;',
            '}'
        ].join('\n'),
        fragmentShader: [
            'uniform sampler2D texture;',
            'varying vec3 vNormal;',
            'varying vec2 vUv;',
            'void main() {',
            'vec3 diffuse = texture2D( texture, vUv ).xyz;',
            'float intensity = 0.9 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
            'vec3 atmosphere = vec3( 0.2, 0.6, 1.0 ) * pow( intensity, 3.0 );',
            '//gl_FragColor = vec4( diffuse + atmosphere,1.0 );',
            'gl_FragColor = vec4( atmosphere, 1.0 );',
            '}'
        ].join('\n')
    }

    var atmoShader = {
        side: THREE.BackSide,
        transparent: true,
        lights: true,
        uniforms: THREE.UniformsUtils.merge( [
            THREE.UniformsLib[ "lights" ],
        ] ),
        vertexShader: [
            "varying vec3 vViewPosition;",
            "varying vec3 vNormal;",

            "uniform float mvPosition_v;",

            "void main() {",
            THREE.ShaderChunk[ "beginnormal_vertex" ],
            THREE.ShaderChunk[ "defaultnormal_vertex" ],

            "	vNormal = normalize( transformedNormal );",
            "vec4 mvPosition = modelViewMatrix * vec4( position, mvPosition_v );",
            "vViewPosition = -mvPosition.xyz;",
            "gl_Position = projectionMatrix * mvPosition;",
            "}"

        ].join("\n"),

        fragmentShader: [

            THREE.ShaderChunk[ "common" ],
            THREE.ShaderChunk[ "bsdfs" ],
            THREE.ShaderChunk[ "lights_pars" ],
            THREE.ShaderChunk[ "lights_phong_pars_fragment" ],
            "uniform float u_r;",
            "uniform float u_g;",
            "uniform float u_b;",

            "uniform float lDirection_v;",
            "uniform float dotProduct_v;",
            "uniform float viewDotScale_v;",
            "uniform float viewDotClampScale_v;",


            "void main() {",
            "//float u_r=1.0;",
            "//float u_g=1.0;",
            "//float u_b=1.0;",
            "vec3 normal = normalize( vNormal );",
            "vec3 viewPosition = -normalize( vViewPosition );",
            "#if NUM_DIR_LIGHTS > 0",

            "vec3 dirDiffuse = vec3( 0.0 );",

            "for( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {",

            "vec4 lDirection = viewMatrix * vec4( directionalLights[i].direction, 0.0 );",
            "vec3 dirVector = normalize( lDirection.xyz );",
            "float dotProduct = dot( viewPosition, dirVector );",
            "dotProduct = 1.0 * max( dotProduct, 0.0 ) + (1.0 - max( -dot( normal, dirVector ),1.0  ));",
            "dotProduct *= dotProduct;",
            "dirDiffuse += max( 0.3, 0.0 ) * directionalLights[i].color;",
            "}",
            "#endif",

            //Fade out atmosphere at edge
            "float viewDot = abs(dot( normal, viewPosition ));",
            "viewDot = clamp( pow( viewDot + 0.6, 10.0 ), 0.0, viewDotClampScale_v);",
            "vec3 colour = vec3( u_r, u_g, u_b ) * dirDiffuse;",
            "//vec3 colour = vec3( 1.0, 1.0, 1.0 ) * dirDiffuse;",
            "gl_FragColor = vec4( colour, viewDot*viewDotScale_v );",
            "//gl_FragColor = vec4( colour, viewDot );",

            "}"

        ].join("\n"),
    };

    atmoShader.uniforms.u_r={value:0.2};
    atmoShader.uniforms.u_g={value:0.6};
    atmoShader.uniforms.u_b={value:1.0};
    /*
     atmoShader.uniforms.viewDotScale_v={value:1.0};
     atmoShader.uniforms.mvPosition_v={value:0.93};
     atmoShader.uniforms.viewDotClampScale_v={value:2.0};
     */
    atmoShader.uniforms.viewDotScale_v={value:4.6};
    atmoShader.uniforms.mvPosition_v={value:0.99};
    atmoShader.uniforms.viewDotClampScale_v={value:10.0};
    /*
     var effectController = {
     r: 0.2,
     g: 0.6,
     b: 1.0,
     viewDotScale_v:1.0,
     mvPosition_v:0.93,
     viewDotClampScale_v:2.0,
     };

     var distance = 400000;

     this.guiChanged=function(value) {
     var glowUniforms = atmoShader.uniforms;
     glowUniforms.u_r.value=effectController.r;
     glowUniforms.u_g.value=effectController.g;
     glowUniforms.u_b.value=effectController.b;

     glowUniforms.viewDotScale_v.value=effectController.viewDotScale_v;
     glowUniforms.mvPosition_v.value = effectController.mvPosition_v;
     glowUniforms.viewDotClampScale_v.value = effectController.viewDotClampScale_v;

     }


     var gui = new dat.GUI();
     gui.add(effectController, "r", 0.0, 1.0, 0.2).onChange(this.guiChanged);
     gui.add(effectController, "g", 0.0, 1.0, 0.6).onChange(this.guiChanged);
     gui.add(effectController, "b", 0.0, 1.0, 1.0).onChange(this.guiChanged);
     gui.add(effectController, "viewDotScale_v", 0.0, 20.0, 1.0).onChange(this.guiChanged);
     gui.add(effectController, "mvPosition_v", 0.0, 2.0, 0.93).onChange(this.guiChanged);
     gui.add(effectController, "viewDotClampScale_v", 0.0, 10.0, 2.0).onChange(this.guiChanged);
     */

    var earthAtmoMat = new THREE.ShaderMaterial(atmoShader);

    var textureLoader = new THREE.TextureLoader();
    var earthCloudsMat = new THREE.MeshLambertMaterial({
        //color: 0x333333,
        color: 0x111111,
        blending: THREE.AdditiveBlending,
        transparent: true,
    });
    var earthClouds = textureLoader.load('textures/planets/earth_clouds_2048.png', function (tex) {
        earthCloudsMat.map = tex;
        earthCloudsMat.needsUpdate = true;
    });

    earthCloudsMat.bumpMap=textureLoader.load("textures/planets/earth_clouds_2048.png");
    earthCloudsMat.bumpScale=1.0;

    var earthGeo = new THREE.SphereGeometry(100, 100, 100);
    var glowMaterial=new THREE.ShaderMaterial(glowShader);
    var earthGlow=new THREE.Mesh(earthGeo,glowMaterial);
    earthGlow.matrixAutoUpdate=false;
    earth.add(earthGlow);

    var cloudsGeo=new THREE.SphereGeometry(100.1, 100, 100);
    var sphereCloudsMesh = new THREE.Mesh(cloudsGeo, earthCloudsMat);
    earth.add(sphereCloudsMesh);

    var sphereAtmoMesh = new THREE.Mesh(earthGeo, earthAtmoMat);
    earth.add(sphereAtmoMesh);
}

HCC_LIGHTS.StarSprites=function(color_){//???
    var scope=this;
    this.starName="null";
    this.enabled=true;
    this.lineList=[];
    this.amp=1;//????
    this.intensity=1;//????
    this.brightness=0;
    this.controlInter=0;
    this.controlEnabled=false;

    //???
    this.glowMaterial=new THREE.SpriteMaterial({
        color:color_,
        transparent:true,
        //depthTest: false,
        //depthTest: true,
        blending:THREE.NormalBlending,
        //blending:THREE.AdditiveBlending,
        map:HCC_LIGHTS.Light_Sprite
    });
    this.glowMaterial.needsUpdate=true;
    this.glow=new THREE.Sprite(this.glowMaterial);
    this.glow.scale.set(32,32,32);
    this.glow.rotation.z=Math.random()*Math.PI;
    this.sprites=this.glow;

    this.setEnabled=function(enabled_){
        this.enabled=enabled_;
        if(!this.enabled) {
            this.glow.scale.set(16, 16, 16);
            this.glowMaterial.map=HCC_LIGHTS.Light_Intensity1;
            this.brightness=0;
        }else{
            this.glowMaterial.map=HCC_LIGHTS.Light_Sprite;
        }
    };
    this.setLightsScale=function(val_){
        if(this.controlEnabled)return;//处于非可控状态
        if(!this.enabled)return;
        val_+=this.amp;//????
        this.brightness=parseInt(val_);
        this.brightness>99?this.brightness=99:this.brightness;
        this.brightness<1?this.brightness=1:this.brightness;
        this.glow.scale.set(val_,val_,val_);

    };

/**
 * 外部调整灯光亮度 延迟 节奏
 * @param  {[type]} brithtness_ [description]
 * @return {[type]}             [description]
 */
    this.controlBrightness=function(brithtness_){
        this.controlEnabled=true;
        /*
        scope.controlInter=setInterval(function(){
            scope.controlEnabled=false;
            clearInterval(scope.controlInter);
        //}, 60000);
        }, 6000);
        */
        //var scale_=brithtness_*25;
        var scale_=brithtness_;
        this.glow.scale.set(scale_,scale_,scale_);
    };

    this.openBrightness=function(){
        this.controlEnabled=false;
    }

}