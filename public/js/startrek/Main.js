/**
 * Created by Administrator on 2016/7/20.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.loadIni=function(){
    //加载配置文件
    HCC_LIGHTS.ViewIni={};
    $.getJSON("data/ViewIni.json",function(data_){
        HCC_LIGHTS.ViewIni=data_;
        HCC_LIGHTS.init();
    });

}
HCC_LIGHTS.init=function(){
    //DOM
    HCC_LIGHTS.ControlDiv=$("#controls_div")[0];

    //gui init
    HCC_LIGHTS.effectController={};
    HCC_LIGHTS.gui = new dat.GUI();

    //初始化Three.js
    var three = new LHF_WEBGL.InitThree($("#webgl_canvas")[0], 1280, 720, 30, 10, 20000, true);
    three.main_camera.position.set(0, 10, 800);
    //three.main_camera.lookAt(new THREE.Vector3(0, 0, 0));
    three.main_camera.lookAt(new THREE.Vector3(0, 0, -2000));
    three.main_renderer.setClearColor(0x303231);
    HCC_LIGHTS.three=three;

    //axis
    var axis=new THREE.AxisHelper(10000);
    three.starScene.add(axis);
    axis.visible=false;
    HCC_LIGHTS.effectController.axisEnabled=false;
    this.axisChange=function(){
        axis.visible=HCC_LIGHTS.effectController.axisEnabled;
    }
    HCC_LIGHTS.gui.add(HCC_LIGHTS.effectController, "axisEnabled").onChange(this.axisChange);

    //lights
    //var ambient = new THREE.AmbientLight( 0xFFFFFF,40 );
    var ambient = new THREE.AmbientLight( 0xFFFFFF,4 );
    three.starScene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 4.0 );
    //var directionalLight = new THREE.DirectionalLight( 0x223366, 4.0 );
    directionalLight.position.set(1000,200,500);
    directionalLight.lookAt(new THREE.Vector3(0,0,0));
    three.starScene.add( directionalLight );

    var starDirect2=new THREE.DirectionalLight(0xFFFFFF,0.5);
    starDirect2.position.set(0,-100,0);
    three.starScene.add(starDirect2);

    //sky
    //var sky_=new HCC_LIGHTS.Sky(three.main_scene);
    var sky_=new HCC_LIGHTS.Sky(three.starScene);
    HCC_LIGHTS.sky=sky_;

    //var star=new HCC_LIGHTS.Star(three.starScene);

    //stars
    //var star=new HCC_LIGHTS.StarScene(three.main_scene);
    var star=new HCC_LIGHTS.StarScene(three.starScene);
    HCC_LIGHTS.star=star;

    //stars stuts 星空状态管理.. 连线/离线等..
    new HCC_LIGHTS.LineManager();

    /**     * 音乐控制     */
    var visualizer=new HCC_IOT.AudioVisualizer(function(){
        console.log("music play");},function(){console.log("music end");});
    visualizer.init();
    var musicControls=new HCC_IOT.AudioControls(visualizer);
    star.startMusicAni(visualizer);

    //视角控制
    HCC_LIGHTS.camauto=new HCC_LIGHTS.CameraContols();

    /**     * 数据交互     */
    var dataMana=new HCC_LIGHTS.DataInterface(HCC_LIGHTS.lineMana);

    //屏幕自适应
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        var tw_=HCC_LIGHTS.ControlDiv.clientWidth;
        var th_=HCC_LIGHTS.ControlDiv.clientHeight;
        HCC_LIGHTS.camauto.onWindowResize();
        //$("#controls_div")[0].style.width = tw_;
        //$("#controls_div")[0].style.height = th_;

        three.main_renderer.setSize(tw_, th_);
        three.onWindowResize(tw_,th_);
    }

    //帧频
    var enterframe=function(){
        dataMana.update();//数据管理
        HCC_LIGHTS.lineMana.update();//线条光效更新
        HCC_LIGHTS.camauto.update();//摄像头回位
        sky_.update();//环境更新
        visualizer.update();//音乐
        star.update();//星空闪烁
    }

    three.enterframe=enterframe;
    onWindowResize();
    three.render();
}