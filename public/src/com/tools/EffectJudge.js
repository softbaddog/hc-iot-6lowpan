/**
 * Created by Administrator on 2016/8/5.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.effectJudgeInit=function() {


    HCC_LIGHTS.effectController = {
        /*
         orgCamrea:false,
         lightRectangle:20,
         skyRotationX:Math.PI/2,
         skyRotationY:0,
         skyRotationZ:0
         */
    };
    HCC_LIGHTS.guiChanged = function (value) {
    };

    HCC_LIGHTS.gui = new dat.GUI();
    /*
     gui.add(effectController, "r", 0.0, 1.0, 0.2).onChange(this.guiChanged);
     gui.add(effectController, "g", 0.0, 1.0, 0.6).onChange(this.guiChanged);
     gui.add(effectController, "b", 0.0, 1.0, 1.0).onChange(this.guiChanged);
     gui.add(effectController, "scale", -2.0, 2.0, 1.0).onChange(this.guiChanged);
     gui.add(effectController, "viewDotScale_v", 0.0, 20.0, 1.0).onChange(this.guiChanged);
     gui.add(effectController, "mvPosition_v", 0.0, 2.0, 0.93).onChange(this.guiChanged);
     gui.add(effectController, "viewDotClampScale_v", 0.0, 10.0, 2.0).onChange(this.guiChanged);
     */
}