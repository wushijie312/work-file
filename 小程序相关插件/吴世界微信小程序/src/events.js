//事件总线

//事件订阅者
const eventSubscribers = {};

module.exports = {

  /**
   * 发布事件
   * event 消息体
   * type  事件类型
   */
  post: function (event, type) {
    let subscribers = eventSubscribers[type];
    if (subscribers && subscribers.length > 0) {
      subscribers.forEach((subscriber) => {
        if (subscriber && subscriber !== null && typeof subscriber.handleEvent == 'function') {
          // 这里调用了订阅者的handleEvent方法，每一个订阅者都要通过实现这个方法来处理接收到的事件
          subscriber.handleEvent(event, type);
        }
      });
    }
  },

  /**
   * 订阅事件
   * subscriber 订阅者
   * type  事件类型
   */
  register: function (subscriber, type) {
    let subscribers = eventSubscribers[type];
    if (subscribers) {
      subscribers.push(subscriber);
    } else {
      eventSubscribers[type] = [subscriber];
    }
  },

  /**
   * 取消订阅
   * subscriber 订阅者
   * type  事件类型
   */
  unregister: function (subscriber, type) {
    let subscribers = eventSubscribers[type];
    if (subscribers) {
      // 从当前订阅了对应事件的订阅者数组中过滤掉解除订阅的订阅者
      eventSubscribers[type] = subscribers.filter((sub) => sub !== subscriber)
    }
  }
}