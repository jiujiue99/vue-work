<template>
  <div class="style-m-item" :class="btnClass[buttonCounts]">
    <div class="sm-i-body">
      <div class="sm-i-img">
        <img :src="styleData.sampleImageUrl || './img/style-img_03.jpg'" alt="img">
        <div class="sm-i-hover">
          <div class="vertical-middle">
            <div class="middle-cell">
              <div class="plr15">
                <div class="col-xs-10 col-xs-offset-1">
                  <a @click="preview()" class="thumb-btn"><span><i class="fa fa-eye"></i></span><br>预览</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sm-i-txt">
        <p>编号：{{ styleData.code }}</p>
        <p>名称：{{ styleData.name }}</p>
      </div>
      <div>
        <label :class="styleData._labelContent.className">{{ styleData._labelContent.text }}</label>
      </div>
    </div>

    <div class="sm-i-operate btn-group-sm text-center">
      <button v-if="styleData._labelContent.text === '待审核'"
              @click="doAuditCasePlatform(2)"
              class="btn btn-default hover-danger-o">通过</button>
      <button v-if="styleData._labelContent.text === '待审核'"
              @click="doAuditCasePlatform(3)"
              class="btn btn-default hover-danger-o">不通过</button>
      <button v-if="styleData._labelContent.text === '上架审核不通过'"
              @click="cancelAudit"
              class="btn btn-default hover-danger-o">取消审核</button>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    mapGetters
  } from 'vuex';

  export default {
    props: ['styleData'],
    data() {
      return {
        btnClass: ['', 'one-btn', 'two-btn', 'three-btn', 'four-btn', 'five-btn', 'six-btn']
      };
    },
    computed: {
      ...mapGetters(['currentRouteName', 'cmsApi']),
      buttonCounts() {
        switch (this.styleData._labelContent.text){
          case '待审核':
          return 2;
          case '已上架':
          return 1;
          case '上架审核不通过':
          return 1;
          default :
          return 0;
        }
      }
    },
    mounted() {
    },
    methods: {
      preview () {
        const url = `/cms/publish/preview?sid=${this.styleData.id}`
        window.open(url);
      },
      updateData() {
        this.cmsApi.style.getSingleStyle({styleid: this.styleData.id}).then(res => {
          if(!res.ok){
            return
          }
          return res.json();
        }).then(styleData => {
          console.log('updateStyleData!');
          this.$emit('updateStyleData', { styleData });
        });
        
      },
      doAuditCasePlatform (isagree) {
        const params = {
          isagree,
          styleid: this.styleData.id,
        };
        this.cmsApi.style.doAuditCasePlatform(params).then(response => {
          if(!response.ok){
            return
          }
          return response.json();
        }).then(data => {
          this.updateData();
        });
      },
      cancelAudit() {
        this.cmsApi.style.cancelCaseAudit({
          styleid: this.styleData.id
        }).then(res => {
          if(!res.ok){
            return 
          }
          return res.json();
        }).then(data => {
          this.updateData();
        });
      }
    },
    components: {

    }
  }

</script>
