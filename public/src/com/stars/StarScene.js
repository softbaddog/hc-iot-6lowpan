/**
 * Created by Administrator on 2016/7/20.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.StarScene=function(scene_){
    var scope=this;

    scope.visualizer;
    scope.analyser;
    scope.starMatrix=[];
    scope.starAry=[];
    scope.starMeshAry=[];
    scope.lineMana=null;

    scope.lightsIntensity=65;
    scope.musicRate=false;

    this.onLightsIntensityChange=function(){
        scope.lightsIntensity=HCC_LIGHTS.effectController.lightsIntensity;

        if(scope.musicAni&&scope.visualizer.runing){
            scope.musicRate=HCC_LIGHTS.effectController.musicRate;
        }else{
            scope.musicRate=false;
            HCC_LIGHTS.effectController.musicRate=false;
        }
    }

    HCC_LIGHTS.effectController.lightsIntensity=65;
    HCC_LIGHTS.effectController.musicRate=false;
    HCC_LIGHTS.gui.add(HCC_LIGHTS.effectController, "lightsIntensity",10,100,20).onChange(this.onLightsIntensityChange);
    HCC_LIGHTS.gui.add(HCC_LIGHTS.effectController, "musicRate").onChange(this.onLightsIntensityChange);

    var starScene=new THREE.Object3D();
    scope.starScene=starScene;
    scene_.add(starScene);


    //ÎÀÐÇ
    var statePath="models/";
    //var statelites=["statelite1","statelite2","statelite3","statelite1","statelite2","statelite3"];
    var statelites=["statelite1","statelite2","statelite3","statelite4","statelite5","statelite5","statelite5","statelite5","statelite5","statelite5"];
    var stateliteMeshAry=[];


    var timeScale=1;

    this.earth=null;
    this.devicesAry=[];

    //分组
    this.starGroups=[];
    var groupslength=0;

    //添加到指定分组
    function addToGroups(obj_,data_){
        var i_=0,l_=scope.starGroups.length;

        var tempObj_;
        for(i_=0;i_<l_;i_++){//保存到对应的分组
            tempObj_=scope.starGroups[i_];
            if(tempObj_.groupId==data_.groupId){
                tempObj_.ary.push(obj_);
                return;
            }
        }

        //分组不存在重新创建
        var temp_={                groupId:data_.groupId,                ary:[obj_]            };
        scope.starGroups.push(temp_);
    }


    //earth.earth.rotation.y=2;

    /*
    var rotationController = {
        x: 0,
        y: 0,
        z: 0,
    };

    var distance = 400000;

    this.guiChanged=function(value) {
        var glowUniforms = earth.earth.rotation;
        glowUniforms.x=rotationController.x;
        glowUniforms.y=rotationController.y;
        glowUniforms.z=rotationController.z;

    }


    var gui = new dat.GUI();
    gui.add(rotationController, "x", 0.0, Math.PI*2, 0).onChange(this.guiChanged);
    gui.add(rotationController, "y", 0.0, Math.PI*2,0).onChange(this.guiChanged);
    gui.add(rotationController, "z", 0.0, Math.PI*2, 0.0).onChange(this.guiChanged);
    */


    //earth.earth.position.set(0,-110,0);


    var star=new HCC_LIGHTS.Star(scope.starScene);
    /**
     * ±éÀú½Úµã
     * @param data
     */
    scope.create=function(data){
        var zi_=0;
        var zl_=data.length;
        var xi_ = 0;
        var xl_ = 0;
        var itemObj={};

        var starPoint_=null;

        var x_=0;
        var y_=0;
        var sprite_;
        for(zi_=0;zi_<zl_;zi_++) {
            xi_=0;
            xl_=data[zi_].length;
            itemObj=data[zi_];
            itemObj.lightColor=0x85c2fe;

            starPoint_=itemObj.metadata;
            starPoint_.x=starPoint_.x||0;
            starPoint_.y=starPoint_.y||0;
            starPoint_.z=starPoint_.z||0;

            if(itemObj.name.substr(0,7)=="devices"){
                /*
                var star=new HCC_LIGHTS.Star2(itemObj.radius,scope.starScene,itemObj.texture,itemObj.x,itemObj.y,itemObj.z);
                star.starName = itemObj.name;
                star.amp=0;
                scope.starAry.push(star);
                console.log("devices");
                star.sprites.rotation.x=(Math.random()*(Math.PI/4))-Math.PI/4;
                this.devicesAry.push(star.sprites);
                */
                //var statelite_=new HCC_LIGHTS.Statelites(scope.starScene,statePath,statelites.shift(),itemObj.x,itemObj.y,itemObj.z);
                var statelite_=new HCC_LIGHTS.Statelites(HCC_LIGHTS.three.starScene,statePath,statelites.shift(),starPoint_.x,starPoint_.y,starPoint_.z);
                statelite_.starName = itemObj.name;                
                scope.starAry.push(statelite_);
                this.devicesAry.push(statelite_.mesh);

                //添加到对应分组
                addToGroups(statelite_,itemObj);

            }else {

                sprite_ = new HCC_LIGHTS.StarSprites(itemObj.lightColor);
                sprite_.intensity = Math.random() * 5;//ÁÁ¶ÈÖµ
                sprite_.brightness=parseInt(sprite_.intensity);
                sprite_.setLightsScale(10);//³õÊ¼ÉÁË¸Öµ
                sprite_.starName = itemObj.name;

                sprite_.sprites.starName = "s_" + itemObj.name;//test

                sprite_.sprites.position.set(starPoint_.x, starPoint_.y, starPoint_.z);
                scope.starScene.add(sprite_.sprites);
                scope.starAry.push(sprite_);

                //添加到对应分组
                addToGroups(sprite_,itemObj);
            }

        }

        groupslength=scope.starGroups.length;

        //Ñ¡ÖÐÊä³ö
        var selOutPutFun= function (obj) {
            console.log(obj.starName);
        };
        var sel3d=new HCC_LIGHTS.Sel3DObject(scope.starScene.children,HCC_LIGHTS.ControlDiv,HCC_LIGHTS.three.main_camera,selOutPutFun);

        var earth=new HCC_LIGHTS.Earth(scope.starScene);
        earth.earth.rotation.x=4;

        //earth.earth.position.set(-110,0,0);
        //earth.earth.position.set(-100,-150,0);
        earth.earth.position.set(-200,0,0);
        this.earth=earth;

        //Á¬Ïß
        HCC_LIGHTS.lineMana.init(scope.starScene,this.starAry);//ÐÇ¿Õ½»»¥Êý¾Ý³õÊ¼»¯
    };

    scope.startMusicAni=function(visualizer_){
        scope.visualizer=visualizer_;
        scope.analyser=visualizer_.analyser;
        scope.musicAni=true;
    };
    scope.stopMusicAni=function(){
        scope.musicAni=false;
    };
    scope.musicAniFun=function(){

        var time = Date.now() * 0.002;
        var tempGroup={};
        /** ¸ù¾ÝÒôÀÖÆµÆ× **/
        var array = new Uint8Array(scope.analyser.frequencyBinCount);
        scope.analyser.getByteFrequencyData(array);
        var step = Math.round(array.length / groupslength);//¼ÆËã´ÓanalyserÖÐµÄ²ÉÑù²½³¤

        //¶ÔÐÅÔ´Êý×é½øÐÐ³éÑù±éÀú£¬»­³öÃ¿¸öÆµÆ×Ìõ
        for (var i = 0; i < groupslength; i++) {
            var value = array[i * step];
            //value/=20;

            tempGroup=scope.starGroups[i];

            var ary=tempGroup.ary;
            var i_ = 0,l_=ary.length;
            for(i_=0;i_<l_;i_++){
                if(value<10) {
                    value = scope.lightsIntensity * ( 1 + Math.sin(0.5 * i_ + (time + ary[i_].intensity)) );
                }
                ary[i_].setLightsScale(Math.round(value));
            }

        }
    };

    scope.anishow=function(){
        var time = Date.now() * 0.002;
        var scaletemp_;
        var ary=scope.starAry;
        var i_ = 0,l_=ary.length;
        for(i_=0;i_<l_;i_++){
            scaletemp_ = scope.lightsIntensity * ( 1 + Math.sin(0.5 * i_ + (time + ary[i_].intensity)) );
            //ary[i_].sprites.scale.set(scaletemp_,scaletemp_,scaletemp_);
            ary[i_].setLightsScale(scaletemp_);//ÉÁË¸


        }
    }

    scope.update=function(delta){

        /*
        for(var i in this.devicesAry){
            this.devicesAry[i].rotation.y+=.002;
        }
        */
        /*
        if(this.earth){
            this.earth.earth.rotation.y+=.001;
        }
        */
        /*
        if(scope.musicAni&&scope.visualizer.runing){
            scope.musicAniFun();
        }
        */
        if(scope.musicRate){
            scope.musicAniFun();
        }else{
            scope.anishow();
        }
    };
    //$.getJSON('data/PlanePosition.json', function(data_){
    //$.getJSON('data/PlanePosition_music.json', function(data_){
    $.getJSON('/api/pp', function(data_){
        scope.create(data_);
    });
}
HCC_LIGHTS.StarScene.prototype={
    readConnect:function(url){

    },
    parseData:function(json){

    },
    nextAni:function(){

    },
}