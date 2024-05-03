<template>
  <div class="w-full h-full d-center">
    <el-row type="flex" align="middle" justify="center" style="width: 600px">
      <el-col :span="12">
        <el-row class="mb-2">
          <el-text size="large" truncated>MU ERP 管理系统 </el-text>
        </el-row>
        <el-row align="middle">
          <Check width="16px" class="mr-1" height="16px" /><el-text size="small"
            >他强任你强，清风拂山岗
          </el-text>
        </el-row>
        <el-row align="middle">
          <Check width="16px" class="mr-1" height="16px" /><el-text size="small"
            >他自狠来他自恶，我自一口真气足
          </el-text>
        </el-row>
      </el-col>
      <el-col
        :span="12"
        class="login-form"
        v-loading="loading"
        element-loading-text="登陆中..."
        element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(122, 122, 122, 0.8)"
      >
        <el-row class="mb-2" align="middle" justify="center">
          <el-text class="large-mx"> 登陆 </el-text>
        </el-row>
        <el-row class="mb-2">
          <el-text> 海纳百川，有容乃大 </el-text>
        </el-row>
        <el-form>
          <el-form-item>
            <el-input
              v-model="form.account"
              placeholder="帐号"
              @input="
                () => {
                  errorForm.account = '';
                }
              "
            >
              <template #suffix>
                <el-icon color="#6b6d71"><User /> </el-icon>
              </template>
            </el-input>
            <el-text size="small" type="danger" class="sub-error">{{
              errorForm.account
            }}</el-text>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              :type="hidePassword ? 'password' : 'text'"
              placeholder="密码"
              @input="
                () => {
                  errorForm.password = '';
                }
              "
            >
              <template #suffix>
                <el-button
                  :icon="hidePassword ? 'Hide' : 'View'"
                  type="info"
                  link
                  @click="onHidePassword"
                >
                </el-button>
              </template>
            </el-input>
            <el-text size="small" type="danger" class="sub-error">{{
              errorForm.password
            }}</el-text>
          </el-form-item>
          <el-form-item>
            <el-row align="middle" justify="space-between">
              <el-col :span="12">
                <el-input
                  v-model="form.code"
                  placeholder="验证码"
                  @input="
                    () => {
                      errorForm.code = '';
                    }
                  "
                ></el-input>
              </el-col>
              <el-col :span="9">
                <mu-identify :identify-code="code" @click="onChangeCode" />
              </el-col>
            </el-row>
            <el-text size="small" type="danger" class="sub-error">{{
              errorForm.code
            }}</el-text>
          </el-form-item>
          <el-form-item class="mt-2">
            <el-checkbox v-model="isRemember" label="记住我"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="onSubmit">
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { randomNumber, StorageKey } from "../../utils";
import { useRouter } from "vue-router";
import Storage from "../../utils/storage";
const form = ref({
  account: "",
  password: "",
  code: "",
});
const errorForm = ref({
  account: "",
  password: "",
  code: "",
});
const loading = ref(false);
const isRemember = ref(false);
const hidePassword = ref(true);
const code = ref(randomNumber(4));
const onHidePassword = () => {
  hidePassword.value = !hidePassword.value;
};
const onChangeCode = () => {
  code.value = randomNumber(4);
};
function verify() {
  if (!form.value.account) {
    errorForm.value.account = "请输入账号";
  } else if (form.value.account.length < 3) {
    errorForm.value.account = "账号不正确";
  } else {
    errorForm.value.account = "";
  }
  if (!form.value.password) {
    errorForm.value.password = "请输入密码";
  } else if (form.value.password.length < 6) {
    errorForm.value.password = "密码长度必须大于等于6";
  } else {
    errorForm.value.code = "";
  }
  if (!form.value.code) {
    errorForm.value.code = "请输入验证码";
  } else if (form.value.code !== code.value) {
    errorForm.value.code = "验证码不正确";
  } else {
    errorForm.value.account = "";
  }
  return !errorForm.value.account && !errorForm.value.password && !errorForm.value.code;
}
const router = useRouter();
const onSubmit = () => {
  if (!verify()) return;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    // ElMessage({
    //   message: "登陆成功！",
    //   type: "success",
    //   plain: true,
    //   duration: 2000
    // });
    ElNotification({
      title: "Success",
      message: "登陆成功！",
      type: "success",
    });
    Storage.setItem(StorageKey.auth, "temp_auth");
    router.push({
      path: "/",
    });
  }, 1000);
};
</script>
<style scoped>
.login-form {
  background: rgba(76, 76, 76, 0.2);
  border: 1px solid rgba(167, 167, 167, 0.3);
  -moz-box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
  -webkit-box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
  box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  padding: 30px;
}
.el-form-item {
  margin-bottom: 0;
}
.sub-error {
  height: 18px;
  width: 100%;
  line-height: 18px;
}
</style>
