/**
 * Created by Administrator on 2016/7/21.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.LineAni=function(){
    var scope=this;
    this.line;
    this.showLength=1;
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
HCC_LIGHTS.LineAni.prototype={
    init:function(){
        var LineCurve=new THREE.LineCurve3(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,0));
        var points=LineCurve.getPoints(2);
        var lineGeo=new THREE.Geometry;
        lineGeo.vertices=points;
        this.line=new THREE.Line(lineGeo,new THREE.LineBasicMaterial({color:0xFFFFFFF}));

    },
    show:function(start_,end_){
        this.initObject=start_;
        this.endObject=end_;
        var LineCurve=new THREE.LineCurve3(start_.sprites.position,end_.sprites.position);
        var tubeGeo=new THREE.TubeGeometry(LineCurve,1,10,2);

        this.totalPoints=LineCurve.getPoints(100);
        this.curentPoints=this.totalPoints.slice(0,1);
        var lineGeo=new THREE.Geometry;
        lineGeo.vertices=this.curentPoints;
        lineGeo.verticesNeedUpdate=true;
        this.line.geometry=lineGeo;
    },
    //播放动画
    startAni:function(){
        this.showLength=0;
        this.status=1;
        this.curentPoints=[];
        this.anishow=true;
    },
    //关闭该线条
    close:function(){
        this.status=0;
        this.anishow=true;
        this.showLength=100;
    },

    /**     * 销毁     */
    dispose:function(){
        if(this.line.parent){
            this.line.parent.remove(this.line);
        }
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
    }
    ,
    update:function(){
        //return;
        if(this.anishow){

            if(this.status==0){//断开

                this.curentPoints.shift();
                var lineGeo=new THREE.Geometry;
                lineGeo.vertices=this.curentPoints;
                this.line.geometry.dispose();
                this.line.geometry=lineGeo;


                if(this.curentPoints.length<=0) {
                    this.anishow=false;
                    this.dispose();
                }

            }else if(this.status==1){//连接
                //console.log("lineConnect:"+this.showLength);
                this.curentPoints.push(this.totalPoints[this.showLength]);
                var lineGeo=new THREE.Geometry;
                lineGeo.vertices=this.curentPoints;
                this.line.geometry.dispose();
                this.line.geometry=lineGeo;

                this.showLength+=1;
                if(this.showLength>=100) {
                    this.anishow=false;
                    this.callBack();
                }
            }else{
                //linkani
            }
        }
    },
    /**     * 根据名字判断连线是否存在     * @param s_     * @param e_     * @returns {boolean}     */
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
    /**     * 根据对象判断连线是否存在     * @param s_     * @param e_     * @returns {boolean}     */
    judgeSprite:function(s_,e_){
        if(this.judge(s_)&&this.judge(e_)){
            return true;
        }
        return false;
    }
}