function singleGet() {
  var fieldMapping = {
    "huawei-iotdm-device-energy:total-active-energy": "energy",
    "huawei-iotdm-device-energy:a-voltage": "voltage",
    "huawei-iotdm-device-energy:a-current": "current",
    "huawei-iotdm-device-energy:total-active-power": "power",
    "huawei-iotdm-device-energy:frequency": "frequency"
  };
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
    "status": 1
  };
  $.getJSON("/iotdm/nb/v1/device/get/2E0000000002/urn:huawei:iotdm:device/data", function(data) {
    $.each(data, function(key, value) {
      if (fieldMapping[key]) {
        devData.params[fieldMapping[key]] = value;
      }
    });
    showData(devData);
  }).fail(function() {
    alert('出错了');
  });
}