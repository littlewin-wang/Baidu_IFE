function Queue() {
  this.dataStore = [];
}

//���ĩβ���һ��Ԫ��
Queue.prototype.enqueue = function(element) {
  this.dataStore.push(element)
}

//ɾ�����׵�Ԫ��
Queue.prototype.dequeue = function() {
  return this.dataStore.shift();
}

Queue.prototype.front = function() { //��ȡ����Ԫ��
  return this.dataStore[0];
}

Queue.prototype.back = function() { //��ȡ��ĩԪ��
  return this.dataStore[this.dataStore.length - 1]
}

//��ʾ�����ڵ�����Ԫ��
Queue.prototype.toString = function() {
  var retStr = "";
  for (var i = 0; i < this.dataStore.length; ++i ) {
    retStr += this.dataStore[i] + "\n";
  }
  return retStr
}

//�����Ƿ�Ϊ��
Queue.prototype.empty = function() {
  if (this.dataStore.length == 0) {
    return true;
  } else {
    return false;
  }
}

//���и���
Queue.prototype.count = function() {
  return this.dataStore.length;
}