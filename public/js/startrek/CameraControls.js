/**
 * Created by Administrator on 2016/8/3.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.CameraContols=function() {

    var ini_=HCC_LIGHTS.ViewIni.defaultView;

    var controls_=new THREE.OrbitControls(HCC_LIGHTS.three.main_camera,HCC_LIGHTS.ControlDiv);


    var scope=this;
    var fov_= 30,
        w_=1024,
        h_=768,
        near_=10,
        far_=20000;

    this.orthoCamera=new THREE.OrthographicCamera(-w_/2,w_/2,h_/2,-h_/2,near_,far_);
    this.persCamera=new THREE.PerspectiveCamera(fov_, w_ / h_, near_, far_);
    this.orthoCamera.up.set(0,1,0);

    this.onWindowResize=function(){
        var tw_=HCC_LIGHTS.ControlDiv.clientWidth;
        var th_=HCC_LIGHTS.ControlDiv.clientHeight;

        scope.persCamera.aspect = tw_ / th_;
        scope.persCamera.updateProjectionMatrix();

        scope.orthoCamera.left=-(tw_/2);
        scope.orthoCamera.right=(tw_/2);

        scope.orthoCamera.top=(th_/2);
        scope.orthoCamera.bottom=-(th_/2);

    }
    //controls

    //中心点
    /*

     x
     :
     385.6108726717072
     y
     :
     -126.13450237024512
     z
     :
     666.6932785427144
     */
    //var lookTarget=new THREE.Vector3(385,-124,666);

    var lookTarget=new THREE.Vector3();
    lookTarget.x=ini_.lookTarget.x;
    lookTarget.y=ini_.lookTarget.y;
    lookTarget.z=ini_.lookTarget.z;


    //auto delayTime 等待时间 ms
    //var autoDelayTime=5000;
    var autoDelayTime=ini_.restTime;

    //动画运行事件 ms
    var aniRunTime=3000;
    //鼠标交互时间
    var mouseMutual=false;//鼠标是否有交互
    var moueDownEnabled=false;
    var mouseTime=0;
    var curTime=0;

    //最佳视角
    //目标位置

    /*
     phi
     :
     1.196609498258578
     radius
     :
     2301.6197572673764
     theta
     :
     -0.9981101659842565
     */
    var tweenLookSpherical = new THREE.Spherical(ini_.spherical.radius, ini_.spherical.phi, ini_.spherical.theta);
    //var tweenLookSpherical = new THREE.Spherical(2305, 1.09, -.79);

    controls_.target0=lookTarget;
    controls_.target=lookTarget;
    controls_.autoRotateSpeed=1;
    controls_.autoRotateSpeed=1;
    controls_.autoRotate =false;
    controls_.enablePan = false;
    //controls_.minPolarAngle=.7;
    //controls_.maxPolarAngle=Math.PI/1.5;

    controls_.minPolarAngle=ini_.lonRectangle.min;
    controls_.maxPolarAngle=ini_.lonRectangle.max;

    controls_.maxAzimuthAngle=Math.PI*.8;
    controls_.minAzimuthAngle=-Math.PI*.7;

    controls_.maxDistance = ini_.distance.max;
    controls_.minDistance = ini_.distance.min;

    //controls_.maxDistance = 3200;
    //controls_.minDistance = 1000;
    controls_.reset();

    controls_.update();



    HCC_LIGHTS.control=controls_;



    /**     * 摄像头回位 1     */
    var quat = new THREE.Quaternion().setFromUnitVectors(HCC_LIGHTS.three.main_camera.up, new THREE.Vector3(0, 1, 0));
    var quatInverse = quat.clone().inverse();

// 当前位置
    var curSpherical = new THREE.Spherical();
    var cameraPosition = new THREE.Vector3();
    var tweenAutoEnabled = false;
    var cameraTween = new TWEEN.Tween(curSpherical);
    cameraTween.easing(TWEEN.Easing.Sinusoidal.InOut);
    function tweenCameraPosition() {
        cameraPosition.setFromSpherical(curSpherical);
        cameraPosition.applyQuaternion(quat);
        HCC_LIGHTS.three.main_camera.position.copy(cameraPosition);
        HCC_LIGHTS.three.main_camera.lookAt(lookTarget);



        //到达目标位置
        if (
            (curSpherical.phi == tweenLookSpherical.phi) &&
            (curSpherical.radius == tweenLookSpherical.radius) &&
            (curSpherical.theta == tweenLookSpherical.theta)
        ) {
            tweenAutoEnabled = false;
            controls_.enabled=true;//允许控制
        }
    }

    function startTweenCameraAuto() {

        var curVec3 = new THREE.Vector3();
        curVec3.copy(HCC_LIGHTS.three.main_camera.position);

        // rotate offset to "y-axis-is-up" space
        curVec3.applyQuaternion(quat);

        // angle from z-axis around y-axis
        curSpherical.setFromVector3(curVec3);

        HCC_LIGHTS.three.main_camera.position.copy(curVec3);
        HCC_LIGHTS.three.main_camera.lookAt(controls_.target);

        cameraTween.to({
            phi: tweenLookSpherical.phi,
            theta: tweenLookSpherical.theta,
            radius: tweenLookSpherical.radius
        }, aniRunTime);
        cameraTween.start();
        tweenAutoEnabled = true;

        controls_.enabled=false;//禁止控制摄像头

        setTimeout(function(){
            tweenAutoEnabled = false;
            controls_.enabled=true;
        },aniRunTime+100);
    }

    function autoMouseUp(event) {
        if(tweenAutoEnabled)return;// 动画尚未结束 禁止启动
        //setTimeout(startTweenCameraAuto, autoDelayTime);
        mouseTime=Date.now();
        moueDownEnabled=false;
        mouseMutual=true;//鼠标有交互
    }
    function autoMouseDown(event){
        moueDownEnabled=true;
    }

    function createAutoPosition() {
        HCC_LIGHTS.ControlDiv.addEventListener("mouseup", autoMouseUp);
        HCC_LIGHTS.ControlDiv.addEventListener("mousedown", autoMouseDown);
    }

    if(ini_.autoRest)createAutoPosition();
    startTweenCameraAuto();


    this.changeCamera=function(){
        if(HCC_LIGHTS.effectController.orthocamera){
            HCC_LIGHTS.three.main_camera=scope.orthoCamera;
            controls_.object=scope.orthoCamera;
            HCC_LIGHTS.three.sceneRenderPass.camera=scope.orthoCamera;
            HCC_LIGHTS.three.skyRender.camera=scope.orthoCamera;
        }else{
            HCC_LIGHTS.three.main_camera=scope.persCamera;
            controls_.object=scope.persCamera;

            HCC_LIGHTS.three.sceneRenderPass.camera=scope.persCamera;
            HCC_LIGHTS.three.skyRender.camera=scope.persCamera;
        }

        controls_.reset();
        controls_.update();
        startTweenCameraAuto();
    }

    HCC_LIGHTS.effectController.orthocamera=false;
    //HCC_LIGHTS.gui.add(HCC_LIGHTS.effectController, "orthocamera").onChange(this.changeCamera);
    this.lockCameraPoint=function(){
        if(HCC_LIGHTS.effectController.CamreaLockCurPoint){
            tweenLookSpherical.setFromVector3(HCC_LIGHTS.three.main_camera.position);
            /*
            tweenLookSpherical.radius=controls_.curSpherical.radius;
            tweenLookSpherical.phi=controls_.curSpherical.phi;
            tweenLookSpherical.theta=controls_.curSpherical.theta;
            */
        }else{

            tweenLookSpherical.radius=ini_.spherical.radius;
            tweenLookSpherical.phi=ini_.spherical.phi;
            tweenLookSpherical.theta=ini_.spherical.theta;
        }
    };
    HCC_LIGHTS.effectController.CamreaLockCurPoint=false;
    HCC_LIGHTS.gui.add(HCC_LIGHTS.effectController, "CamreaLockCurPoint").onChange(this.lockCameraPoint);

    this.changeCamera();


    this.update=function(){
        if((!moueDownEnabled)&&mouseMutual) {//鼠标处于按下状态 不启动
            curTime = Date.now();
            if ((curTime - mouseTime) > autoDelayTime) {
                mouseTime = curTime;
                startTweenCameraAuto();
                mouseMutual=false;
            }
        }

        TWEEN.update();
        if(tweenAutoEnabled)tweenCameraPosition();
    }
}
