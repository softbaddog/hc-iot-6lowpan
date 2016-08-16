/**
 * Created by Administrator on 2016/7/22.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.CurveAni=function(){
    var scope=this;
    this.life=true;
    this.line;
    this.offset=new THREE.Vector2(1,0);

    this.texture;

    this.anishow=false;
    this.speed=0.01;
    this.status=0;
    this.callBack=function(){};
    this.totalPoints=[];
    this.curentPoints=[];

    this.initObject=null;
    this.endObject=null;

    this.init();
}
HCC_LIGHTS.CurveAni.prototype={
    init:function(){
        var LineCurve=new THREE.LineCurve3(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,0));
        this.texture=HCC_LIGHTS.textureLoader.load("textures/sprites/LineTexture.png");
        this.texture.offset=new THREE.Vector2(1,0);
        this.lineMaterial_=new THREE.MeshBasicMaterial( {
            transparent:    true,
            opacity:1,
            blending:THREE.AdditiveBlending,
            depthTest:false,
            map:    this.texture,
            //color:          0x3399ff,
            color:          0x59aafc,
            side:THREE.FrontSide

        } );
        this.lineMaterial_.needsUpdate=true;
        var tubeGeo=new THREE.TubeGeometry(LineCurve,1,.6,3);
        this.line=new THREE.Mesh(tubeGeo,this.lineMaterial_);

    },
    show:function(start_,end_){
        this.initObject=start_;
        this.endObject=end_;
        var LineCurve=new THREE.LineCurve3(start_.sprites.position,end_.sprites.position);
        var tubeGeo=new THREE.TubeGeometry(LineCurve,1,.8,3);
        this.line.geometry=tubeGeo;
    },
    //播放动画
    startAni:function(){
        this.offset.x=-1;
        this.status=1;
        this.anishow=true;
    },
    //关闭该线条
    close:function(){
        this.offset.x=0;
        this.status=0;
        this.anishow=true;
    },

    /**     * 销毁     */
    dispose:function(){
        if(this.line.parent){
            this.line.parent.remove(this.line);
        }

        this.texture.dispose();

        this.line.geometry.dispose();
        this.line.material.dispose();
        this.showLength=1;
        this.anishow=false;
        this.speed=0.01;
        this.status=0;
        this.callBack=null;
        this.totalPoints=[];
        this.curentPoints=[];

        this.initObject=null;
        this.endObject=null;
        this.life=false;
    }
    ,
    update:function(){
        //return;
        if(this.anishow){
            //console.log("status --"+this.status);
            if(this.status==0){//断开
                this.texture.offset=this.offset;
                this.offset.x-=this.speed;
                //console.log("c pro --");
                if(this.offset.x<=-1) {
                    this.anishow=false;
                    this.dispose();
                }
            }else if(this.status==1){//连接
                this.texture.offset=this.offset;
                this.offset.x+=this.speed;
                if(this.offset.x>=0) {
                    this.anishow=false;
                    this.callBack();
                }
            }else{
                //linkani
            }
        }
    },
    /**     * 根据名字判断连线是否相关     * @param s_     * @param e_     * @returns {boolean}     */
    judegeName:function(s_,e_){
        if((s_==this.initObject.starName||s_==this.endObject.starName)&&(e_==this.initObject.starName||e_==this.endObject.starName)){
            return true;
        }
        return false;
    },
    /**     * 判断是否与对象有关     * @param s_     */
    judge:function(s_){
        if((s_==this.initObject||s_==this.endObject)){
            return true;
        }
        return false;
    },
    /**     * 根据对象判断连线是否相关     * @param s_     * @param e_     * @returns {boolean}     */
    judgeSprite:function(s_,e_){
        if(this.judge(s_)&&this.judge(e_)){
            return true;
        }
        return false;
    }
}