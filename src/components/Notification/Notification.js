import React, { useEffect, useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import _ from "lodash";
import API from "../../utils/API";
import { ACCEPT_FRIEND, ALL_NOTIFICATION } from "../../utils/constants";
import "./Notification.scss";
const Notification = ({ onNotificationCountHandler }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get(`${ALL_NOTIFICATION}`)
      .then((res) => {
        const sortedNotification = _.orderBy(
          res?.data?.data,
          ["createdAt"],
          ["desc"]
        );
        setNotifications(sortedNotification);
        onNotificationCountHandler(res?.data?.data?.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    onNotificationCountHandler(notifications.length);
  }, [notifications]);

  const onAddFriend = (notification) => {
    API.put(`${ACCEPT_FRIEND}${notification._id}`)
      .then(() => {
        setNotifications((oldNotification) => {
          let cloneNotification = _.clone(oldNotification);
          _.remove(cloneNotification, {
            requestedUser: notification.requestedUser,
          });
          return cloneNotification;
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <ul className="notification__items">
      {notifications.map((notification) => {
        return (
          <div
            className="d-flex m-1 notification__items__list-container"
            key={notification._id}
          >
            <li className="notification__items__list">
              {notification?.message}
            </li>
            <div className="notification__items__btn-container">
              <button
                className="notification__items__list__btn"
                onClick={(event) => onAddFriend(notification)}
              >
                <HiUserAdd />
              </button>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default Notification;
