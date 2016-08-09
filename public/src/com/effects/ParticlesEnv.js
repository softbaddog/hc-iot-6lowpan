/**
 * Created by Administrator on 2016/7/8.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.ParticlesEnv=function(scene_){
    var scope=this;
    scope.holder=scene_;
    scope.particleSystem;
    scope.uniforms;
    scope.geometry;
    scope.particlesNum=20000;
    scope.uniforms={
        color:     { value: new THREE.Color( 0xffffff ) },
        texture:   { value: HCC_LIGHTS.Light_Intensity1}
    }

    var particlesEnvShader={
        vertexShader: [
            'attribute float size;',
            'attribute vec3 customColor;',
            'varying vec3 vColor;',
            'void main() {',
            'vColor = customColor;',
            'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
            'gl_PointSize = size * ( 300.0 / -mvPosition.z );',
            'gl_Position = projectionMatrix * mvPosition;',
            '}'
        ].join("\n"),

            fragmentShader: [
            'uniform vec3 color;',
            'uniform sampler2D texture;',
            'varying vec3 vColor;',
            'void main() {',
            'gl_FragColor = vec4( color * vColor, 1.0 );',
            'gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );',
            '}'
        ].join("\n"),
    }

    scope.shaderMaterial = new THREE.ShaderMaterial( {

        uniforms:       scope.uniforms,
        vertexShader:   particlesEnvShader.vertexShader,
        fragmentShader: particlesEnvShader.fragmentShader,

        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true
    });

    this.init();

}
HCC_LIGHTS.ParticlesEnv.prototype={
    init:function(){
        var radius = 2000;
        var earthRadius=500;
        this.geometry = new THREE.BufferGeometry();
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
            //sizes[ i ] = 32;
            sizes[ i ] = 10;
        }

        this.geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        this.geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        this.geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
        this.particleSystem = new THREE.Points( this.geometry, this.shaderMaterial );
        this.holder.add( this.particleSystem );
    },
    update:function(){
        var time = Date.now() * 0.005;
        //this.particleSystem.rotation.z = 0.01 * time;
        var sizes = this.geometry.attributes.size.array;

        for ( var i = 0; i < this.particlesNum; i++ ) {
            sizes[ i ] = 10 * ( 1 + Math.sin( 0.1 * i + time ) );
        }
        this.geometry.attributes.size.needsUpdate = true;
    }
}
