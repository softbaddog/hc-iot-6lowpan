function bultGet() {
  $.ajax({
    type: "POST",
    url: "/iotdm/nb/v1/system/action/urn:huawei:iotdm:task/bulk-get",
    dataType: 'json',
    data: {
      "devices": ["2E0000000002"],      /*设备编号*/
      "priority": 1,      /*必选，优先等级，1~10*/
      "retry-times": 3,      /*必选，重试次数，0~100*/
      "retry-intervals": 1000,      /*必选，重试间隔，0~65535，毫秒*/
      "max-timeout": 10000,      /*必选，超时时间范围，1000~300000，毫秒*/
      "enable": true,      /*可选，任务是否有效，默认值为true，表示任务有效*/
      "action": [{
        "name": "energy",
        "type": "get",
        "path": "/huawei-iotdm-device:data/huawei-iotdm-device-energy:total-active-energy"
      }, {
        "name": "voltage",
        "type": "get",
        "path": "/huawei-iotdm-device:data/huawei-iotdm-device-energy:a-voltage"
      }, {
        "name": "current",
        "type": "get",
        "path": "/huawei-iotdm-device:data/huawei-iotdm-device-energy:a-current"
      }, {
        "name": "power",
        "type": "get",
        "path": "/huawei-iotdm-device:data/huawei-iotdm-device-energy:total-active-power"
      }, {
        "name": "frequency",
        "type": "get",
        "path": "/huawei-iotdm-device:data/huawei-iotdm-device-energy:frequency"
      }]
    },
    success: function(msg) {
      var devData = {
        "name": "2E0000000002",
        "params": {
          "location": "上海世博展览馆",
          "energy": "N/A",
          "voltage": "N/A",
          "current": "N/A",
          "power": "N/A",
          "frequency": "N/A"
        },
        "status": 0
      };
      var actions = msg.logs[0].actions;
      if (actions[0].status == 'completed') {
        devData.params.energy = actions[0].result;
      }
      if (actions[1].status == 'completed') {
        devData.params.voltage = actions[1].result;
      }
      if (actions[2].status == 'completed') {
        devData.params.current = actions[2].result;
      }
      if (actions[3].status == 'completed') {
        devData.params.power = actions[3].result;
      }
      if (actions[4].status == 'completed') {
        devData.params.frequency = actions[4].result;
      }
      //只要有一个成功，那么肯定在线
      actions.forEach(function(element, index, array) {
        if (element.status == 'completed') {
          devData.status = 1;
        }
      });
      if (devData.status == 1) {
        showData(devData);
        return;
      }
      alert('请求出错了');
      try { //错了就记录日志
        console.log(JSON.strinify(msg));
      } catch (e) {}
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('出错了');
    }
  });
}