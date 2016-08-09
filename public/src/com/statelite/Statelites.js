/**
 * Created by Administrator on 2016/8/4.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};

/**
 * ÎÀÐÇ
 * @param path_
 * @param name_
 * @param x_
 * @param y_
 * @param z_
 * @constructor
 */
HCC_LIGHTS.Statelites=function(holder_,path_,name_,x_,y_,z_){

    var sope=this;
    this.starName="";
    this.amp=0;
    this.intensity=1;    
    this.brightness=0;
    this.hisenabled=true;
    this.enabled=true;
    this.setEnabled=function(val_){
        scope.hisenabled=val_;
        if(!sope.mesh)return;
        if(val_==sope.enabled)return;
        sope.enabled=val_;
        if(val_){
            sope.mesh.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    child.material.color.setHex(child.material.normalColor);
                }
            });
        }else{
            sope.mesh.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    child.material.normalColor=child.material.color;
                    child.material.color.setHex(0x000000);
                }
            });
        }
    };
    this.glowGroup=null;
    /*
    var atmoShader = {
        //depthTest:false,
        side: THREE.DoubleSide,
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
            "vViewPosition = mvPosition.xyz;",
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
            "vec3 viewPosition = normalize( vViewPosition );",
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


    var atmoShader = {
        depthTest:true,
        side: THREE.FrontSide,
        transparent: true,
        uniforms: {},
        vertexShader: [
            'varying vec3 vNormal;',
            "uniform float mvPosition_v;",
            'void main() {',
            'vNormal = -normalize( normalMatrix * normal );',
            'vNormal = vec3(1.0,1.0,1.0);',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, mvPosition_v );',
            '}'
        ].join('\n'),
        fragmentShader: [
            'varying vec3 vNormal;',
            "uniform float u_r;",
            "uniform float u_g;",
            "uniform float u_b;",

            "uniform float lDirection_v;",
            "uniform float dotProduct_v;",
            "uniform float viewDotScale_v;",
            "uniform float viewDotClampScale_v;",
            'void main() {',
            'float intensity = pow( viewDotScale_v - dot( vNormal, vec3( 0, 0, 1.0 ) ), viewDotClampScale_v );',
            'gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;',
            '}'
        ].join('\n')
    }
    */

    this.setLightsScale=function(value){
        //value*=.01;
        //atmoShader.uniforms.viewDotScale_v.value=value;
    };
    this.controlBrightness=function(brithtness_){
    }

    /*
    atmoShader.uniforms.u_r={value:0.2};
    atmoShader.uniforms.u_g={value:0.6};
    atmoShader.uniforms.u_b={value:1.0};

    atmoShader.uniforms.viewDotScale_v={value:1.0};
    atmoShader.uniforms.mvPosition_v={value:1.0};
    atmoShader.uniforms.viewDotClampScale_v={value:0.2};

     var effectController = {
     r: 0.2,
     g: 0.6,
     b: 1.0,
     scale:1.0,
     viewDotScale_v:1.0,
     mvPosition_v:1.0,
     viewDotClampScale_v:0.2,
     };

     this.guiChanged=function(value) {
     var glowUniforms = atmoShader.uniforms;
     glowUniforms.u_r.value=effectController.r;
     glowUniforms.u_g.value=effectController.g;
     glowUniforms.u_b.value=effectController.b;

         if(sope.glowGroup){
             sope.glowGroup.scale.set(effectController.scale,effectController.scale,effectController.scale);
         }

     glowUniforms.viewDotScale_v.value=effectController.viewDotScale_v;
     glowUniforms.mvPosition_v.value = effectController.mvPosition_v;
     glowUniforms.viewDotClampScale_v.value = effectController.viewDotClampScale_v;

     }

     var gui = new dat.GUI();
     gui.add(effectController, "r", 0.0, 1.0, 0.2).onChange(this.guiChanged);
     gui.add(effectController, "g", 0.0, 1.0, 0.6).onChange(this.guiChanged);
     gui.add(effectController, "b", 0.0, 1.0, 1.0).onChange(this.guiChanged);
     gui.add(effectController, "scale", -2.0, 2.0, 1.0).onChange(this.guiChanged);
     gui.add(effectController, "viewDotScale_v", 0.0, 20.0, 1.0).onChange(this.guiChanged);
     gui.add(effectController, "mvPosition_v", 0.0, 2.0, 0.93).onChange(this.guiChanged);
     gui.add(effectController, "viewDotClampScale_v", 0.0, 10.0, 2.0).onChange(this.guiChanged);

    */
    //var earthAtmoMat = new THREE.ShaderMaterial(atmoShader);

    //var glowMat=new THREE.ShaderMaterial(atmoShader);
    var glowMat=new THREE.MeshBasicMaterial({
        color:0xFFFFFF,
        transparent: true,
        opacity:0.1
    })


    this.stateLitesName=name_;
    this.mesh=null;
    this.sprites=new THREE.Object3D();
    this.sprites.position.set(x_,y_,z_);
    var onProgress=function(){
        console.log("objMesh loading...");
    };
    var onError=function(){
        console.log("objMesh loading Error");
    };

    this.createGlow=function(){

        sope.setEnabled(sope.hisenabled);

        return;
        /*
        var group=new THREE.Object3D();
        var sub;
        sope.mesh.traverse(function(child){

            if(child instanceof THREE.Mesh){
                sub=new THREE.Mesh(child.geometry,glowMat);
                group.add(sub);
            }
        });

        group.rotation.y=Math.PI/2;
        group.position.set(x_,y_,z_);
        sope.glowGroup=group;
        */
        /*
        var helper_=new THREE.BoundingBoxHelper(sope.mesh);
        helper_.update();
        console.log(helper_.box.size());
        //helper_.width;
        //helper_.height;
        //helper_.depth;

        var geo=new THREE.SphereGeometry(helper_.box.size().x/2,100,100);
        var group=new THREE.Mesh(geo,glowMat);

        sope.glowGroup=group;
        group.position.set(x_,y_,z_);

        //var group=new THREE.Object3D();

        holder_.add(group);
        */

    }


    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( path_ );
    mtlLoader.setBaseUrl( path_ );
    mtlLoader.load( name_+'.mtl', function( materials ) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( path_ );
        objLoader.load( name_+'.obj', function ( object ) {
            holder_.add( object );
            object.position.set(x_,y_,z_);
            object.rotation.y=Math.PI/2;
            sope.enabled=true;
            sope.mesh=object;

            sope.createGlow();

        }, onProgress, onError );
    });



}