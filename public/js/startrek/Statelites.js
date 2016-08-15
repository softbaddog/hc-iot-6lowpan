/**
 * Created by Administrator on 2016/8/4.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};

/**
 * Œ¿–«
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
    this.enabled=5;
    this.setEnabled=function(val_){
        sope.hisenabled=val_;
        if(!sope.mesh)return;
        //if(val_==sope.enabled)return;
        console.log("statelites enabled:"+val_);
        sope.enabled=val_;
        if(val_){
            sope.mesh.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    child.material.color=child.material.normalColor;
                }
            });
        }else{
            sope.mesh.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    child.material.color=child.material.closeColor;
                }
            });
        }
    };
    this.glowGroup=null;
    this.setLightsScale=function(value){
    };
    this.controlBrightness=function(brithtness_){
    };
    this.openBrightness=function(){
    };

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

            sope.mesh.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    child.material.normalColor=child.material.color;
                    child.material.closeColor=new THREE.Color(0,0,0);
                }
            });


            sope.createGlow();

        }, onProgress, onError );
    });



}