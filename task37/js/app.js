(function() {
  var login_btn = document.getElementById('login');
  var pop_box = document.getElementById('pop_box');
  var close_btn = document.getElementById('close');
  var mask = document.getElementById('mask');

  //��ȡ��Ļ�߶�
  var windowSize = {
    width: document.documentElement.offsetWidth
        || document.documentElement.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }

  //�¼��󶨺���������eventTypeΪ����"on"���¼�����
  function bind(ele, eventType, callback) {
    if(ele.addEventListener) {
      // W3C��׼д��
      return ele.addEventListener(eventType, callback, false);
    }else if(ele.attachEvent) {
      // ����IE6~8
      return ele.attachEvent("on" + eventType, callback);
    }else {
      // ����IE5-
      return ele["on" + eventType] = callback;
    }
  }

  // ��login_btn�󶨴򿪸�������¼�
  bind(login_btn, "click", boxShow);

  // ��mask��close_button�󶨹رո�������¼�
  // bind(mask, "click", closeBox);
  bind(close_btn, "click", closeBox);

  // ����������
  function boxShow() {
    pop_box.style.display = "block";
    mask.style.display = "block";
  }

  // �رյ�����
  function closeBox() {
    pop_box.style.display = "none";
    mask.style.display = "none";
  }

  // ��������ƶ��¼���
  bind(pop_box, "mousedown", popDown);
  bind(pop_box, "mousemove", popMove);
  bind(pop_box, "mouseup", popUp);

  // isDown��ʾ����Ƿ��Ѱ��£�Ĭ��Ϊδ����״̬
  var isDown = false;
  // ���λ���븡�������Ͻǵľ���
  var deltaX, deltaY;
  // �������marginֵ
  var marginX, marginY;
  // �����������ƶ��ı߽�ֵ
  var edgeLeft, edgeTop;
  // ������굱ǰ����
  var mouseX, mouseY;
  // ������Ԫ�����Ͻǵ���ʵleft��topֵ
  var popUpBoxLeft, popUpBoxTop;

  // ���������갴���¼�
  function popDown(e) {
    // �޸��϶���ʽ
    pop_box.style.cursor = "move";

    // ��ȡ��ǰ���λ������
    var e = e || window.event;
    var mouse = getPosition(e);
    mouseX = mouse[0];
    mouseY = mouse[1];

    // ��ȡ������Ԫ�����Ͻǵ���ʵleft��topֵ
    popUpBoxLeft = pop_box.offsetLeft - marginX;
    popUpBoxTop = pop_box.offsetTop - marginY;

    // ��ȡ���λ���븡�������Ͻǵľ���
    deltaX = mouseX - popUpBoxLeft;
    deltaY = mouseY - popUpBoxTop;

    // �������marginֵ
    marginX = -pop_box.offsetWidth/2;
    marginY = -pop_box.offsetHeight/2;

    // ȷ������Ƿ���
    isDown = true;
  }

  // �����������ƶ��¼�
  function popMove(e) {
    // ��ȡ��ǰ���λ������
    var e = e || window.event;
    var mouse = getPosition(e);
    mouseX = mouse[0];
    mouseY = mouse[1];

    // ������Ѿ����£���������ƶ��¼�
    if(isDown) {
      // �������ƶ��߽��ж�
      edgeLeft = mouseX - deltaX;
      edgeTop = mouseY - deltaY;
      if((edgeLeft >= -marginX) && (edgeLeft < windowSize.width - pop_box.offsetWidth - marginX)) {
        pop_box.style.left = edgeLeft + "px";
      }
      if((edgeTop >= -marginY) && (edgeTop < windowSize.height - pop_box.offsetTop - marginY)){
        pop_box.style.top = edgeTop + "px";
      }
    }
  }

  // �����������ͷ��¼�
  function popUp(e) {
    pop_box.style.cursor = "default";
    isDown = false;
  }

  // ��ȡ��굱ǰλ��
  function getPosition(e) {
    // �����¼�����
    var e = e || window.event;

    // ����x��y�ֱ�Ϊ���������ĵ���λ��
    var x = 0, y = 0;

    // ���W3C��׼���������pageX/Y����
    if(e.pageX) {
      x = e.pageX;
      y = e.pageY;
    }else if(e.clientX) {
      // ��IE6~8�в�֧��pageX��������clientX����clientXֻ�������Ļ�ӿڵĺ����꣬������������ȣ�
      var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // pageX = clientX + scrollX
      x = e.clientX + scrollLeft;
      y = e.clientY + scrollTop;
    }
    return [x, y];
  }

})()
