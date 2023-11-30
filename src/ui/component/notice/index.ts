/**
 * desc: 被踢出的提示
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/15
 * Time: 下午3:55
 */
import {Notification} from "./notification";
import "./index.scss";

let newNotification;

// 获得一个Notification
const getNewNotification = () => {
    // 单例 保持页面始终只有一个Notification
    if (!newNotification) {
        newNotification = Notification.reWrite();
    }
    return newNotification;
};

const notice = () => {
    let notificationInstance = getNewNotification();
    notificationInstance.notice({})
};

class Toast {
    /**
     * 显示
     */
    static show = (content?:any) => {
        return notice()
    };
    /**
     * 隐藏
     */
    static hide = () => {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    },
}

export {Toast}