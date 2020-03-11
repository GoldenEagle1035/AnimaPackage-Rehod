<style>
.genesis {
  background-color: #34375e;
  border: 1px none;
  height: 1024px;
  padding: 10px 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.genesis.screen img {
  position: absolute;
}

.line-1 {
  align-self: flex-end;
  height: 1px;
  margin-top: 589px;
  width: 100%;
}

.input-field {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 7px;
  /* margin-left: 32px;
  margin-top: 16px; */
  min-height: 66px;
  width: 320px;
  margin-bottom: 50px;
  /* height: 30% */
}

.label {
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1px;
  white-space: nowrap;
}

.input {
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 2px #1018280d;
  display: flex;
  gap: 8px;
  height: 40px;
  overflow: hidden;
  padding: 7px 12px;
  width: 320px;

}

.text {
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
  width: 272px;
}

.help-icon {
  align-self: center;
  background-size: 100% 100%;
  height: 16px;
  width: 16px;
}

.button {
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 2px #1018280d;
  display: flex;
  height: 36px;
  /* margin-left: 112px;
  margin-top: 164px; */
  overflow: hidden;
  padding: 7px 14px;
  width: 161px;
}

.first-button {
  position: fixed;
  left: 50px;
  top: 30px;
  box-shadow: 0px 1px 2px #10b1da0d;
}

.button:hover {
  background-color: #ffff00;
  box-shadow: 0px 1px 2px #c711af0d;
}

.text-1 {
  letter-spacing: 0;
  line-height: 20px;
  min-width: 133px;
  text-align: center;
  white-space: nowrap;
}

.middle-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;
}

.bottom-screen {
  position: fixed;
  bottom: 20px;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.genesis h1 {
  color: wheat;
  font-size: 50px;
  font-style: bold;
  margin-bottom: 20px;
}

.ocrList {
  padding: 20px;
  margin-top: 50px;
  width: 50%;
  display: list-item;
}

.lastDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lastDiv .stakingInput {
  width: 200px;
  font-size: 30px;
  margin-bottom: 150px;
}
</style>
<template>
  <div class="container-center-horizontal">
    <div class="genesis screen">
      <h1>Page Number : {{ count }}</h1>
      <img class="line-1" :src="line1" alt="Line 1" />

      <div class="middle-screen">
        <div class="button" v-if="count == 1">
          <div class="text-1 roboto-semi-bold-oxford-blue-14px" @click='create'>
            <span class="roboto-semi-bold-oxford-blue-14px">Create</span>
          </div>
        </div>
        <div class="button" v-if="(count == 2 || count == 3)">
          <div class="text-1 roboto-semi-bold-oxford-blue-14px" @click='ocr'>
            <span class="roboto-semi-bold-oxford-blue-14px">OCR</span>
          </div>
        </div>
        <div class="ocrList" v-if="count == 3">
          <div>
            <h1 class="ocrLabel">{{ ocrData[0] }}</h1>
          </div>
          <div>
            <h1 class="ocrLabel">{{ ocrData[1] }}</h1>
          </div>
          <div>
            <h1 class="ocrLabel">{{ ocrData[2] }}</h1>
          </div>
          <div>
            <h1 class="ocrLabel">{{ ocrData[3] }}</h1>
          </div>
        </div>
        <div class="button" v-if="count == 3">
          <div class="text-1 roboto-semi-bold-oxford-blue-14px" @click='ocrConfirm'>
            <span class="roboto-semi-bold-oxford-blue-14px">Confirm</span>
          </div>
        </div>
        <div class="lastDiv" v-if="count == 4">
          <input id="staking" class="stakingInput" v-model.lazy="stakingValue" placeholder="Staking..." />
          <div class="button">
            <div class="text-1 roboto-semi-bold-oxford-blue-14px" @click='stakingOk'>
              <span class="roboto-semi-bold-oxford-blue-14px">Confirm</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-screen">
        <div class="button">
          <div class="text-1 roboto-semi-bold-oxford-blue-14px" v-on:click='prev'>
            <span class="roboto-semi-bold-oxford-blue-14px">Prev</span>
          </div>
        </div>
        <div class="button">
          <div class="text-1 roboto-semi-bold-oxford-blue-14px" @click='next'>
            <span class="roboto-semi-bold-oxford-blue-14px">Next</span>
          </div>
        </div>
      </div>

      <div class="first-button button">
        <div class="text-1 roboto-semi-bold-oxford-blue-14px" v-on:click='home'>
          <span class="roboto-semi-bold-oxford-blue-14px">Home</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import * as type from './type';

export default {
  name: "Genesis",

  data() {
    return {
      stakingValue: ''
    };
  },

  watch: {
    stakingValue: function (value) {
      return value;
    }
  },

  computed: {
    ...mapGetters({
      count: 'count',
      ocrData: 'ocrData',
      stakingData: 'stakingData'
    })
  },

  methods: {
    prev() {
      let count = this.$store.getters.count;
      if (count > 1)
        this.$store.dispatch('setCount', count - 1);
    },

    next() {
      //alert("next");
      let count = this.$store.getters.count;
      if (count < 4)
        this.$store.dispatch('setCount', count + 1);
    },

    create() {
      ///alert("create");
      let count = this.$store.getters.count;
      if (count == 1)
        this.$store.dispatch('setCount', 2);
    },

    ocr() {
      ///alert("create");
      let count = this.$store.getters.count;
      if (count == 2) {
        this.$store.dispatch('setCount', 3);
        let ocrData = [];
        for (let i = 1; i <= 4; i++) {
          let value = Math.floor(Math.random() * (10)) + 1;
          ocrData.push(value);
        }
        console.log(ocrData);
        this.$store.dispatch('setOcrData', ocrData);
      }
    },

    ocrConfirm() {
      console.log(this.$store.getters.ocrData);
      let count = this.$store.getters.count;
      if (count == 3) {
        this.$store.dispatch('setCount', 4);
      }
    },

    stakingOk() {
      let count = this.$store.getters.count;
      if (count == 4) {
        {
          console.log(this.stakingValue);

          let list = this.$store.getters.stakingData;
          this.$store.getters.ocrData["staking"] = this.stakingValue;

          list.push(this.$store.getters.ocrData);
          this.$store.dispatch('setstakingData', list);
          console.log(this.stakingData);
        }
      }
    },

    lastConfirm() {

    },

    home() {
      ///alert("create");
      this.$store.dispatch('setCount', 1);
    }
  }
};
</script>
