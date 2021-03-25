<template>
  <section class="bg-l-blue">
    <div class="mid">
      <div class="row">
        <div class="col-4 bg-white border chatList">
          <h5 class="text-center pt-3">Conversation</h5>
          <hr />
          <a-list
            item-layout="horizontal"
            :data-source="messengers"
            :loading="messengersLoader"
          >
            <a-list-item
              slot="renderItem"
              :class="[active === item.id ? 'active' : ''] + ' pl-2 pr-2'"
              slot-scope="item"
              :data-t="item.id"
            >
              <a-list-item-meta :description="item.message">
                <a
                  slot="title"
                  class="text-success"
                  v-on:click="getUserChat(item)"
                  >{{ item.recipient_name }}</a
                >
                <a-avatar :size="40" slot="avatar" icon="user" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
        <div class="col-8 bg-white border">
          <div class="user-detail-chat border-bottom" v-if="currentRecipient">
            <h6 class="heading">
              <a-avatar slot="avatar" icon="user" alt="Nasib Uddin" />

              <a class="author" slot="author">Nasib Uddin</a>
            </h6>
          </div>
          <div ref="container" id="messageBox" class="messageBox">
            <a-list
              item-layout="horizontal"
              :data-source="messageList"
              :loading="messageListLoader"
            >
              <a-list-item
                slot="renderItem"
                slot-scope="item"
                :class="item.notificationClass"
              >
                <a-list-item-meta :description="item.message">
                  <a slot="title">
                    <strong class="time">{{ item.time }}</strong>
                  </a>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
          <div class="chat-message-submit" v-if="currentRecipient">
            <SendMessageForm @close="onClose" :recipientId="currentRecipient" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NotificationService from "~/services/Api/NotificationService";
import SendMessageForm from "~/components/Notification/SendMessageForm";
import { isEmpty } from "~/services/Utilities";
import { isLoggedin, getUserDetails } from "~/services/Auth";

export default {
  components: { SendMessageForm },
  data() {
    return {
      messengers: [],
      messageList: [],
      messengersLoader: true,
      messageListLoader: true,
      currentRecipient: null,
      active: null,
    };
  },
  methods: {
    getNotification() {
      this.messengersLoader = true;
      NotificationService.list()
        .then((r) => {
          this.messengers = r;

          if (!isEmpty(r) && r !== undefined && r !== null) {
            this.getFirstConversation(r);
          }
        })
        .then(() => (this.messengersLoader = false));
    },
    getConversation(id) {
      this.messageListLoader = true;
      NotificationService.conversation(id)
        .then((r) => {
          this.messageList = r.data;
        })
        .then(() => {
          this.messageListLoader = false;
          this.scrollToElement();
        });
    },
    getFirstConversation(data) {
      let id =
        getUserDetails().id === data[0].recipient_id
          ? data[0].sender_id
          : data[0].recipient_id;

      if (id !== undefined) {
        this.currentRecipient = id;
        this.active = data[0].id;
        this.getConversation(id);
        this.scrollToElement();
      }

      this.messageListLoader = false;
    },
    getUserChat(data) {
      let id =
        getUserDetails().id === data.recipient_id
          ? data.sender_id
          : data.recipient_id;
      this.currentRecipient = id;
      this.active = data.id;
      this.getConversation(id);
    },
    onClose(id) {
      this.currentRecipient = id;
      this.getConversation(id);
    },
    catchEvent() {
      if (isLoggedin()) {
        window.Echo.channel(
          `channel-chat-message-${getUserDetails().id}`
        ).listen("ChatUpdate", (e) => {
          this.getNotification();
          this.getUserChat(this.currentRecipient);
        });
      }
    },
    scrollToElement() {
      var content = this.$refs.container;
      content.scrollTop = content.scrollHeight;
    },
  },
  mounted() {
    this.catchEvent();
    this.getNotification();
  },
};
</script>

<style scoped>
.chatList {
  overflow-y: scroll;
  max-height: 500px;
  min-height: 200px;
  /* flex-direction: column-reverse; */
}
.messageBox {
  overflow-y: scroll;
  max-height: 360px;
  min-height: 160px;
  /* display: flex;
  flex-direction: column-reverse; */
}
</style>

<style lang="scss" >
.chatList {
  .ant-list-item-meta-description {
    line-height: 1;
  }
  .ant-list-items .active {
    background-color: #f6f8fd;
    box-shadow: 1px 1px 2px #c7c7c7;
  }
  .ant-list-split .ant-list-item {
    border: none;
  }
  .ant-list-item-meta-description {
    font-weight: 500;
    font-size: 12px;
  }
  .ant-list-item-meta-title {
    font-weight: 500;
    margin-bottom: 0;
    padding: 0;
    line-height: 1;
    margin-top: 7px;
  }
}
.messageBox {
  .ant-list-items {
    display: flex;
    flex-flow: column-reverse;
  }
  .ant-list-split .ant-list-item {
    border: none;
    padding-bottom: 22px;
    position: relative;
    .time {
      position: absolute;
      bottom: 0;
      opacity: 0.8;
      font-weight: bold;
      font-size: 10px;
    }
  }
  .ant-list-item-meta-description {
    border: none;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-weight: bold;
  }
  .self,
  .recipient {
    width: 95%;
    margin: 10px auto;
    padding: 5px 15px;

    border-radius: 3px;
    box-shadow: 1px 1px 2px #c7c7c7;
  }
  .self {
    background-color: #f3f3f3;
    .time {
      left: 15px;
    }
  }
  .recipient {
    background-color: #f6f8fd;
    .ant-list-item-meta-description {
      text-align: right;
    }
    .time {
      right: 15px;
    }
  }
}
.user-detail-chat {
  padding: 12px 20px;
  .heading {
    margin: 0;
  }
  .author {
    vertical-align: middle;
  }
}
.chat-message-submit {
  padding: 0 5px 0 16px;
  .form-container {
    max-width: 85%;
    width: 100%;
    float: left;
    textarea {
      border-radius: 0;
      resize: none;
    }
  }
  .button-container {
    max-width: 40%;
    float: left;
    button {
      margin-top: 8px;
      padding: 13px;
      border-radius: 0;
    }
  }
}
</style>